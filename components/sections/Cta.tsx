'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { LogoMark } from '@/components/Logo';

const roles = [
  { id: 'creator', label: 'Creator-Chef', hint: 'I have an audience' },
  { id: 'kitchen', label: 'Kitchen', hint: 'I have a space' },
  { id: 'diner', label: 'Diner', hint: 'Notify me' },
] as const;

type Role = (typeof roles)[number]['id'];

export default function Cta() {
  const [role, setRole] = useState<Role>('creator');
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Saves the sign-up to Supabase via /api/signup.
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section cta" id="join">
      <div className="container cta-grid">
        <div>
          <Reveal>
            <p className="eyebrow light">Empty kitchens. Full tables.</p>
            <h2 className="display">Your first residency starts here.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 28, maxWidth: '26em' }}>
              Kitchens: earn revenue on nights you&apos;d otherwise lose money — zero upfront cost to join. Creator-chefs:
              cook one night, earn $500–$2,000, build your brand. No lease. No deposit. No risk.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="form">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" className="form-done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                  <LogoMark size={72} />
                  <h3>You&apos;re on the list.</h3>
                  <p className="body">We&apos;ll be in touch as residencies open in your city.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }}>
                  <h3>Join the residency</h3>
                  <p className="body">Tell us which side of the table you&apos;re on.</p>
                  <div className="role" role="radiogroup" aria-label="I am a">
                    {roles.map((r) => (
                      <button type="button" role="radio" aria-checked={role === r.id} key={r.id} className={role === r.id ? 'on' : ''} onClick={() => setRole(r.id)}>
                        {r.label}
                        <small>{r.hint}</small>
                      </button>
                    ))}
                  </div>
                  <div className="field">
                    <label htmlFor="name">{role === 'kitchen' ? 'Kitchen / business name' : 'Name'}</label>
                    <input id="name" name="name" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required autoComplete="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="city">{role === 'creator' ? 'City · @handle' : 'City'}</label>
                    <input id="city" name="city" />
                  </div>
                  {/* honeypot for bots — hidden from people and screen readers */}
                  <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />
                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button className="btn btn-primary" type="submit" disabled={sending}>
                    {sending ? 'Sending…' : role === 'diner' ? 'Notify me' : 'Request early access'}{' '}
                    {!sending && <span className="arrow">→</span>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
