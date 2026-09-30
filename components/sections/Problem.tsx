import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { problems } from '@/lib/content';

export default function Problem() {
  return (
    <section className="section" id="problem" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <p className="eyebrow">The problem</p>
          <h2 className="h2" style={{ maxWidth: '12em' }}>
            Empty kitchens. Stalled creators. Bored diners.
          </h2>
        </Reveal>
        <div className="problem-grid">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <article className="problem-card">
                <div className="media">
                  <span className="num">0{i + 1}</span>
                  <Image src={p.image} alt={p.title} fill sizes="(min-width: 860px) 33vw, 100vw" />
                </div>
                <h3 className="h3">{p.title}</h3>
                <p className="body">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
