import React from 'react';

const Features = () => {
  const featuresList = [
    { icon: '🧠', title: 'برنامه‌ریز هوشمند', desc: 'هدف وارد کنید، AI برنامه کامل با milestone و task می‌سازد.', color: 'brandPurple' },
    { icon: '📋', title: 'مدیریت وظایف', desc: 'اولویت‌بندی، ددلاین، و وضعیت وظایف به سادگی.', color: 'brandBlue' },
    { icon: '📅', title: 'تقویم هوشمند', desc: 'نمای ماهانه و هفتگی با برنامه‌ریزی خودکار وظایف.', color: 'brandPink' },
    { icon: '🎯', title: 'ردیابی اهداف', desc: 'اهداف بلندمدت را دنبال کنید و پیشرفت واقعی ببینید.', color: 'green-500' },
    { icon: '📊', title: 'آنالیتیکس پیشرفته', desc: 'نمودارهای بهره‌وری، عادات، و روندهای شما.', color: 'yellow-500' },
    { icon: '🎨', title: 'تم‌های پریمیوم', desc: 'Glassmorphism، Neon، Minimal — بر اساس سلیقه خود انتخاب کنید.', color: 'brandViolet' }
  ];

  return (
    <section className="py-24 px-10 max-w-[1200px] mx-auto" id="features">
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 bg-brandPurple/15 border border-brandPurple/25 rounded-full text-xs text-purple-300 mb-4 tracking-wide">
          ✦ ویژگی‌ها
        </div>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold mb-4">همه چیزی که برای بهره‌وری نیاز دارید</h2>
        <p className="text-base text-slate-50/55 max-w-[520px] mx-auto">
          ابزارهایی که واقعاً کار می‌کنند، نه فقط خوب به نظر می‌رسند.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuresList.map((f, i) => (
          <div key={i} className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-brandPurple/40 hover:bg-brandPurple/10 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-default">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-${f.color}/15`}>
              {f.icon}
            </div>
            <div className="text-base font-semibold mb-2">{f.title}</div>
            <div className="text-sm text-slate-50/55 leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;