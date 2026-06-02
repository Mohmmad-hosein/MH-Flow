import React from 'react';

const Pricing = () => {
  return (
    <section className="py-24 px-10 max-w-[1200px] mx-auto" id="pricing">
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 bg-brandPurple/15 border border-brandPurple/25 rounded-full text-xs text-purple-300 mb-4 tracking-wide">
          ✦ قیمت‌گذاری
        </div>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold mb-4">شفاف، ساده، منصفانه</h2>
        <p className="text-base text-slate-50/55 max-w-[520px] mx-auto">
          با پلن رایگان شروع کنید. هر زمان که خواستید ارتقا دهید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mt-8">
        <div className="bg-[#0f0c32]/70 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-transform hover:-translate-y-1">
          <div className="text-[1.1rem] font-bold text-slate-50/55 mb-2">رایگان</div>
          <div className="text-[2.5rem] font-extrabold mb-1">۰ <span className="text-base font-normal text-slate-50/55">تومان/ماه</span></div>
          <div className="text-xs text-slate-50/55 mb-6">برای شروع و آزمایش پلتفرم</div>
          
          <ul className="space-y-2.5 mb-7">
            <li className="flex items-center gap-2 text-sm text-slate-50/55 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> تا ۳ پروژه</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/55 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> وظایف نامحدود</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/55 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> تقویم پایه</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/30 border-b border-white/5 pb-2"><span>✗</span> هوش مصنوعی</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/30"><span>✗</span> آنالیتیکس</li>
          </ul>
          <button className="w-full py-3 bg-transparent border border-white/10 rounded-xl text-slate-50/55 font-semibold transition-colors hover:border-brandPurple hover:text-slate-50">
            شروع رایگان
          </button>
        </div>

        <div className="bg-gradient-to-br from-brandPurple/15 to-brandViolet/10 border border-brandPurple/50 rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.2)] relative transition-transform hover:-translate-y-1">
          <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 bg-gradient-to-br from-brandPurple to-brandViolet rounded-full text-[11px] font-bold whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            ⭐ پیشنهاد ویژه
          </div>
          <div className="text-[1.1rem] font-bold bg-gradient-to-br from-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent mb-2">حرفه‌ای</div>
          <div className="text-[2.5rem] font-extrabold mb-1">$9.9 <span className="text-base font-normal text-slate-50/55">/Month</span></div>
          <div className="text-xs text-purple-300 mb-6">معادل ۲۹۵,۰۰۰ تومان/ماه</div>
          
          <ul className="space-y-2.5 mb-7">
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> پروژه نامحدود</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> تقویم پیشرفته</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> برنامه‌ریز AI</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> تم‌های ویژه</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80"><span>✓</span> آنالیتیکس کامل</li>
          </ul>
          <button className="w-full py-3 bg-gradient-to-br from-brandPurple to-brandViolet rounded-xl text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_0_35px_rgba(139,92,246,0.7)]">
            ارتقا به Pro ✦
          </button>
        </div>
        <div className="bg-[#0f0c32]/70 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-transform hover:-translate-y-1">
          <div className="text-[1.1rem] font-bold bg-gradient-to-br from-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent mb-2">فوق حرفه ای</div>
          <div className="text-[2.5rem] font-extrabold mb-1">$19.9 <span className="text-base font-normal text-slate-50/55">/Month</span></div>
          <div className="text-xs text-purple-300 mb-6">معادل ۲۹۵,۰۰۰ تومان/ماه</div>
          
          <ul className="space-y-2.5 mb-7">
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> پروژه نامحدود</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> تقویم پیشرفته</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> برنامه‌ریز AI</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80 border-b border-white/5 pb-2"><span className="text-green-500">✓</span> تم‌های ویژه</li>
            <li className="flex items-center gap-2 text-sm text-slate-50/80"><span>✓</span> آنالیتیکس کامل</li>
          </ul>
          <button className="w-full py-3 bg-transparent border border-white/10 rounded-xl text-slate-50/55 font-semibold transition-colors hover:border-brandPurple hover:text-slate-50">
            ارتقا به Pro + ✦
          </button>
        </div>

      </div>
    </section>
  );
};

export default Pricing;