import { marquee } from '@/lib/content';

const dots = ['var(--sage)', 'var(--auburn)', 'var(--mustard)', 'var(--cream)', 'var(--cyan)'];

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" data-dark aria-hidden>
      <div className="marquee-track">
        {items.map((m, i) => (
          <span className="marquee-item" key={i}>
            {m}
            <i style={{ background: dots[i % dots.length] }} />
          </span>
        ))}
      </div>
    </div>
  );
}
