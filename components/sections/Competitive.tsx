'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { competitors } from '@/lib/content';

export default function Competitive() {
  const last = competitors.columns.length - 1;
  return (
    <section className="section" id="competitive" style={{ background: 'var(--white)' }}>
      <div className="container comp-grid">
        <Reveal>
          <p className="eyebrow">A new category</p>
          <h2 className="h2">How Residency compares</h2>
          <p className="comp-note">
            We&apos;re not competing with restaurants.
            <br />
            We&apos;re creating a new category.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="table-wrap">
            <table className="comp-table">
              <thead>
                <tr>
                  <th />
                  {competitors.columns.map((c, i) => (
                    <th key={c} className={i === last ? 'us' : ''} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.rows.map((r, ri) => (
                  <motion.tr
                    key={r.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + ri * 0.07 }}
                  >
                    <td>{r.label}</td>
                    {r.cells.map((cell, ci) => (
                      <td key={ci} className={ci === last ? 'us' : ''}>
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="comp-cards">
            {competitors.rows.map((r) => (
              <article className="comp-card" key={r.label}>
                <h3>{r.label}</h3>
                <div className="us-val">
                  <small>{competitors.columns[last]}</small>
                  {r.cells[last]}
                </div>
                <ul>
                  {r.cells.slice(0, last).map((cell, ci) => (
                    <li key={ci}>
                      <span>{competitors.columns[ci]}</span>
                      <b>{cell}</b>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
