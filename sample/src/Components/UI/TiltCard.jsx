import React, { useRef, useCallback } from "react";
import "./TiltCard.css";

/**
 * A glass card that subtly tilts in 3D following the pointer.
 * Disables on touch and when reduced-motion is preferred.
 */
export function TiltCard({
  children,
  className = "",
  glare = true,
  maxTilt = 8,
  style = {},
  ...rest
}) {
  const cardRef = useRef(null);

  const handlePointerMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / (rect.width / 2);
      const py = (e.clientY - cy) / (rect.height / 2);
      const rotateX = -py * maxTilt;
      const rotateY = px * maxTilt;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      if (glare) {
        const gx = (px + 1) * 50;
        const gy = (py + 1) * 50;
        card.style.setProperty("--glare-x", `${gx}%`);
        card.style.setProperty("--glare-y", `${gy}%`);
      }
    },
    [glare, maxTilt]
  );

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${glare ? "tilt-card--glare" : ""} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export default TiltCard;
