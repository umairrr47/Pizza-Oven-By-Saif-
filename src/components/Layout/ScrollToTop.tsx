// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ScrollToTop: React.FC = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to top whenever route changes
//   }, [pathname]);

//   return null;
// };

// export default ScrollToTop;


import { useLayoutEffect, useRef } from "react";
import {
  useLocation,
  useNavigationType,
} from "react-router-dom";

type ScrollPosition = {
  x: number;
  y: number;
};

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number,
        options?: {
          immediate?: boolean;
          force?: boolean;
        }
      ) => void;
    };
  }
}

const positions = new Map<string, ScrollPosition>();

function scrollToPosition(position: ScrollPosition) {
  const lenis = window.__lenis;

  if (lenis) {
    lenis.scrollTo(position.y, {
      immediate: true,
      force: true,
    });

    // Also restore the horizontal position if necessary.
    window.scrollTo({
      left: position.x,
      top: position.y,
      behavior: "instant",
    });
  } else {
    window.scrollTo({
      left: position.x,
      top: position.y,
      behavior: "instant",
    });
  }
}

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const currentKey = useRef(location.key);
  const currentPath = useRef(location.pathname);

  // Let React Router, rather than the browser, manage restoration.
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const previousKey = currentKey.current;

    // Save the page being left before restoring the destination.
    positions.set(previousKey, {
      x: window.scrollX,
      y: window.scrollY,
    });

    currentKey.current = location.key;
    currentPath.current = location.pathname;

    if (navigationType === "POP") {
      const savedPosition = positions.get(location.key);

      if (savedPosition) {
        // Wait until the destination page has rendered.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToPosition(savedPosition);
          });
        });
      } else {
        // A history entry without a saved position starts at the top.
        requestAnimationFrame(() => {
          scrollToPosition({ x: 0, y: 0 });
        });
      }
    } else {
      // New navigation: start at the top.
      requestAnimationFrame(() => {
        scrollToPosition({ x: 0, y: 0 });
      });
    }

    return () => {
      // Preserve the current route's scroll position before it unmounts.
      positions.set(currentKey.current, {
        x: window.scrollX,
        y: window.scrollY,
      });
    };
  }, [location.key, location.pathname, navigationType]);

  return null;
}
