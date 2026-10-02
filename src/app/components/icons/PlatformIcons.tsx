/**
 * Booking platform marks — the platforms' own logos, rendered in a single
 * colour so they inherit the surrounding text colour. The site's palette is
 * white, charcoal and black only, so brand colours are deliberately dropped.
 *
 * Sources:
 * - Airbnb and Booking.com: the simple-icons set (simpleicons.org)
 * - LekkeSlaap: the "lekke" wordmark from LekkeSlaap's own icon_square.svg,
 *   with its orange tile removed
 *
 * Platform logos are trademarks of their owners and are used here only to
 * identify where the property is listed.
 */

type IconProps = { className?: string };

/**
 * The Airbnb "Bélo". Official mark, via the simple-icons set,
 * rendered in a single colour.
 */
export function AirbnbIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z" />
    </svg>
  );
}

/**
 * Booking.com's "B." mark. The simple-icons version is a solid square with the
 * letterform knocked out; the square is dropped here so the mark sits on our
 * own tile with the same visual weight as the other two.
 */
export function BookingIcon({ className }: IconProps) {
  return (
    <svg viewBox="6.4 5.6 13.2 12.8" className={className} fill="currentColor" fillRule="evenodd" aria-hidden focusable="false">
      <path d="M8.575 6.563h2.658c2.108 0 3.473 1.15 3.473 2.898 0 1.15-.575 1.82-.91 2.108l-.287.263.335.192c.815.479 1.318 1.389 1.318 2.395 0 1.988-1.51 3.257-3.857 3.257H7.449V7.713c0-.623.503-1.126 1.126-1.15zm1.7 1.868c-.479.024-.694.264-.694.79v1.893h1.676c.958 0 1.294-.743 1.294-1.365 0-.815-.503-1.318-1.318-1.318zm-.096 4.36c-.407.071-.598.31-.598.79v2.251h1.868c.934 0 1.509-.55 1.509-1.533 0-.934-.599-1.509-1.51-1.509zm7.737 2.394c.743 0 1.341.599 1.341 1.342a1.34 1.34 0 0 1-1.341 1.341 1.355 1.355 0 0 1-1.341-1.341c0-.743.598-1.342 1.34-1.342z" />
    </svg>
  );
}

/**
 * LekkeSlaap's "lekke" wordmark — their own app icon, minus the orange tile.
 * It is a wide mark, so its viewBox is wide too: size it by width.
 */
export function LekkeSlaapIcon({ className }: IconProps) {
  return (
    <svg viewBox="27 108 256 92" className={className} fill="currentColor" fillRule="evenodd" aria-hidden focusable="false">
      <path d="M79.0034 130.482C99.4744 130.482 109.101 142.923 107.882 167.924H66.2093C66.8186 177.706 71.0833 182.658 79.0034 182.658C82.7808 182.658 86.3145 181.087 89.4826 178.069C90.9448 176.499 92.7729 175.774 94.9662 175.774H106.908C103.374 189.301 94.6004 196.789 78.7598 196.789C59.2637 196.185 49.5157 184.953 49.5157 163.213C49.5157 141.473 59.3856 130.603 79.0034 130.482ZM78.7598 143.647C71.8144 143.647 67.6714 147.995 66.4529 156.45H90.7015C89.7267 147.995 85.7053 143.647 78.7598 143.647Z" />
      <path d="M251.818 130.482C272.289 130.482 281.916 142.922 280.697 167.923H239.024C239.633 177.706 243.898 182.658 251.818 182.658C255.596 182.658 259.129 181.087 262.297 178.069C263.76 176.499 265.588 175.774 267.781 175.774H279.722C276.189 189.301 267.415 196.789 251.575 196.789C232.078 196.185 222.33 184.953 222.33 163.213C222.33 141.473 232.2 130.603 251.818 130.482ZM251.575 143.647C244.629 143.647 240.486 147.995 239.268 156.45H263.516C262.541 147.995 258.52 143.647 251.575 143.647Z" />
      <path d="M37.6076 113.211C41.8724 113.211 45.4062 116.834 45.4062 121.061V195.34H29.2002V113.212H37.6084L37.6076 113.211Z" />
      <path d="M119.282 113.212C123.547 113.212 127.08 116.835 127.08 121.062V156.45L147.064 133.743H166.56L144.262 157.416L166.804 195.34H147.308L135.854 174.324C133.782 170.701 131.711 168.89 129.639 168.89C127.933 169.252 127.08 170.339 127.08 172.03V195.34H110.874V113.212H119.282Z" />
      <path d="M180.159 113.212C184.424 113.212 187.957 116.835 187.957 121.062V156.45L207.941 133.743H227.437L205.138 157.416L227.681 195.34H208.184L196.73 174.324C194.659 170.701 192.587 168.89 190.516 168.89C188.81 169.252 187.957 170.339 187.957 172.03V195.34H171.751V113.212H180.159Z" />
    </svg>
  );
}

type PlatformIcon = {
  Icon: (props: IconProps) => React.ReactElement;
  /** Size classes for the large tile. The wordmark is wide; the others square. */
  size: string;
  /** Size classes for small inline chips. */
  compact: string;
};

export const platformIcons: Record<string, PlatformIcon> = {
  airbnb: { Icon: AirbnbIcon, size: 'w-7 h-7 sm:w-8 sm:h-8', compact: 'w-5 h-5' },
  'booking-com': { Icon: BookingIcon, size: 'w-6 h-6 sm:w-7 sm:h-7', compact: 'w-[1.125rem] h-[1.125rem]' },
  lekkeslaap: { Icon: LekkeSlaapIcon, size: 'w-10 sm:w-11 h-auto', compact: 'w-7 h-auto' },
};
