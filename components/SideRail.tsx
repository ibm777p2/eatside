'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import BowlIcon from './BowlIcon';

/** The fixed right-hand rail from every slide of the deck, with a scroll progress line. */
export default function SideRail() {
  const [dark, setDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.5;
      const darkEls = document.querySelectorAll<HTMLElement>('[data-dark]');
      let isDark = false;
      darkEls.forEach((el) => {
        const top = el.offsetTop;
        if (y >= top && y < top + el.offsetHeight) isDark = true;
      });
      setDark(isDark);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <aside className={`rail ${dark ? 'dark' : ''}`} aria-hidden>
      <BowlIcon />
      <div className="rail-progress">
        <motion.i style={{ scaleY }} />
      </div>
      <span className="rail-dot" />
      <span className="rail-text">EMPTY KITCHENS &nbsp;I&nbsp; FULL TABLES</span>
    </aside>
  );
}
