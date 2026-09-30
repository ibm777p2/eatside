'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import Reveal from '@/components/Reveal';
import { heritage } from '@/lib/content';

export default function Story() {
  const [headline, ...lines] = heritage.lines;
  return (
    <section className="heritage" id="story">
      <div className="heritage-body">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="h2">{headline}</h2>
        </Reveal>
        <div className="taglines">
          {lines.map((l, i) => (
            <Reveal key={l} delay={0.15 + i * 0.1} className="tagline">
              <small>0{i + 1}</small>
              {l}
            </Reveal>
          ))}
        </div>
      </div>
      <div className="heritage-media">
        <Image src="/images/heritage.jpg" alt="A grandmother shaping dough by hand in her kitchen" fill sizes="(min-width: 1000px) 60vw, 100vw" />
        <motion.div
          className="heritage-logo"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo variant="light" />
        </motion.div>
      </div>
    </section>
  );
}
