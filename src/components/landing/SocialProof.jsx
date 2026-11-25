import React from 'react';

const SocialProof = () => (
  <div className="py-6 px-6 border-y border-white/10 bg-white/5 flex justify-center items-center gap-8 flex-wrap text-center" dir="rtl">
    {[['✓','وظایف شخصی و پروژه‌ها'],['▦','تقویم و برنامه‌ریزی'],['◈','فضای کاری تیمی'],['⌁','گفتگوی تیم و پیام خصوصی']].map(([icon,label]) => (
      <div key={label} className="flex items-center gap-2.5 text-slate-50/65 text-xs sm:text-sm"><span className="text-lg text-violet-300">{icon}</span><span>{label}</span></div>
    ))}
  </div>
);
export default SocialProof;
