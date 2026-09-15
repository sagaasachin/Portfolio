import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Generic scroll-reveal wrapper.  Wraps children in a motion.div that fades
 * and translates in from below (or from any custom variant).
 *
 * Props:
 *  - children
 *  - delay      (number) seconds to delay after entering viewport
 *  - duration   (number) seconds
 *  - y          (px) vertical travel
 *  - once       (bool) animate only once (default true)
 *  - as         (string/html tag) wrapper element (default div)
 *  - className
 *  - margin     IntersectionObserver rootMargin
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  once = true,
  as = "div",
  className = "",
  margin = "0px 0px -80px 0px",
  ...rest
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
