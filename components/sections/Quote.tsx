'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { quote } from '@/lib/content';

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const words = quote.text.split(' ');

  return (
    <section className="quote" ref={ref} data-dark>
      <motion.div className="quote-bg" style={{ y }}>
        <Image src="/images/service.jpg" alt="" fill sizes="100vw" />
      </motion.div>
      <div className="quote-inner">
        <motion.p
          className="quote-kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {quote.kicker}
        </motion.p>
        <blockquote className="quote-text" style={{ margin: '0 auto' }}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', marginRight: '0.24em' }}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </blockquote>
      </div>
    </section>
  );
}
