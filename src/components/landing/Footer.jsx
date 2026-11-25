
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerGroups = [
    {
      title: 'محصول',
      links: [
        { label: 'امکانات MH Flow', href: '/#features' },
        { label: 'پلن‌ها و قیمت‌ها', href: '/#pricing' },
        { label: 'فضای کاری تیمی', href: '/#team' },
        { label: 'شروع رایگان', to: '/login' },
      ],
    },
    {
      title: 'دسترسی سریع',
      links: [
        { label: 'صفحه اصلی', to: '/' },
        { label: 'درباره MH Flow', to: '/about' },
        { label: 'گزارش مشکل', to: '/report-bug' },
        { label: 'ورود به حساب', to: '/login' },
      ],
    },
    {
      title: 'پشتیبانی و قوانین',
      links: [
        { label: 'حریم خصوصی', to: '/privacy' },
        { label: 'شرایط استفاده', to: '/terms' },
        { label: 'سؤالات متداول', href: '/#faq' },
      ],
    },
  ];

  const benefits = [
    { icon: '✓', label: 'مدیریت متمرکز وظایف' },
    { icon: '✦', label: 'برنامه‌ریزی هوشمند' },
    { icon: '⌘', label: 'همکاری تیمی' },
  ];

  const ArrowIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        d="M7 17 17 7M7 7h10v10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="relative z-10 overflow-hidden">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[700px] overflow-hidden">
        <div className="absolute -bottom-48 -right-40 h-[420px] w-[420px] rounded-full bg-emerald-400/[0.07] blur-[120px]" />
        <div className="absolute bottom-20 left-[-180px] h-[400px] w-[400px] rounded-full bg-violet-500/[0.10] blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/[0.04] blur-[120px]" />
      </div>

      {/* CTA Section */}
      <section className="relative px-4 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[30px] border border-white/[0.10] bg-[#11132b]/80 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:rounded-[40px]">

          {/* Card lighting */}
          <div className="pointer-events-none absolute -right-20 -top-40 h-[350px] w-[350px] rounded-full bg-violet-500/[0.17] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-48 left-[20%] h-[350px] w-[350px] rounded-full bg-emerald-400/[0.10] blur-[110px]" />
          <div className="pointer-events-none absolute right-1/2 top-0 h-px w-2/3 translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

          <div className="relative grid items-center gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-20">

            {/* Main content */}
            <div className="max-w-2xl text-center lg:text-right">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-4 py-2 text-[11px] font-semibold text-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                وقتشه جریان کارت رو تغییر بدی
              </div>

              <h2 className="text-3xl font-black leading-[1.5] tracking-tight text-white sm:text-4xl lg:text-[48px]">
                کارهای بزرگ،
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-l from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  از قدم‌های کوچک شروع می‌شن.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-300/60 sm:text-base lg:mx-0">
                وظایف، پروژه‌ها و برنامه‌های روزانه‌ات رو در یک فضای
                یکپارچه مدیریت کن. منظم‌تر کار کن، بهتر پیشرفت کن و
                هیچ فرصتی رو از دست نده.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">

                <Link
                  to="/login"
                  className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-violet-500 to-indigo-500 px-7 text-sm font-bold text-white no-underline shadow-[0_10px_35px_rgba(124,58,237,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(124,58,237,0.4)]"
                >
                  شروع رایگان
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </Link>

                <a
                  href="/#features"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-7 text-sm font-semibold text-white/80 no-underline backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-emerald-300/[0.07] hover:text-white"
                >
                  کشف امکانات
                  <ArrowIcon />
                </a>

              </div>

              <p className="mt-5 text-[11px] text-slate-400/50">
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
            </div>

            {/* Visual side */}
            <div className="relative mx-auto w-full max-w-[280px] lg:mx-0">

              <div className="absolute inset-0 scale-90 rounded-full bg-gradient-to-br from-violet-500/20 to-emerald-400/20 blur-[70px]" />

              <div className="relative rounded-[30px] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-2xl">

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/mh-flow-mark.png"
                      alt="MH Flow"
                      width="32"
                      height="32"
                      loading="lazy"
                      decoding="async"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="text-sm font-extrabold tracking-tight text-white">
                      MH Flow
                    </span>
                  </div>

                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">
                    YOUR WORKSPACE
                  </span>
                </div>

                <div className="mb-4 rounded-2xl border border-white/[0.07] bg-[#080d20]/70 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-white/80">
                      مسیر پیشرفت
                    </span>
                    <span className="text-[10px] text-emerald-300">
                      فعال
                    </span>
                  </div>

                  <div className="mb-2 flex items-end justify-between">
                    <span className="text-3xl font-black text-white">۸۵٪</span>
                    <span className="text-[10px] text-white/35">
                      پیشرفت هفتگی
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-l from-emerald-300 to-cyan-400 shadow-[0_0_15px_rgba(52,211,153,0.35)]" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {benefits.map((item, index) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.025] px-3 py-3"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                          index === 0
                            ? 'bg-emerald-400/10 text-emerald-300'
                            : index === 1
                            ? 'bg-violet-400/10 text-violet-300'
                            : 'bg-cyan-400/10 text-cyan-300'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-xs font-medium text-white/65">
                        {item.label}
                      </span>
                      <span className="mr-auto text-emerald-300">✓</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="relative border-t border-white/[0.07] bg-[#07091b]/75 px-5 pb-7 pt-14 backdrop-blur-2xl sm:px-8 sm:pt-16">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">

            {/* Brand */}
            <div className="max-w-sm">

              <Link
                to="/"
                className="mb-5 inline-flex items-center gap-3 text-xl font-black tracking-tight text-white no-underline"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-emerald-400/10 shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                  <img
                    src="/mh-flow-mark.png"
                    alt="MH Flow"
                    width="32"
                    height="32"
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-8 object-contain"
                  />
                </span>
                MH Flow
              </Link>

              <p className="text-xs leading-8 text-slate-300/50 sm:text-sm">
                MH Flow همراه تو برای ساختن یک جریان کاری بهتر؛
                از مدیریت وظایف شخصی تا برنامه‌ریزی پروژه‌ها و
                همکاری تیمی، همه‌چیز در یک فضای منظم.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-lg border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2 text-[10px] text-emerald-200/80">
                  Personal Workspace
                </span>
                <span className="rounded-lg border border-violet-300/15 bg-violet-300/[0.06] px-3 py-2 text-[10px] text-violet-200/80">
                  Team Collaboration
                </span>
              </div>
            </div>

            {/* Link groups */}
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-6 text-sm font-extrabold text-white">
                  {group.title}
                </h3>

                <ul className="space-y-4">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link
                          to={item.to}
                          className="inline-flex items-center gap-2 text-xs text-slate-300/50 no-underline transition-all duration-200 hover:translate-x-[-3px] hover:text-emerald-300"
                        >
                          <span className="h-1 w-1 rounded-full bg-white/20 transition-colors group-hover:bg-emerald-300" />
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-2 text-xs text-slate-300/50 no-underline transition-all duration-200 hover:translate-x-[-3px] hover:text-emerald-300"
                        >
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom section */}
          <div className="mt-14 border-t border-white/[0.07] pt-6">

            <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-right">

              <p className="text-[10px] leading-6 text-slate-400/40 sm:text-xs">
                © {currentYear} MH Flow. تمامی حقوق محفوظ است.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-400/40 sm:gap-6">

                <span className="flex items-center gap-2">
                  ساخته‌شده برای جریان بهتر کارها
                  <span className="text-emerald-300">✦</span>
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                <Link
                  to="/privacy"
                  className="text-slate-400/40 no-underline transition hover:text-white/70"
                >
                  حریم خصوصی
                </Link>

                <Link
                  to="/terms"
                  className="text-slate-400/40 no-underline transition hover:text-white/70"
                >
                  قوانین استفاده
                </Link>

              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
