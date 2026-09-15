import { useState, useEffect, useRef } from "react";

/**
 * Observe which of the given section IDs is currently most visible and return its id.
 * Handles top of page (first item) and bottom of page (last item) edge cases cleanly.
 *
 * @param {string[]}  ids      Section element IDs to observe.
 * @param {string}    fallback ID returned when no tracked section is active.
 * @param {object}    opts     Optional { rootMargin, threshold }.
 */
export function useActiveSection(ids, fallback = "about", opts = {}) {
  const [active, setActive] = useState(fallback);
  const mapRef = useRef(new Map());

  useEffect(() => {
    if (!ids || ids.length === 0) return;

    const { rootMargin = "-15% 0px -50% 0px", threshold = [0, 0.1, 0.25, 0.5, 0.75, 1.0] } = opts;

    const checkScrollBoundary = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 80) {
        setActive(ids[0] || fallback);
        return true;
      }

      if (windowHeight + scrollY >= documentHeight - 60) {
        setActive(ids[ids.length - 1] || fallback);
        return true;
      }

      return false;
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          mapRef.current.set(entry.target.id, entry.intersectionRatio);
        });

        if (checkScrollBoundary()) return;

        let bestRatio = 0;
        let bestId = "";

        mapRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0 && bestId) {
          setActive(bestId);
        }
      },
      { rootMargin, threshold }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    const onScroll = () => {
      checkScrollBoundary();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, fallback, opts]);

  return active;
}

export default useActiveSection;
