'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { animate } from 'framer-motion';
import Counter, { formatNumber } from '@/components/Counter';
import Reveal from '@/components/Reveal';
import { night } from '@/lib/content';
import { useInView } from '@/lib/useInView';

const PlatesScene = dynamic(() => import('@/components/three/PlatesScene'), { ssr: false });

function Calculator() {
  const [guests, setGuests] = useState(night.guests);
  const [price, setPrice] = useState(night.price);
  const gross = guests * price;
  const pct = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`;

  return (
    <div className="calc" data-dark>
      <div style={{ position: 'relative' }}>
        <p className="eyebrow light">For creator-chefs</p>
        <h3>What could your residency night earn?</h3>
        <p className="body" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Cook one night, earn $500–$2,000, build your brand. No lease. No deposit. No risk.
        </p>

        <div className="range">
          <div className="range-head">
            <label htmlFor="guests">Guests</label>
            <b>{guests}</b>
          </div>
          <input
            id="guests"
            type="range"
            min={10}
            max={60}
            value={guests}
            onChange={(e) => setGuests(+e.target.value)}
            style={{ '--p': pct(guests, 10, 60) } as React.CSSProperties}
          />
        </div>
        <div className="range">
          <div className="range-head">
            <label htmlFor="price">Ticket price</label>
            <b>${price}</b>
          </div>
          <input
            id="price"
            type="range"
            min={45}
            max={200}
            step={5}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            style={{ '--p': pct(price, 45, 200) } as React.CSSProperties}
          />
        </div>
        <p className="fine">
          Illustrative estimate using the 50% creator payout from our example residency night. Ingredient costs not
          included.
        </p>
      </div>

      <div className="calc-out" aria-live="polite">
        <div className="calc-row big">
          <span>Your payout</span>
          <b>${formatNumber(gross * 0.5)}</b>
        </div>
        <div className="calc-row">
          <span>Gross ticket revenue</span>
          <b>${formatNumber(gross)}</b>
        </div>
        <div className="calc-row">
          <span>You earn per guest</span>
          <b>${formatNumber(price * 0.5, price % 2 ? 2 : 0)}</b>
        </div>
      </div>
    </div>
  );
}

export default function Earnings() {
  const platesRef = useRef<HTMLDivElement>(null);
  const near = useInView(platesRef, { rootMargin: '200px' });
  const seen = useInView(platesRef, { rootMargin: '-15% 0px', once: true });
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const c = animate(0, night.guests, { duration: 2.8, ease: 'easeInOut', onUpdate: (v) => setFilled(Math.round(v)) });
    return () => c.stop();
  }, [seen]);

  const splitItems = [{ label: 'Gross Revenue', value: night.gross, color: 'var(--black)' }, ...night.split];

  return (
    <section className="section earnings" id="earnings">
      <div className="container">
        <div className="earn-grid">
          <Reveal className="earn-media">
            <Image src="/images/creator.jpg" alt="A creator-chef holding a plate of fried fish" fill sizes="(min-width: 1000px) 45vw, 100vw" />
            <p className="earn-story">{night.story}</p>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">One night, by the numbers</p>
              <h2 className="earn-title">
                Per Residency Night
                <br />({night.guests} guests @ ${night.price})
              </h2>
            </Reveal>

            <div className="plates" ref={platesRef}>
              {near && <PlatesScene filled={filled} run={near} />}
              <div className="plates-hud">
                <span className="live">Live · {filled}/{night.guests} seated</span>
                <span>${formatNumber(filled * night.price)}</span>
              </div>
            </div>

            <div className="split-grid">
              {splitItems.map((s, i) => (
                <div className="split-item" key={s.label}>
                  <Counter className="v" to={s.value} prefix="$" duration={2.2} delay={0.2 + i * 0.1} />
                  <div className="l">
                    <i style={{ background: s.color }} />
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal>
          <Calculator />
        </Reveal>
      </div>
    </section>
  );
}
