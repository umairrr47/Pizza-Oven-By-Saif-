
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
} from "lucide-react";

import oven1 from "../assets/ovens/post1.jpg";
import oven2 from "../assets/ovens/post2.jpg";
import oven3 from "../assets/ovens/post3.jpeg";
import Dp from "../assets/ovens/dp.jpg"

const instagramUrl =
  "https://www.instagram.com/the_pizza_ovens_by_saif/";

const posts = [
  {
    id: 1,
    image: oven1,
    alt: "Premium dome pizza oven",
    url: "https://www.instagram.com/p/DX9SkryEwtO/",
  },
  {
    id: 2,
    image: oven2,
    alt: "Pizza baking inside a commercial oven",
    url: "https://www.instagram.com/p/DX6YwfVk03V/",
  },
  {
    id: 3,
    image: oven3,
    alt: "Professional commercial pizza oven",
    url: "https://www.instagram.com/reel/DMj45ARyCeK/",
  },
];

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC2Y5-Gmxu854G3hPQ15hl4g",
    icon: Youtube,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/the_pizza_ovens_by_saif?dlrf=eDNtemVnNmM2OXRs",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1KVqwevYuN/?mibextid=wwXIfr",
    icon: Facebook,
  },
  {
    name: "X / Twitter",
    href: "https://x.com/thepizzaovens?lang=en&shem=aimgspe,",
    icon: Twitter,
  },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/thepizzaovensbysaif/",
    icon: null,
  },
];

export default function InstagramSection() {
  return (
    <section className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#090908] py-6 text-[#eeeae4] sm:py-8">
      {/* Ambient orange glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#f36b0b]/[0.06] blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-3 sm:px-5 lg:px-8">
        {/* Instagram header */}
        <header className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit The Pizza Ovens by Saif on Instagram"
            className="group flex min-w-0 items-center gap-3"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#171512] p-[2px] transition-colors duration-300 group-hover:border-[#f36b0b] sm:h-12 sm:w-12">
              <img
                src={Dp}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-[11px] font-bold tracking-wide text-[#eeeae4] sm:text-sm">
                FROM OUR INSTAGRAM
              </h2>

              <p className="mt-1 text-[11px] text-[#f36b0b] sm:text-xs">
                @the_pizza_ovens_by_saif
              </p>
            </div>
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#f36b0b]/80 px-3 py-2 text-[9px] font-medium tracking-wide text-[#f36b0b] transition-all duration-300 hover:bg-[#f36b0b] hover:text-black hover:shadow-[0_0_20px_rgba(243,107,11,0.15)] sm:px-4 sm:text-[10px]"
          >
            FOLLOW US
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </header>

        {/* Three posts in one horizontal row */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Instagram post: ${post.alt}`}
              className="group relative aspect-[0.78/1] min-w-0 overflow-hidden rounded-[4px] border border-white/[0.13] bg-[#151412] opacity-0 animate-[igFadeIn_650ms_cubic-bezier(0.22,1,0.36,1)_forwards] sm:aspect-[0.95/1] lg:aspect-[1.05/1]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <img
                src={post.image}
                alt={post.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.055] group-hover:brightness-[0.72]"
              />

              <span className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="grid h-8 w-8 translate-y-2 place-items-center rounded-full border border-white/70 text-lg text-white transition-transform duration-300 group-hover:translate-y-0 sm:h-10 sm:w-10">
                  ↗
                </span>
              </span>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Instagram caption */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[9px] text-[#969087] transition-colors duration-300 hover:text-[#f36b0b] sm:text-[10px]"
        >
          LATEST POSTS
          <span className="text-[#f36b0b]">·</span>
          REELS
          <span className="text-[#f36b0b]">·</span>
          BEHIND THE SCENES
          <span className="ml-1 text-[#f36b0b]">↗</span>
        </a>

        {/* Social media footer */}
        <footer className="mt-7 border-t border-white/[0.09] pt-6 sm:mt-9 sm:pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[#eeeae4]">
                STAY CONNECTED
              </p>

              <p className="mt-2 text-xs text-[#858078]">
                Follow our craft. Discover what&apos;s cooking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }, index) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                  title={name}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="group relative flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.035] text-[#a7a19a] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] animate-[socialEnter_500ms_cubic-bezier(0.22,1,0.36,1)_forwards] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#f36b0b]/70 hover:bg-[#f36b0b]/[0.10] hover:text-[#ff812b] hover:shadow-[0_8px_25px_rgba(243,107,11,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f36b0b]"
                >
                  <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-[#f36b0b]/[0.12] to-transparent transition-transform duration-300 group-hover:translate-y-0" />

                  <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {Icon ? (
                      <Icon size={40} strokeWidth={1.7} />
                    ) : (
                      /* Pinterest logo */
                      <svg
                        viewBox="0 0 24 24"
                        width="40"
                        height="40"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12.02 2C6.55 2 3.66 5.93 3.66 10.2c0 1.98.75 4.46 2.44 5.24.23.11.43 0 .49-.25l.2-.82c.06-.25.04-.34-.15-.56-.49-.57-.8-1.3-.8-2.34 0-3.02 2.26-5.72 5.89-5.72 3.21 0 4.98 1.97 4.98 4.61 0 3.47-1.54 6.4-3.83 6.4-1.26 0-2.2-1.04-1.9-2.32.36-1.53 1.06-3.18 1.06-4.28 0-.99-.53-1.82-1.63-1.82-1.29 0-2.32 1.33-2.32 3.1 0 1.13.38 1.9.38 1.9l-1.53 6.5c-.45 1.9-.07 4.22-.04 4.45.02.14.2.17.29.07.12-.16 1.67-2.06 2.2-3.9.15-.53.86-3.5.86-3.5.42.8 1.65 1.51 2.96 1.51 3.9 0 6.55-3.55 6.55-8.3C19.81 5.52 16.72 2 12.02 2Z" />
                      </svg>
                    )}
                  </span>

                  <span className="pointer-events-none absolute bottom-1.5 h-1 w-1 rounded-full bg-[#f36b0b] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom signature */}
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
            <p className="text-[8px] tracking-[0.12em] text-[#69645e] sm:text-[9px]">
              CRAFTED FOR THE ART OF BAKING
            </p>

            <span className="text-[9px] text-[#f36b0b]/80">
              EST. IN FIRE.
            </span>
          </div>
        </footer>
      </div>

      {/* Tailwind arbitrary animation keyframes */}
      <style>{`
        @keyframes igFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes socialEnter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .instagram-section,
          .instagram-section * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
