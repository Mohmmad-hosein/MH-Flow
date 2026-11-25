import React from 'react';

const BackgroundEffects = () => (
  <div aria-hidden="true" className="mh-landing-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="mh-glow mh-glow-purple absolute -right-48 -top-56 h-[620px] w-[620px] rounded-full" />
    <div className="mh-glow mh-glow-cyan absolute -left-56 top-[24%] h-[560px] w-[560px] rounded-full" />
    <div className="mh-glow mh-glow-pink absolute right-[18%] top-[58%] h-[430px] w-[430px] rounded-full" />
    <div className="mh-glow mh-glow-mint absolute -bottom-64 right-[42%] h-[520px] w-[520px] rounded-full" />
    <div className="absolute inset-0 opacity-[.12]" style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.16) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, black, transparent 88%)' }} />
  </div>
);

export default BackgroundEffects;
