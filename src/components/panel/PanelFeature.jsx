import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PanelIcon from './PanelIcon';

const featureContent = {
  '/dashboard/ai-planner': {
    title: 'برنامه‌ریز هوشمند',
    description: 'هدف خود را تعریف کنید تا مسیر انجام آن را به گام‌های کوچک‌تر تبدیل کنید.',
    icon: 'ai',
    badge: 'به‌زودی',
    detail: 'فضای برنامه‌ریزی با هوش مصنوعی در حال آماده‌سازی است.'
  },
  '/dashboard/analytics': {
    title: 'تحلیل و گزارش‌ها',
    description: 'نمایی دقیق از روند انجام وظایف و زمان تمرکز خود داشته باشید.',
    icon: 'analytics',
    badge: 'نسخه Pro',
    detail: 'گزارش‌های پیشرفته بهره‌وری در این بخش در دسترس قرار می‌گیرند.'
  }
};

const PanelFeature = () => {
  const { pathname } = useLocation();
  const feature = featureContent[pathname] || featureContent['/dashboard/ai-planner'];

  return (
    <section className="relative min-h-full overflow-hidden p-5 sm:p-8 text-slate-50" dir="rtl">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brandPurple/10 blur-[100px]" />
      <div className="relative mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold text-brandPurple">MH FLOW / WORKSPACE</p>
            <h1 className="text-2xl font-bold sm:text-3xl">{feature.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-50/55">{feature.description}</p>
          </div>
          <span className="rounded-full border border-brandPurple/30 bg-brandPurple/10 px-3 py-1.5 text-xs font-semibold text-purple-200">{feature.badge}</span>
        </header>

        <div className="rounded-3xl border border-white/10 bg-[#0f0c32]/65 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-brandPurple/30 bg-gradient-to-br from-brandPurple/20 to-brandBlue/10 text-brandPurple">
            <PanelIcon name={feature.icon} size={28} />
          </div>
          <h2 className="text-lg font-bold">این بخش هنوز آماده نشده است</h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-50/55">{feature.detail}</p>
          <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brandPurple to-brandViolet px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brandPurple/20">
            <PanelIcon name="dashboard" size={17} /> بازگشت به داشبورد
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PanelFeature;
