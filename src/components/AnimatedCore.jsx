import React from 'react';

const AnimatedCore = () => {
  return (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-6">
      <div className="absolute inset-0 rounded-full border-[1px] border-brandPurple/30 animate-[spin_6s_linear_infinite]"></div>
      <div className="absolute inset-2 rounded-full border-[1px] border-brandBlue/40 animate-[spin_4s_linear_infinite_reverse]"></div>
      <div className="absolute inset-4 rounded-full border-[1px] border-brandPink/20 animate-[spin_5s_linear_infinite]"></div>
      
      <div className="absolute inset-6 bg-gradient-to-br from-brandPurple to-brandBlue rounded-full blur-[12px] animate-pulse"></div>
      
      <div className="absolute inset-7 bg-gradient-to-br from-[#0f0c32] to-darkBg rounded-full border border-white/10 shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center justify-center">
        <div className="text-brandPurple animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCore;