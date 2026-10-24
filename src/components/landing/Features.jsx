import React from 'react';

const featureIcons = {
  brain: <><path d="M9 3a3 3 0 0 0-3 3v.3A3.7 3.7 0 0 0 4 13a3.5 3.5 0 0 0 3 5.8A3 3 0 0 0 12 17V6a3 3 0 0 0-3-3Z"/><path d="M15 3a3 3 0 0 1 3 3v.3A3.7 3.7 0 0 1 20 13a3.5 3.5 0 0 1-3 5.8A3 3 0 0 1 12 17M8 8c1.5 0 2.5 1 2.5 2.5M16 8c-1.5 0-2.5 1-2.5 2.5M8 14c1.2 0 2 .5 2.5 1.5M16 14c-1.2 0-2 .5-2.5 1.5"/></>,
  list: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 9 1.5 1.5L12 8M14 10h2M8 15h8"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M12 14h2M7 17h2"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m13 11 6-6M16 5h3v3"/></>,
  chart: <><path d="M4 19V5M4 19h17"/><rect x="7" y="12" width="3" height="4" rx="1"/><rect x="12" y="8" width="3" height="8" rx="1"/><rect x="17" y="4" width="3" height="12" rx="1"/></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.5-3.3 1.7 1.7 0 0 1 1.3-2.8H18a3 3 0 0 0 3-3c0-5-4-8.9-9-8.9Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="15" cy="8" r="1"/></>,
};
const featuresList = [
  { icon: 'brain', title: 'برنامه‌ریز هوشمند', desc: 'هدفتان را وارد کنید و آن را به گام‌ها و وظایف قابل اجرا تبدیل کنید.', tone: 'violet' },
  { icon: 'list', title: 'مدیریت وظایف', desc: 'اولویت‌ها، مهلت‌ها و وضعیت کارها را در یک نمای روشن مدیریت کنید.', tone: 'blue' },
  { icon: 'calendar', title: 'تقویم هوشمند', desc: 'برنامه‌ی هفتگی و ماهانه‌تان را یک‌جا ببینید و بهتر زمان‌بندی کنید.', tone: 'cyan' },
  { icon: 'target', title: 'ردیابی اهداف', desc: 'پیشرفت هدف‌های بلندمدت را دنبال کنید و مسیرتان را شفاف ببینید.', tone: 'green' },
  { icon: 'chart', title: 'تحلیل بهره‌وری', desc: 'روند پیشرفت و عادت‌های کاری‌تان را با نمایی قابل‌فهم بررسی کنید.', tone: 'amber' },
  { icon: 'palette', title: 'ظاهر دلخواه شما', desc: 'تجربه‌ای تمیز و مدرن با سطوح شیشه‌ای و جزئیات بصری ظریف.', tone: 'pink' },
];
const toneClasses = {
  violet: 'bg-violet-400/10 text-violet-200 ring-violet-300/20',
  blue: 'bg-blue-400/10 text-blue-200 ring-blue-300/20',
  cyan: 'bg-cyan-400/10 text-cyan-200 ring-cyan-300/20',
  green: 'bg-emerald-400/10 text-emerald-200 ring-emerald-300/20',
  amber: 'bg-amber-400/10 text-amber-200 ring-amber-300/20',
  pink: 'bg-pink-400/10 text-pink-200 ring-pink-300/20',
};

const Features = () => (
  <section className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10 py-20 sm:py-24" id="features">
    <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[.08] px-3.5 py-1.5 text-xs tracking-wide text-violet-200">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> امکانات MH Flow
      </span>
      <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.6rem)] font-bold leading-tight text-white">همه‌چیز برای تمرکز روی کارهای مهم</h2>
      <p className="mx-auto max-w-[520px] text-sm sm:text-base leading-7 text-slate-100/60">ابزارهایی برای برنامه‌ریزی شفاف‌تر، پیگیری آسان‌تر و پیشرفت پیوسته‌تر.</p>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featuresList.map((feature) => (
        <article key={feature.title} className="group relative overflow-hidden rounded-2xl border border-white/[.11] bg-white/[.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/[.06] motion-reduce:transform-none">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${toneClasses[feature.tone]}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{featureIcons[feature.icon]}</svg>
          </div>
          <h3 className="mb-2 text-base font-semibold text-white">{feature.title}</h3>
          <p className="text-sm leading-7 text-slate-100/60">{feature.desc}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Features;
