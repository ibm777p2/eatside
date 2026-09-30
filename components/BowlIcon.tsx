/** The bowl mark from the deck's side rail. */
export default function BowlIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 34 21" fill="none" aria-hidden>
      <ellipse cx="17" cy="5" rx="15.5" ry="3.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5.2C2.6 13 9 19.5 17 19.5S31.4 13 32.5 5.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 19.2h12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
