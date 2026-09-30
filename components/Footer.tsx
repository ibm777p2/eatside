'use client';

import Logo from './Logo';
import { nav } from '@/lib/content';
import { scrollToHash } from '@/lib/scroll';

export default function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="container">
        <div className="footer-top">
          <p className="lead" style={{ maxWidth: '18em' }}>
            Empty restaurants. Full tables. <br />
            <span style={{ color: 'var(--cyan)' }}>Not a restaurant. Not a pop-up. A residency.</span>
          </p>
          <nav className="footer-links" aria-label="Footer">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(n.href);
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <Logo className="footer-big" variant="light" />
        <div className="footer-bottom">
          <span>© 2026 Eatside. All rights reserved.</span>
          <span>Airbnb for restaurant nights</span>
        </div>
      </div>
    </footer>
  );
}
