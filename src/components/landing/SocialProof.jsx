import React from 'react';

const SocialProof = () => {
  return (
    <div className="py-6 px-10 border-y border-white/10 bg-white/5 flex justify-center items-center gap-12 flex-wrap text-center">
      <div className="flex items-center gap-2.5 text-slate-50/55 text-sm">
        <span className="text-lg">👥</span>
        <span className="font-bold text-slate-50">+۱۲۰۰۰</span> کاربر فعال
      </div>
      <div className="flex items-center gap-2.5 text-slate-50/55 text-sm">
        <span className="text-lg">★</span>
        <span className="font-bold text-slate-50">۴.۹/۵</span> امتیاز کاربران
      </div>
      <div className="flex items-center gap-2.5 text-slate-50/55 text-sm">
        <span className="text-lg">🏆</span>
        <span className="font-bold text-slate-50">#۱</span> Product Hunt این هفته
      </div>
      <div className="flex items-center gap-2.5 text-slate-50/55 text-sm">
        <span className="text-lg">⚡</span>
        <span className="font-bold text-slate-50">+۸۰٪</span> افزایش بهره‌وری
      </div>
    </div>
  );
};

export default SocialProof;