'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { propertyDetails } from '@/lib/property';
import { supabase, Booking } from '@/lib/supabase';
import { ChevronLeft, Calendar, Users, ArrowRight, Check, Loader2, Shield, CreditCard, FileText, Menu, X } from 'lucide-react';
import { format, isSameDay, addDays, eachDayOfInterval, isBefore, startOfMonth, endOfMonth, getDay, startOfDay } from 'date-fns';
import { useBookings } from '@/hooks/useBookings';

// Yoco Payment Button Component - Uses new Checkout API
interface YocoPaymentButtonProps {
  amount: number;
  bookingData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    idNumber: string;
    idType: 'sa_id' | 'passport';
  };
  checkIn: Date | null;
  checkOut: Date | null;
  numGuests: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function YocoPaymentButton({ amount, bookingData, checkIn, checkOut, numGuests, onSuccess, onError }: YocoPaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Generate booking reference
      const bookingRef = `TBF-${Date.now().toString().slice(-8)}`;

      // Create checkout session via our API route
      const response = await fetch('/api/yoco/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          bookingRef,
          customerEmail: bookingData.email,
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          metadata: {
            phone: bookingData.phone,
            idNumber: bookingData.idNumber,
            idType: bookingData.idType,
            ...(checkIn && { checkIn: format(checkIn, 'yyyy-MM-dd') }),
            ...(checkOut && { checkOut: format(checkOut, 'yyyy-MM-dd') }),
            numGuests: numGuests.toString(),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      // Store booking data for retrieval after payment
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingBooking', JSON.stringify({
          ...bookingData,
          checkIn: checkIn?.toISOString(),
          checkOut: checkOut?.toISOString(),
          numGuests,
          total: amount,
          bookingRef,
          checkoutId: data.checkoutId,
        }));
      }

      // Redirect to Yoco Checkout page
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (error: any) {
      console.error('Yoco checkout error:', error);
      onError(error.message || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-[#00C853] hover:bg-[#00B347] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="6" width="20" height="12" rx="2" fill="white" fillOpacity="0.2"/>
              <rect x="4" y="14" width="4" height="2" rx="0.5" fill="white"/>
              <rect x="10" y="14" width="4" height="2" rx="0.5" fill="white" fillOpacity="0.5"/>
              <rect x="16" y="14" width="4" height="2" rx="0.5" fill="white" fillOpacity="0.3"/>
            </svg>
            Pay R{amount.toLocaleString()} Securely
          </>
        )}
      </button>
    </div>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  
  // Use centralized booking logic
  const { bookedDates, isDateBooked, isDateDisabled, checkAvailability: verifyAvailability } = useBookings();
  
  // Calendar selection
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [numGuests, setNumGuests] = useState(2);
  
  // Guest details
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    idType: 'sa_id' as 'sa_id' | 'passport',
    specialRequests: '',
    agreeToTerms: false,
  });
  const [idError, setIdError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // South African ID validation (Luhn algorithm)
  const validateSAID = (id: string): boolean => {
    if (!id || id.length !== 13) return false;
    if (!/^\d{13}$/.test(id)) return false;

    // Extract date of birth (YYMMDD)
    const year = parseInt(id.substring(0, 2));
    const month = parseInt(id.substring(2, 4));
    const day = parseInt(id.substring(4, 6));

    // Validate date
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = year > currentYear ? 1900 + year : 2000 + year;
    const date = new Date(fullYear, month - 1, day);
    if (date.getMonth() !== month - 1 || date.getDate() !== day) return false;

    // Luhn checksum validation
    let sum = 0;
    let alternate = false;
    for (let i = id.length - 1; i >= 0; i--) {
      let n = parseInt(id.substring(i, i + 1));
      if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alternate = !alternate;
    }
    return sum % 10 === 0;
  };

  // Passport validation (basic international format)
  const validatePassport = (passport: string): boolean => {
    if (!passport || passport.length < 6 || passport.length > 9) return false;
    // Most countries use 1-2 letters followed by 6-9 alphanumeric characters
    return /^[A-Za-z]{0,2}[A-Za-z0-9]{6,9}$/.test(passport);
  };

  const validateIdNumber = (value: string, type: 'sa_id' | 'passport'): string => {
    if (!value) return 'This field is required';
    if (type === 'sa_id') {
      if (!validateSAID(value)) return 'Invalid South African ID number';
    } else {
      if (!validatePassport(value)) return 'Invalid passport number';
    }
    return '';
  };

  // Comprehensive validation for all guest details
  const validateGuestDetails = (): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    // First Name validation
    if (!bookingData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (bookingData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(bookingData.firstName)) {
      errors.firstName = 'First name contains invalid characters';
    }

    // Last Name validation
    if (!bookingData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (bookingData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(bookingData.lastName)) {
      errors.lastName = 'Last name contains invalid characters';
    }

    // Email validation
    if (!bookingData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (South African format)
    if (!bookingData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      // Remove spaces, dashes, and parentheses
      const cleanPhone = bookingData.phone.replace(/[\s\-\(\)]/g, '');
      // Check for valid SA phone format
      if (!/^(0|27)[0-9]{9}$/.test(cleanPhone)) {
        errors.phone = 'Please enter a valid South African phone number (e.g., 082 123 4567)';
      }
    }

    // ID/Passport validation
    const idValidationError = validateIdNumber(bookingData.idNumber, bookingData.idType);
    if (idValidationError) {
      errors.idNumber = idValidationError;
    }

    // Terms agreement validation
    if (!bookingData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  useEffect(() => {
    const urlCheckIn = searchParams.get('checkIn');
    const urlCheckOut = searchParams.get('checkOut');
    const urlGuests = searchParams.get('guests');
    const paymentStatus = searchParams.get('payment');

    if (urlCheckIn) setCheckIn(new Date(urlCheckIn));
    if (urlCheckOut) setCheckOut(new Date(urlCheckOut));
    if (urlGuests) setNumGuests(parseInt(urlGuests));

    // Handle Yoco payment callback
    if (paymentStatus === 'success' && typeof window !== 'undefined') {
      const pendingBooking = sessionStorage.getItem('pendingBooking');
      if (pendingBooking) {
        const parsedBooking = JSON.parse(pendingBooking);
        // Restore booking data
        setBookingData(parsedBooking);
        setCheckIn(new Date(parsedBooking.checkIn));
        setCheckOut(new Date(parsedBooking.checkOut));
        setNumGuests(parsedBooking.numGuests);
        setBookingRef(parsedBooking.bookingRef);
        // Store for handleSubmit to use
        sessionStorage.setItem('completedBooking', pendingBooking);
        sessionStorage.removeItem('pendingBooking');
        // Set step to trigger handleSubmit
        setStep(4);
      }
    } else if (paymentStatus === 'cancelled') {
      alert('Payment was cancelled. You can try again.');
    }

    setLoading(false);
  }, [searchParams]);

  // Hook handles fetching booked dates

  // Handle payment completion - save booking and send email
  useEffect(() => {
    if (step === 4 && typeof window !== 'undefined') {
      const completedBooking = sessionStorage.getItem('completedBooking');
      if (completedBooking) {
        const parsed = JSON.parse(completedBooking);
        console.log('Restoring booking data:', parsed);
        // Restore all data from sessionStorage
        setBookingData(parsed);
        setCheckIn(new Date(parsed.checkIn));
        setCheckOut(new Date(parsed.checkOut));
        setNumGuests(parsed.numGuests);
        setBookingRef(parsed.bookingRef);
        // Call handleSubmit to save to database and send email
        setTimeout(() => {
          handleSubmit();
          sessionStorage.removeItem('completedBooking');
        }, 100); // Small delay to ensure state is updated
      }
    }
  }, [step]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Hook handles date status check

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (date <= checkIn) {
        setCheckIn(date);
      } else {
        const range = eachDayOfInterval({ start: checkIn, end: date });
        const hasBookedDate = range.some(d => isDateBooked(d) && !isSameDay(d, date));
        
        if (hasBookedDate) {
          setCheckIn(date);
          setCheckOut(null);
        } else {
          setCheckOut(date);
        }
      }
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateSubtotal = () => calculateNights() * propertyDetails.pricing.baseRate;
  const calculateTotal = () => calculateSubtotal() + propertyDetails.pricing.cleaningFee;

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) return;
    const isAvailable = await verifyAvailability(checkIn, checkOut);
    if (isAvailable) {
      setStep(2);
    } else {
      alert('Sorry, some of the selected dates have just been booked. Please choose different dates.');
    }
  };

  const handleNext = () => {
    // Validate before proceeding to payment (step 3)
    if (step === 2) {
      const { isValid, errors } = validateGuestDetails();
      setValidationErrors(errors);
      // Mark all fields as touched to show errors
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        idNumber: true,
        agreeToTerms: true,
      });
      if (!isValid) {
        return; // Don't proceed if validation fails
      }
    }
    setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    console.log('handleSubmit called with:', { bookingData, checkIn, checkOut, bookingRef });

    try {
      // Validate required data exists
      if (!bookingData.firstName || !bookingData.lastName || !bookingData.email) {
        throw new Error('Missing guest information. Please fill in all required fields.');
      }
      if (!checkIn || !checkOut) {
        throw new Error('Missing booking dates. Please select check-in and check-out dates.');
      }

      const idLabel = bookingData.idType === 'sa_id' ? 'SA ID' : 'Passport';
      // Use existing ref from state (from payment callback) or generate new one
      const ref = bookingRef || `TBF-${Date.now().toString().slice(-8)}`;
      if (!bookingRef) setBookingRef(ref);

      // Final availability check before submission
      const isStillAvailable = await verifyAvailability(checkIn, checkOut);
      if (!isStillAvailable) {
        throw new Error('Some of the selected dates are no longer available. Please select different dates.');
      }

      console.log('Saving booking with ref:', ref);

      const booking: Omit<Booking, 'id' | 'created_at'> = {
        booking_ref: ref,
        check_in: format(checkIn, 'yyyy-MM-dd'),
        check_out: format(checkOut, 'yyyy-MM-dd'),
        guest_first_name: bookingData.firstName,
        guest_last_name: bookingData.lastName,
        guest_email: bookingData.email,
        guest_phone: bookingData.phone,
        id_type: bookingData.idType,
        id_number: bookingData.idNumber,
        num_guests: numGuests,
        base_rate: propertyDetails.pricing.baseRate * 100, // convert to cents
        cleaning_fee: propertyDetails.pricing.cleaningFee * 100, // convert to cents
        total_price: calculateTotal() * 100, // convert to cents
        payment_status: 'paid',
        payment_method: 'yoco',
        payment_reference: '',
        paid_at: new Date().toISOString(),
        status: 'confirmed',
        special_requests: bookingData.specialRequests,
        notes: `Booking completed via website. ID Type: ${idLabel}`,
      };

      console.log('Booking data:', booking);

      const { error } = await supabase.from('bookings').insert([booking]);
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Booking saved successfully');

      // Send confirmation email
      try {
        console.log('Sending confirmation email to:', bookingData.email);
        const emailResponse = await fetch('/api/send-booking-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: bookingData.email,
            bookingRef: ref,
            guestName: `${bookingData.firstName} ${bookingData.lastName}`,
            checkIn: format(checkIn, 'yyyy-MM-dd'),
            checkOut: format(checkOut, 'yyyy-MM-dd'),
            numGuests,
            total: calculateTotal(),
            propertyName: propertyDetails.name,
          }),
        });
        const emailResult = await emailResponse.json();
        console.log('Email response:', emailResult);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the booking if email fails
      }

      setStep(5);
    } catch (err: any) {
      console.error('Booking error:', err);
      alert(`Error: ${err.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0">
        <div className="section-padding max-w-6xl mx-auto py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">B14</span>
            </div>
            <span className="font-display text-xl text-stone-900">Big 14</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-stone-600 hover:text-stone-900 font-medium">Home</Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-900 font-medium">About</Link>
            <Link href="/contact" className="text-stone-600 hover:text-stone-900 font-medium">Contact</Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-500">Step {Math.min(step, 4)} of 4</span>
              <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stone-900 transition-all duration-300"
                  style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-stone-900" />
            ) : (
              <Menu className="w-6 h-6 text-stone-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200">
            <nav className="section-padding py-4 flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-stone-600 hover:text-stone-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-stone-600 hover:text-stone-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-stone-600 hover:text-stone-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center gap-2 py-2">
                <span className="text-sm text-stone-500">Step {Math.min(step, 4)} of 4</span>
                <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-stone-900 transition-all duration-300"
                    style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="section-padding max-w-3xl mx-auto py-12">
        {/* Step 1: Calendar & Availability */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6">
              <ChevronLeft className="w-5 h-5" /> Back to Home
            </Link>
            <h1 className="font-display text-3xl text-stone-900 mb-2">Select Your Dates</h1>
            <p className="text-stone-600 mb-8">Choose your check-in and check-out dates</p>

            {/* Calendar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-display text-lg">{format(currentMonth, 'MMMM yyyy')}</h3>
                <button
                  onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-stone-500 py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first of the month */}
                {Array.from({ length: getDay(monthStart) }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                {/* Day cells */}
                {days.map((day, index) => {
                  const selected = (checkIn && isSameDay(day, checkIn)) || (checkOut && isSameDay(day, checkOut));
                  const inRange = checkIn && checkOut && day > checkIn && day < checkOut;
                  const disabled = isDateDisabled(day);
                  const booked = isDateBooked(day);

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day)}
                      disabled={disabled}
                      className={`
                        aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all
                        ${selected ? 'bg-stone-900 text-white' : ''}
                        ${inRange ? 'bg-stone-200' : ''}
                        ${disabled ? 'date-crossed-out cursor-not-allowed' : 'hover:bg-stone-100'}
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Dates */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 border border-stone-300 p-3 rounded-xl">
                <label className="block text-xs text-stone-500 uppercase mb-1">Check-in</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span className="font-medium text-sm">
                    {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Select'}
                  </span>
                </div>
              </div>
              <div className="flex-1 border border-stone-300 p-3 rounded-xl">
                <label className="block text-xs text-stone-500 uppercase mb-1">Check-out</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span className="font-medium text-sm">
                    {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Select'}
                  </span>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="border border-stone-300 p-3 mb-6 rounded-xl">
              <label className="block text-xs text-stone-500 uppercase mb-2">Guests</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                  className="w-8 h-8 border border-stone-300 rounded-lg flex items-center justify-center hover:bg-stone-100"
                >
                  -
                </button>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-stone-400" />
                  <span className="font-medium">{numGuests} {numGuests === 1 ? 'guest' : 'guests'}</span>
                </div>
                <button
                  onClick={() => setNumGuests(Math.min(propertyDetails.specs.maxGuests, numGuests + 1))}
                  className="w-8 h-8 border border-stone-300 rounded-lg flex items-center justify-center hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price & CTA */}
            {checkIn && checkOut && (
              <div className="bg-stone-50 p-4 rounded-xl mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-600">R{propertyDetails.pricing.baseRate} x {calculateNights()} nights</span>
                  <span>R{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-stone-600">Cleaning fee</span>
                  <span>R{propertyDetails.pricing.cleaningFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-xl">R{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            )}

            {(() => {
              if (!checkIn || !checkOut) {
                return (
                  <button disabled className="w-full btn-primary opacity-50">
                    Select dates to continue
                  </button>
                );
              }
              const range = eachDayOfInterval({ start: checkIn, end: addDays(checkOut, -1) });
              const hasConflict = range.some(date => isDateBooked(date));
              
              if (hasConflict) {
                return (
                  <div className="bg-red-50 p-4 rounded-xl mb-4 text-center">
                    <p className="text-red-600 font-medium">Sorry, these dates are not available</p>
                    <p className="text-red-500 text-sm">Some dates are already booked</p>
                  </div>
                );
              }
              
              return (
                <button onClick={checkAvailability} className="w-full btn-primary flex items-center justify-center gap-2">
                  Check Availability <ArrowRight className="w-5 h-5" />
                </button>
              );
            })()}
          </div>
        )}

        {/* Step 2: Guest Details */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <button onClick={handleBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>

            <h1 className="font-display text-3xl text-stone-900 mb-2">Guest Details</h1>
            <p className="text-stone-600 mb-8">Please provide your information for the booking</p>

            {/* Trip Summary */}
            <div className="bg-stone-50 p-4 rounded-2xl mb-8">
              <p className="text-sm text-stone-500">{calculateNights()} nights • {numGuests} guests</p>
              <p className="font-medium">{checkIn && format(checkIn, 'MMM d')} - {checkOut && format(checkOut!, 'MMM d, yyyy')}</p>
              <p className="font-display text-lg mt-2">R{calculateTotal().toLocaleString()}</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.firstName}
                    onChange={(e) => {
                      setBookingData({...bookingData, firstName: e.target.value});
                      setTouched({...touched, firstName: true});
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors ${
                      validationErrors.firstName && touched.firstName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-stone-300 focus:border-stone-900'
                    }`}
                    placeholder="John"
                  />
                  {validationErrors.firstName && touched.firstName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.lastName}
                    onChange={(e) => {
                      setBookingData({...bookingData, lastName: e.target.value});
                      setTouched({...touched, lastName: true});
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors ${
                      validationErrors.lastName && touched.lastName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-stone-300 focus:border-stone-900'
                    }`}
                    placeholder="Doe"
                  />
                  {validationErrors.lastName && touched.lastName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={bookingData.email}
                  onChange={(e) => {
                    setBookingData({...bookingData, email: e.target.value});
                    setTouched({...touched, email: true});
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors ${
                    validationErrors.email && touched.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="john@example.com"
                />
                {validationErrors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => {
                    setBookingData({...bookingData, phone: e.target.value});
                    setTouched({...touched, phone: true});
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors ${
                    validationErrors.phone && touched.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder="082 123 4567"
                />
                {validationErrors.phone && touched.phone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
              </div>

              {/* ID Type Selection */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">Identification Type *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="idType"
                      value="sa_id"
                      checked={bookingData.idType === 'sa_id'}
                      onChange={(e) => {
                        setBookingData({...bookingData, idType: e.target.value as 'sa_id', idNumber: ''});
                        setIdError('');
                      }}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span className="text-stone-700">South African ID</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="idType"
                      value="passport"
                      checked={bookingData.idType === 'passport'}
                      onChange={(e) => {
                        setBookingData({...bookingData, idType: e.target.value as 'passport', idNumber: ''});
                        setIdError('');
                      }}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span className="text-stone-700">Passport</span>
                  </label>
                </div>
              </div>

              {/* ID/Passport Input */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {bookingData.idType === 'sa_id' ? 'South African ID Number' : 'Passport Number'} *
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.idNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBookingData({...bookingData, idNumber: value});
                    setIdError(validateIdNumber(value, bookingData.idType));
                    setTouched({...touched, idNumber: true});
                  }}
                  onBlur={(e) => {
                    setIdError(validateIdNumber(e.target.value, bookingData.idType));
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors ${
                    (idError || (validationErrors.idNumber && touched.idNumber))
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-stone-300 focus:border-stone-900'
                  }`}
                  placeholder={bookingData.idType === 'sa_id' ? '13 digits (e.g. 9001015009087)' : 'Passport number (e.g. A12345678)'}
                  maxLength={bookingData.idType === 'sa_id' ? 13 : 9}
                />
                {(idError || (validationErrors.idNumber && touched.idNumber)) ? (
                  <p className="text-xs text-red-500 mt-1">{idError}</p>
                ) : (
                  <p className="text-xs text-stone-500 mt-1">
                    {bookingData.idType === 'sa_id'
                      ? '13-digit SA ID number required for check-in verification'
                      : 'Passport number required for international guests'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Special Requests (Optional)</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-stone-900 focus:outline-none h-24 resize-none"
                  placeholder="Any special requirements..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={bookingData.agreeToTerms}
                  onChange={(e) => {
                    setBookingData({...bookingData, agreeToTerms: e.target.checked});
                    setTouched({...touched, agreeToTerms: true});
                  }}
                  className={`w-5 h-5 mt-0.5 rounded ${
                    validationErrors.agreeToTerms && touched.agreeToTerms
                      ? 'border-red-500'
                      : 'border-stone-300'
                  }`}
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="text-sm text-stone-600">
                    I agree to the <a href="#" className="underline">Terms & Conditions</a> and <a href="#" className="underline">Cancellation Policy</a>.
                    I understand ID verification is required at check-in.
                  </label>
                  {validationErrors.agreeToTerms && touched.agreeToTerms && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.agreeToTerms}</p>
                  )}
                </div>
              </div>

              {/* Validation Summary */}
              {Object.keys(validationErrors).length > 0 && Object.keys(touched).length > 0 && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                  <p className="text-red-700 font-medium mb-2">Please fix the following errors:</p>
                  <ul className="text-red-600 text-sm list-disc list-inside">
                    {Object.entries(validationErrors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Review Booking <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review/Summary */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <button onClick={handleBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>

            <h1 className="font-display text-3xl text-stone-900 mb-2">Review Your Booking</h1>
            <p className="text-stone-600 mb-8">Please confirm all details are correct</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-2xl">
                <Calendar className="w-5 h-5 text-stone-400 mt-1" />
                <div>
                  <p className="font-medium">{calculateNights()} nights</p>
                  <p className="text-stone-600">{checkIn && format(checkIn, 'EEE, MMM d')} - {checkOut && format(checkOut, 'EEE, MMM d, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-2xl">
                <Users className="w-5 h-5 text-stone-400 mt-1" />
                <div>
                  <p className="font-medium">{numGuests} guests</p>
                  <p className="text-stone-600">{bookingData.firstName} {bookingData.lastName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-2xl">
                <FileText className="w-5 h-5 text-stone-400 mt-1" />
                <div>
                  <p className="font-medium">Contact Details</p>
                  <p className="text-stone-600">{bookingData.email}</p>
                  <p className="text-stone-600">{bookingData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl">
                <Shield className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-green-800">Secure Booking</p>
                  <p className="text-green-600 text-sm">Your information is encrypted. ID verification required at check-in.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6 mb-6">
              <h3 className="font-semibold mb-4">Price Details</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-stone-600">R{propertyDetails.pricing.baseRate} x {calculateNights()} nights</span>
                  <span>R{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Cleaning fee</span>
                  <span>R{propertyDetails.pricing.cleaningFee}</span>
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t border-stone-200">
                <span className="font-semibold text-lg">Total (ZAR)</span>
                <span className="font-display text-3xl">R{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <button onClick={handleNext} className="w-full btn-primary flex items-center justify-center gap-2">
              Proceed to Payment <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <button onClick={handleBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>

            <h1 className="font-display text-3xl text-stone-900 mb-2">Payment</h1>
            <p className="text-stone-600 mb-8">Complete your secure payment with Yoco</p>

            <div className="bg-stone-50 p-6 rounded-2xl mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-stone-500">Amount to pay</p>
                  <p className="font-display text-3xl">R{calculateTotal().toLocaleString()}</p>
                </div>
                <div className="text-right text-sm text-stone-500">
                  <p>{calculateNights()} nights</p>
                  <p>{bookingData.firstName} {bookingData.lastName}</p>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-stone-100 p-4 rounded-xl mb-6">
              <h3 className="font-medium mb-2">Booking Summary</h3>
              <div className="text-sm space-y-1 text-stone-600">
                <p>{propertyDetails.name}</p>
                <p>{checkIn && format(checkIn, 'EEE, MMM d')} - {checkOut && format(checkOut, 'EEE, MMM d, yyyy')}</p>
                <p>{numGuests} {numGuests === 1 ? 'guest' : 'guests'}</p>
              </div>
            </div>

            {/* Yoco Payment Button */}
            <YocoPaymentButton
              amount={calculateTotal()}
              bookingData={bookingData}
              checkIn={checkIn}
              checkOut={checkOut}
              numGuests={numGuests}
              onSuccess={() => {
                handleSubmit();
              }}
              onError={(error) => {
                alert(`Payment failed: ${error}`);
              }}
            />

            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-stone-500">
              <Shield className="w-4 h-4" />
              <span>Secure card entry via Yoco PCI-compliant modal</span>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <svg className="w-8 h-5" viewBox="0 0 48 30" fill="none">
                  <rect width="48" height="30" rx="4" fill="#1A1F71"/>
                  <path d="M19.5 20h3L23 10h-3l-0.5 10z" fill="white"/>
                  <path d="M30 10.5c-1 0-1.8.4-2.3 1l-2-7.5h-3l3 11h2.5l-2-7c0.5-0.3 1-0.4 1.8-0.4 0.5 0 1 0.1 1.5 0.2l0.5-2.3z" fill="white"/>
                </svg>
                <span>Visa</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <svg className="w-8 h-5" viewBox="0 0 48 30" fill="none">
                  <rect width="48" height="30" rx="4" fill="#EB001B"/>
                  <circle cx="19" cy="15" r="10" fill="#EB001B"/>
                  <circle cx="29" cy="15" r="10" fill="#F79E1B"/>
                  <path d="M24 8c3 2 5 5 5 8s-2 6-5 8c-3-2-5-5-5-8s2-6 5-8z" fill="#FF5F00"/>
                </svg>
                <span>Mastercard</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 text-center mt-4">
              By clicking Pay, you agree to our Terms & Conditions and authorize this payment.
            </p>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl text-stone-900 mb-4">Payment Successful!</h1>
            <p className="text-stone-600 mb-6">
              Thank you {bookingData.firstName}! Your payment was processed and your booking is confirmed.
            </p>
            
            <div className="bg-stone-50 p-6 rounded-2xl mb-8 text-left">
              <p className="text-sm text-stone-500 mb-2">Booking Reference</p>
              <p className="font-display text-2xl mb-4">{bookingRef || 'TBF-' + Date.now().toString().slice(-8)}</p>

              <div className="space-y-2 text-sm">
                <p><span className="text-stone-500">Dates:</span> {checkIn && format(checkIn, 'MMM d')} - {checkOut && format(checkOut, 'MMM d, yyyy')}</p>
                <p><span className="text-stone-500">Guests:</span> {numGuests}</p>
                <p><span className="text-stone-500">Total Paid:</span> R{calculateTotal().toLocaleString()}</p>
                <p><span className="text-stone-500">Payment Method:</span> Yoco</p>
              </div>
            </div>

            <p className="text-stone-600 mb-6">
              A confirmation email has been sent to {bookingData.email}.
              Check-in instructions will follow shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/timeline/${bookingRef}`} className="btn-primary inline-flex items-center justify-center gap-2">
                View Your Timeline <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/" className="btn-secondary inline-block">
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <BookPageContent />
    </Suspense>
  );
}
