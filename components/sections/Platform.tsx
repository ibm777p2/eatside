'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { platform } from '@/lib/content';

type Audience = 'creators' | 'restaurants';

export default function Platform() {
  const [tab, setTab] = useState<Audience>('creators');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const a = platform[tab];

  return (
    <section className="platform" id="platform">
      <div className="platform-media" ref={ref}>
        <motion.div className="fill-img" style={{ scale }}>
          <Image src="/images/plating-hands.jpg" alt="A creator-chef plating a dish" fill sizes="(min-width: 980px) 45vw, 100vw" />
        </motion.div>
      </div>
      <div className="platform-body">
        <Reveal>
          <p className="eyebrow">The platform</p>
          <h2 className="h2">{platform.headline}</h2>
        </Reveal>

        <div className="tabs" role="tablist" aria-label="Choose your side">
          {(['creators', 'restaurants'] as Audience[]).map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>
              {tab === k && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              {platform[k].title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="audience"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="lead">{a.body}</p>
            <div className="chips">
              {a.chips.map((c, i) => (
                <span key={c} className={`chip ${tab === 'creators' && i === 0 ? 'warm' : ''}`}>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <Reveal>
          <p className="residency-line">
            Not a restaurant. Not a pop-up.
            <br />A residency.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
