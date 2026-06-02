import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1200px] z-50 flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <a href="#" className="flex items-center gap-2.5 text-xl font-bold text-slate-50 no-underline">
        <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-brandPurple to-brandViolet rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.5)]">
          ✦
        </div>
        MH Flow
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        <li><a href="#features" className="text-slate-50/70 hover:text-slate-50 text-sm transition-colors">ویژگی‌ها</a></li>
        <li><a href="#pricing" className="text-slate-50/70 hover:text-slate-50 text-sm transition-colors">قیمت‌ها</a></li>
        <li><a href="#" className="text-slate-50/70 hover:text-slate-50 text-sm transition-colors">تیم</a></li>
        <li><a href="#" className="text-slate-50/70 hover:text-slate-50 text-sm transition-colors">درباره ما</a></li>
      </ul>

      <div className="flex items-center gap-3">
        <button className="px-5 py-2 bg-transparent border border-white/20 rounded-xl text-slate-50/70 text-sm hover:border-brandPurple hover:text-slate-50 hover:bg-white/5 transition-all">
          ورود
        </button>
        <button className="px-6 py-2 bg-gradient-to-br from-brandPurple to-brandViolet rounded-xl text-white text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:-translate-y-[1px] transition-all">
          شروع رایگان
        </button>
      </div>
    </nav>
  );
};

export default Navbar;