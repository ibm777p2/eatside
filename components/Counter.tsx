'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export const formatNumber = (n: number, decimals = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 2, delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setVal,
    });
    return () => controls.stop();
  }, [inView, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(val, decimals)}
      {suffix}
    </span>
  );
}
