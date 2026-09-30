'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { flywheel, flywheelNote } from '@/lib/content';
import { useInView } from '@/lib/useInView';

const FlywheelScene = dynamic(() => import('@/components/three/FlywheelScene'), { ssr: false });

export default function Flywheel() {
  const ref = useRef<HTMLElement>(null);
  const near = useInView(ref, { rootMargin: '300px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!near || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % flywheel.length), 2200);
    return () => clearInterval(id);
  }, [near, paused]);

  return (
    <section className="section flywheel" id="flywheel" ref={ref} data-dark>
      <div className="container flywheel-grid">
        <div>
          <Reveal>
            <p className="eyebrow light">The residency loop</p>
            <h2 className="h2">How Residency builds a self-reinforcing marketplace.</h2>
          </Reveal>
          <ol className="fw-list" onMouseLeave={() => setPaused(false)}>
            {flywheel.map((f, i) => (
              <li
                key={f}
                className={i === active ? 'active' : ''}
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onClick={() => setActive(i)}
              >
                {f}
              </li>
            ))}
          </ol>
          <Reveal>
            <p className="body fw-note">{flywheelNote}</p>
          </Reveal>
        </div>

        <div className="fw-canvas">
          {near && <FlywheelScene active={active} count={flywheel.length} run={near} />}
          <div className="fw-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.45 }}
              >
                <small>
                  Step {String(active + 1).padStart(2, '0')} / {String(flywheel.length).padStart(2, '0')}
                </small>
                <strong>{flywheel[active]}</strong>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
