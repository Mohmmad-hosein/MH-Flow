import React from 'react';

const Footer = () => {
  return (
    <>
      <section className="relative py-24 px-10 text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.25),transparent_70%)] pointer-events-none -z-10"></div>
        
        <div className="inline-block px-3.5 py-1 bg-brandPurple/15 border border-brandPurple/25 rounded-full text-xs text-purple-300 mb-4 tracking-wide">
          ✦ همین الان شروع کنید
        </div>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-4 leading-tight">
          آماده‌اید بهره‌وری‌تان را<br />
          <span className="bg-gradient-to-r from-[#A78BFA] via-[#60A5FA] to-[#F472B6] bg-clip-text text-transparent">متحول کنید؟</span>
        </h2>
        <p className="text-base text-slate-50/55 mb-10">
          رایگان شروع کنید. هیچ کارت بانکی لازم نیست.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-5">
          <button className="px-8 py-3.5 bg-gradient-to-br from-brandPurple to-brandViolet rounded-xl text-white text-base font-semibold shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all">
            شروع رایگان ✦
          </button>
          <button className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-slate-50 text-base backdrop-blur-md transition-all">
            ▷ مشاهده دمو
          </button>
        </div>
        <div className="text-xs text-slate-50/30">بدون نیاز به کارت بانکی · نصب فوری · لغو هر زمان</div>
      </section>

      <footer className="py-8 px-10 border-t border-white/10 flex justify-between items-center flex-wrap gap-4 relative z-10">
        <a href="#" className="flex items-center gap-2 text-base font-bold text-slate-50 no-underline">
          <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-brandPurple to-brandViolet rounded-lg text-xs shadow-[0_0_15px_rgba(139,92,246,0.5)]">✦</div>
          MH Flow
        </a>
        <p className="text-xs text-slate-50/55">© ۲۰۲۵ MH Flow — تمام حقوق محفوظ است</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-slate-50/55 hover:text-slate-50 transition-colors">قیمت‌ها</a>
          <a href="#" className="text-xs text-slate-50/55 hover:text-slate-50 transition-colors">وبلاگ</a>
          <a href="#" className="text-xs text-slate-50/55 hover:text-slate-50 transition-colors">پشتیبانی</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;