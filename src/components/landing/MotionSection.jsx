import React from 'react';
import { m, useReducedMotion } from 'framer-motion';

export default function MotionSection({ children, className = '', delay = 0, id }) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -7% 0px' }}
      transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
