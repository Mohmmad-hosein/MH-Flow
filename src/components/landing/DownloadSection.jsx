import React from 'react';
import { m, useReducedMotion } from 'framer-motion';

const AppleIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current"><path d="M16.7 12.8c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.9-.7s1.8.7 3 .7c1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.5-.1 0-2-.8-2-3.7ZM14.5 6.4c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2.1-.5 2.7-1.3Z"/></svg>;
const WindowsIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current"><path d="M2 4.2 10.8 3v8.2H2V4.2Zm10.2-1.4L22 1.4v9.8h-9.8V2.8ZM2 12.4h8.8v8.2L2 19.4v-7Zm10.2 0H22v9.8l-9.8-1.4v-8.4Z"/></svg>;
const AndroidIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current"><path d="M7.1 3.6 5.8 1.4a.5.5 0 0 1 .9-.5L8 3.1a10 10 0 0 1 8 0l1.3-2.2a.5.5 0 1 1 .9.5l-1.3 2.2A8.2 8.2 0 0 1 21 10H3a8.2 8.2 0 0 1 4.1-6.4ZM6 11h12v8a2 2 0 0 1-2 2h-1v2a1 1 0 0 1-2 0v-2h-2v2a1 1 0 0 1-2 0v-2H8a2 2 0 0 1-2-2v-8Zm-3 0h2v7H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Zm16 0h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v-7Z"/></svg>;

const platforms = [
  { name: 'Windows', detail: 'نسخه دسکتاپ برای ویندوز', Icon: WindowsIcon, note: 'نسخه دسکتاپ در حال آماده‌سازی است' },
  { name: 'Android', detail: 'اپلیکیشن اندروید', Icon: AndroidIcon, note: 'نسخه اندروید در حال آماده‌سازی است' },
  { name: 'iPhone & iPad', detail: 'نسخه iOS و iPadOS', Icon: AppleIcon, note: 'نسخه iOS پس از انتشار رسمی فعال می‌شود' },
];

export default function DownloadSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="downloads" dir="rtl" className="relative mx-auto max-w-[1200px] overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
      <div className="mx-auto mb-9 max-w-2xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-violet-300/20 bg-violet-300/[.07] px-4 py-2 text-xs text-violet-100">همراه همیشگی شما</span>
        <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl">MH Flow، روی تمام دستگاه‌های شما</h2>
        <p className="text-sm leading-7 text-slate-200/55 sm:text-base">تجربه‌ای یکپارچه و هماهنگ؛ نسخه‌های رسمی به‌محض انتشار از همین بخش در دسترس خواهند بود.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {platforms.map(({ name, detail, Icon, note }) => (
          <m.article key={name} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: reduceMotion ? 0 : platforms.findIndex((item) => item.name === name) * 0.09 }} className="download-card group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[.045] p-6 text-center backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/30">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-br from-white/15 to-white/[.035] text-slate-100 shadow-[0_12px_28px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.2)]"><Icon /></div>
            <h3 className="mb-1 text-lg font-bold">{name}</h3>
            <p className="mb-5 text-xs text-slate-200/50">{detail}</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/[.07] px-4 py-2 text-xs font-semibold text-amber-100"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />به‌زودی</span>
            <p className="mt-3 text-[11px] text-slate-200/35">{note}</p>
          </m.article>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] text-slate-200/35">تا زمان انتشار رسمی، لینک دانلود غیرفعال است.</p>
    </section>
  );
}
