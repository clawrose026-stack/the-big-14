import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { ChevronLeft } from 'lucide-react';
import { docPages } from '@/lib/docs';

type DocPageProps = {
  /** Small label above the title, e.g. "Guest Information". */
  eyebrow: string;
  title: string;
  intro: string;
  /** ISO date of the last substantive revision. */
  updated: string;
  /** The current page's href, so it is marked in the sibling navigation. */
  current: string;
  children: React.ReactNode;
};

/**
 * Shared shell for the house rules, FAQ and policy pages: one heading block,
 * a readable measure, and navigation across the rest of the document set so a
 * guest never has to go back to the footer to find the next one.
 */
export default function DocPage({
  eyebrow,
  title,
  intro,
  updated,
  current,
  children,
}: DocPageProps) {
  const formatted = new Date(`${updated}T00:00:00Z`).toLocaleDateString(
    'en-ZA',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
  );

  return (
    <>
      <Header />

      <main id="main" className="bg-stone-50">
        <div className="section-padding max-w-3xl mx-auto py-12 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-10"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden /> Back to Home
          </Link>

          <header className="mb-10 pb-10 border-b border-stone-200">
            <span className="eyebrow mb-4">{eyebrow}</span>
            <h1 className="font-display text-4xl lg:text-5xl text-stone-900">
              {title}
            </h1>
            <p className="text-lg text-stone-600 mt-5 leading-relaxed">
              {intro}
            </p>
            <p className="text-sm text-stone-500 mt-6">
              Last updated{' '}
              <time dateTime={updated} className="text-stone-700 font-medium">
                {formatted}
              </time>
            </p>
          </header>

          <div className="prose-doc">{children}</div>

          <nav
            aria-label="Other guest documents"
            className="mt-16 pt-10 border-t border-stone-200"
          >
            <h2 className="eyebrow mb-5">More Information</h2>
            <ul className="flex flex-wrap gap-2.5">
              {docPages
                .filter((page) => page.href !== current)
                .map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="inline-flex px-4 py-2 rounded-full bg-white ring-1 ring-stone-900/10 text-sm font-medium text-stone-700 hover:bg-stone-900 hover:text-white hover:ring-stone-900 transition-colors"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}
