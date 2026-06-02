import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute w-[600px] h-[600px] bg-[#7C3AED] rounded-full blur-[100px] opacity-35 -top-[200px] -right-[200px] animate-float1"></div>
      <div className="absolute w-[500px] h-[500px] bg-brandBlue rounded-full blur-[100px] opacity-35 bottom-[10%] -left-[150px]"></div>
      <div className="absolute w-[350px] h-[350px] bg-brandPink rounded-full blur-[100px] opacity-35 top-[40%] right-[30%]"></div>
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>
    </div>
  );
};

export default BackgroundEffects;