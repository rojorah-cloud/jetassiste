type Props = { className?: string };

/** Kawaii strawberry mascot, sticker style (ink outline + offset hard shadow). */
export function StrawberryMascot({ className }: Props) {
  const ink = "#0B0D24";
  return (
    <svg viewBox="0 0 240 260" className={className} aria-hidden="true" role="img">
      {/* hard offset shadow */}
      <path
        d="M128 78c52 0 92 28 92 74 0 52-46 98-92 98s-92-46-92-98c0-46 40-74 92-74z"
        fill={ink}
      />
      {/* body */}
      <path
        d="M120 70c52 0 92 28 92 74 0 52-46 98-92 98s-92-46-92-98c0-46 40-74 92-74z"
        fill="#EF5350"
        stroke={ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* soft highlight */}
      <path d="M58 118c6-18 22-30 40-34" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* seeds */}
      {[
        [70, 160], [92, 196], [150, 196], [172, 160], [120, 222], [62, 132], [180, 128], [104, 104], [140, 104],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="6" fill="#FFD54A" stroke={ink} strokeWidth="1.5" transform={`rotate(${(i % 3) * 15 - 15} ${x} ${y})`} />
      ))}
      {/* leaf crown */}
      <g stroke={ink} strokeWidth="5" strokeLinejoin="round" fill="#5BAE5B">
        <path d="M120 82 L80 62 Q96 50 112 58 Z" />
        <path d="M120 82 L160 62 Q144 50 128 58 Z" />
        <path d="M120 84 L94 40 Q114 36 120 56 Q126 36 146 40 Z" />
        <path d="M120 60 Q118 30 132 16" fill="none" strokeLinecap="round" />
      </g>
      {/* eyes */}
      <g>
        <circle cx="94" cy="146" r="17" fill={ink} />
        <circle cx="146" cy="146" r="17" fill={ink} />
        <circle cx="100" cy="139" r="6" fill="#FFFFFF" />
        <circle cx="152" cy="139" r="6" fill="#FFFFFF" />
        <circle cx="89" cy="153" r="2.5" fill="#FFFFFF" />
        <circle cx="141" cy="153" r="2.5" fill="#FFFFFF" />
      </g>
      {/* cheeks */}
      <ellipse cx="72" cy="172" rx="9" ry="5" fill="#FF8A80" opacity=".8" />
      <ellipse cx="168" cy="172" rx="9" ry="5" fill="#FF8A80" opacity=".8" />
      {/* smile */}
      <path d="M110 176 Q120 186 130 176" stroke={ink} strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
