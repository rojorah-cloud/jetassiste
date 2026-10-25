import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mint marker highlight. With `animate`, the stroke draws left→right when scrolled into view. */
export function Highlight({ children, animate = false }: { children: ReactNode; animate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(!animate);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <span ref={ref} className={`marker ${animate ? "marker-anim" : ""} ${on ? "is-on" : ""}`}>
      {children}
    </span>
  );
}
