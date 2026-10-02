// Fails CI if a booking platform listing stops resolving. These links are the
// whole point of the site, so a listing going dark should break the build
// rather than be discovered by a guest.
//
// Booking.com answers automated requests with a bot challenge (HTTP 202) — that
// still proves the URL exists, so any 2xx counts. Redirects are followed, and
// landing on a marketplace homepage counts as a failure: that is what a
// removed listing does on LekkeSlaap.
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/lib/property.ts', import.meta.url), 'utf8');
const block = source.slice(source.indexOf('export const bookingPlatforms'));
const urls = [...block.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error('No platform URLs found in src/lib/property.ts');
  process.exit(1);
}

let failed = false;
for (const url of urls) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheBig14-LinkCheck/1.0)' },
      signal: AbortSignal.timeout(15000),
    });
    const landedOnHomepage = new URL(res.url).pathname.replace(/\/$/, '') === '';
    const ok = res.status < 400 && !landedOnHomepage;
    const note = landedOnHomepage ? ` (redirected to homepage: ${res.url})` : '';
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${res.status} ${url}${note}`);
    if (!ok) failed = true;
  } catch (err) {
    console.log(`FAIL ---- ${url} (${err.message})`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
