import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * Renders the real logo, centred on a white square — the source of the
 * favicon, the Apple touch icon and the web-app icons. Generated at build time.
 */
export async function brandIcon(size: number, { padding = 0.16 } = {}) {
  const logo = await readFile(
    path.join(process.cwd(), 'public/images/big14_logo.png')
  );
  const src = `data:image/png;base64,${logo.toString('base64')}`;

  // The logo is 247x146; fit it to the padded width.
  const width = Math.round(size * (1 - padding * 2));
  const height = Math.round((width * 146) / 247);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={width} height={height} alt="" />
      </div>
    ),
    { width: size, height: size }
  );
}
