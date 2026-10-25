import { useEffect, useRef, useState, type ReactNode } from "react";

type Color = "mint" | "lavender" | "sky";

// Hand-painted marker strokes (viewBox 0 0 200 40): wavy edges, varying thickness, frayed ends.
const STROKES = [
  "M3 14 C 22 9, 48 12, 74 10 S 128 7, 152 9 S 188 8, 197 12 C 199 17, 196 22, 198 27 C 176 31, 150 29, 122 32 S 66 33, 40 31 S 10 33, 2 29 C 5 24, 1 19, 3 14 Z",
  "M1 12 C 30 7, 60 11, 92 8 S 150 10, 178 7 C 190 6, 197 9, 199 13 C 197 19, 200 24, 196 29 C 168 33, 140 30, 110 33 S 50 30, 24 33 C 12 34, 4 31, 2 27 C 4 22, 0 17, 1 12 Z",
  "M4 11 C 26 13, 54 8, 86 11 S 142 8, 170 11 C 184 12, 195 9, 198 14 C 195 20, 199 25, 197 30 C 170 28, 146 33, 116 30 S 58 34, 30 30 C 18 29, 7 33, 3 28 C 1 23, 5 17, 4 11 Z",
];

/** Hand-painted pastel marker behind text. With `animate`, the stroke paints left→right on scroll into view. */
export function Highlight({
  children,
  animate = false,
  color = "mint",
  variant = 0,
  onDark = false,
}: {
  children: ReactNode;
  animate?: boolean;
  color?: Color;
  variant?: 0 | 1 | 2;
  onDark?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(!animate);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [animate]);

  return (
    <span
      ref={ref}
      className={`marker marker-${color} ${animate ? "marker-anim" : ""} ${on ? "is-on" : ""} ${onDark ? "marker-on-dark" : ""}`}
    >
      <svg className="marker-stroke" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
        <path d={STROKES[variant]} />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}
