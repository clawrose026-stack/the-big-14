// Yoco Checkout API Route
// Creates a checkout session and returns the redirect URL

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, bookingRef, customerEmail, customerName, metadata } = body;

    // Validate required fields
    if (!amount || !bookingRef) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, bookingRef' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // Yoco secret key from environment
    const secretKey = process.env.YOCO_SECRET_KEY;

    if (!secretKey) {
      return new Response(
        JSON.stringify({ error: 'Yoco secret key not configured' }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // Build metadata with only string values (Yoco requirement)
    const safeMetadata: Record<string, string> = {};
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          safeMetadata[key] = String(value);
        }
      });
    }

    // Sanitize externalId - Yoco may have regex pattern requirements
    // Only allow alphanumeric characters, max 50 chars
    const sanitizedExternalId = bookingRef.replace(/[^a-zA-Z0-9]/g, '').slice(0, 50);

    // Ensure amount is valid
    const amountInCents = Math.max(100, Math.round(amount * 100)); // Minimum 100 cents (R1)

    const requestBody = {
      amount: amountInCents,
      currency: 'ZAR',
      externalId: sanitizedExternalId,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://the-big-14.vercel.app'}/book?payment=success&ref=${bookingRef}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://the-big-14.vercel.app'}/book?payment=cancelled`,
    };

    // Only add metadata if it's not empty
    if (Object.keys(safeMetadata).length > 0) {
      Object.assign(requestBody, { metadata: safeMetadata });
    }

    console.log('Yoco API request:', {
      url: 'https://payments.yoco.com/api/checkouts',
      body: requestBody,
    });

    // Create checkout session with Yoco
    const response = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    console.log('Yoco API raw response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { raw: responseText };
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorData.message || errorData.displayMessage || `Yoco API Error: ${response.status}`,
          details: errorData,
        }),
        { 
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    const data = JSON.parse(responseText);

    return new Response(
      JSON.stringify({
        redirectUrl: data.redirectUrl,
        checkoutId: data.id,
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  } catch (error: any) {
    console.error('Checkout creation error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}
