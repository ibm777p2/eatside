'use client';

import { motion } from 'framer-motion';
import Counter from '@/components/Counter';
import Reveal from '@/components/Reveal';
import { opportunity } from '@/lib/content';

export default function Opportunity() {
  return (
    <section className="section" id="opportunity" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="opp-head">
          <Reveal>
            <p className="eyebrow">Why now</p>
            <h2 className="display">The Opportunity</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Three markets are converging: what America spends on food, the creators who shape it, and the kitchen
              capacity sitting idle.
            </p>
          </Reveal>
        </div>
        <div className="opp-grid">
          {opportunity.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.12} className="opp-item">
              <Counter className="stat" to={o.value} prefix={o.prefix} suffix={o.suffix} decimals={o.decimals} duration={2.4} delay={i * 0.12} />
              <div className="bar">
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.12 }}
                />
              </div>
              <h3 className="h3">{o.title}</h3>
              <p className="body">{o.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
