import { NextResponse } from 'next/server';

// Stores "Join the residency" sign-ups in the Supabase `public.signups` table.
// The table's row-level security only allows INSERT for the anon role, so the
// public (anon / publishable) key can add rows but can never read them back.
const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://xzhojbldjaroqkutjnrz.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

const ROLES = new Set(['creator', 'kitchen', 'diner']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!SUPABASE_KEY) {
    console.error('SUPABASE_ANON_KEY is not set');
    return NextResponse.json({ error: 'Sign-ups are not configured yet.' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const role = String(body.role ?? '');
  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 320);
  const city = String(body.city ?? '').trim().slice(0, 200);

  if (!ROLES.has(role) || !name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter your name and a valid email.' }, { status: 400 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/signups`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ role, name, email, city: city || null }),
  });

  // 409 = this email already signed up for this role; treat it as success.
  if (res.ok || res.status === 409) {
    return NextResponse.json({ ok: true });
  }

  console.error('Supabase insert failed', res.status, await res.text());
  return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 502 });
}
