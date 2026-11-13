import React from 'react';

const platforms = [
  { name: 'Windows', detail: 'نسخه دسکتاپ برای ویندوز', icon: '▣', status: 'به‌زودی', note: 'در حال آماده‌سازی' },
  { name: 'Android', detail: 'اپلیکیشن اندروید', icon: '◈', status: 'به‌زودی', note: 'نسخه موبایل در راه است' },
  { name: 'iPhone & iPad', detail: 'نسخه iOS و iPadOS', icon: '◉', status: 'به‌زودی', note: 'پس از انتشار در دسترس است' },
];

export default function DownloadSection() {
  return (
    <section id="downloads" dir="rtl" className="relative mx-auto max-w-[1200px] overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
      <div className="mx-auto mb-9 max-w-2xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-violet-300/20 bg-violet-300/[.07] px-4 py-2 text-xs text-violet-100">همراه همیشگی شما</span>
        <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl">MH Flow، روی تمام دستگاه‌های شما</h2>
        <p className="text-sm leading-7 text-slate-200/55 sm:text-base">از دسکتاپ تا موبایل؛ تجربه‌ای یکپارچه، روان و هماهنگ با سبک زندگی شما.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {platforms.map((item) => (
          <article key={item.name} className="download-card group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[.045] p-6 text-center backdrop-blur-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-br from-white/15 to-white/[.035] text-3xl shadow-[0_12px_28px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.2)]">{item.icon}</div>
            <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
            <p className="mb-5 text-xs text-slate-200/50">{item.detail}</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[.08] px-4 py-2 text-xs font-semibold text-violet-100"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" />{item.status}</span>
            <p className="mt-3 text-[11px] text-slate-200/35">{item.note}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] text-slate-200/35">لینک دانلود پس از انتشار رسمی هر نسخه در همین بخش فعال می‌شود.</p>
    </section>
  );
}
