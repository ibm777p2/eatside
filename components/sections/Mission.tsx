'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { mission } from '@/lib/content';

const accents = new Set(['revenue-generating', 'creator-chefs', 'audience', 'viral', 'profitable']);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const clean = word.replace(/[^a-zA-Z-]/g, '');
  return (
    <motion.span className={`w ${accents.has(clean) ? 'accent' : ''}`} style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function Mission() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = mission.split(' ');

  return (
    <section className="section mission" id="mission">
      <div className="container">
        <p className="eyebrow">Our mission</p>
        <p className="mission-text" ref={ref}>
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
