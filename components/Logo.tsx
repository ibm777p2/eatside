import { DISC_PATH, E_PATH, LOGO_VIEWBOX, WORD_PATHS } from './logoPaths';

type Props = {
  className?: string;
  /** "light" forces white letters (for photos / dark backgrounds); default inherits the text colour. */
  variant?: 'auto' | 'light' | 'dark';
};

/** The Eatside wordmark, traced from the vector artwork in the brand deck. */
export default function Logo({ className = '', variant = 'auto' }: Props) {
  const color = variant === 'light' ? '#ffffff' : variant === 'dark' ? '#000000' : 'currentColor';
  return (
    <svg className={`logo ${className}`} viewBox={LOGO_VIEWBOX} role="img" aria-label="Eatside" style={{ color }}>
      <path d={DISC_PATH} fill="var(--logo-olive)" />
      <path d={E_PATH} fill="currentColor" />
      {WORD_PATHS.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Just the "e" disc — used as an app-icon style mark. */
export function LogoMark({ className = '', size = 64 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 101 101" role="img" aria-label="Eatside">
      <path d={DISC_PATH} fill="var(--logo-olive)" />
      <path d={E_PATH} fill="#ffffff" />
    </svg>
  );
}
