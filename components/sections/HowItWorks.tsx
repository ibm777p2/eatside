'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { steps } from '@/lib/content';

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Three steps</p>
          <h2 className="display">How It Works</h2>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15} className="step">
              <div className="step-top">
                <span className="step-n">{s.n}</span>
                <h3 className="h3">{s.title}</h3>
                <motion.span
                  className="step-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.35 }}
                />
              </div>
              <p className="body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
