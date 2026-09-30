'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { hero } from '@/lib/content';
import { scrollToHash } from '@/lib/scroll';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 180]);
  const textY = useTransform(scrollY, [0, 900], [0, -120]);
  const fade = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="hero" id="top" data-dark>
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <Image src="/images/hero-plate.jpg" alt="" fill priority sizes="100vw" />
      </motion.div>
      <div className="hero-shade" />
      <div className="grain" />

      <div className="hero-canvas">
        <HeroScene />
      </div>

      <motion.div className="container hero-content" style={{ y: textY, opacity: fade }}>
        <h1 className="display">
          {hero.title.map((line, i) => (
            <span className="hero-line" key={line}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.3, ease, delay: 0.2 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.75 }}
        >
          {hero.tagline}
          <br />
          {hero.sub}
        </motion.p>
        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.95 }}
        >
          <a
            className="btn btn-primary"
            href="#join"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash('#join');
            }}
          >
            Join the residency <span className="arrow">→</span>
          </a>
          <a
            className="btn btn-ghost"
            href="#platform"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash('#platform');
            }}
          >
            See how it works
          </a>
          <span className="hero-kicker">For creator-chefs &amp; restaurant owners</span>
        </motion.div>
      </motion.div>

      <div className="scroll-cue" aria-hidden>
        Scroll <i />
      </div>
    </section>
  );
}
