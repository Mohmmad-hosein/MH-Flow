import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const About = () => (
  <div dir="rtl" className="min-h-screen overflow-hidden bg-[#07091b] text-white">
    <Navbar />
    <main className="relative mx-auto flex min-h-[75vh] max-w-5xl items-center px-5 pb-20 pt-36 sm:px-8">
      <div className="pointer-events-none absolute right-1/4 top-28 -z-0 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-4 py-2 text-xs text-cyan-100">درباره MH Flow</span>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl">برای جریان بهتر کارها ساخته شده</h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-slate-200/65 sm:text-lg">
          MH Flow با یک ایده‌ی ساده شکل گرفته است: برنامه‌ریزی باید به شما کمک کند روی کارهای مهم تمرکز کنید، نه اینکه خودش به یک کار اضافه تبدیل شود. هدف ما ساخت تجربه‌ای یکپارچه برای سامان‌دهی وظایف، پیگیری هدف‌ها و دیدن مسیر پیشرفت است.
        </p>
        <div className="grid gap-4 text-right sm:grid-cols-3">
          {[
            ['شفافیت', 'بدانید چه کاری مهم‌تر است و قدم بعدی چیست.'],
            ['تمرکز', 'اطلاعات ضروری را در فضایی مرتب و ساده کنار هم داشته باشید.'],
            ['پیشرفت', 'کارهای کوچک را به حرکت پیوسته به سمت هدف تبدیل کنید.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
              <h2 className="mb-2 font-semibold text-white">{title}</h2>
              <p className="text-sm leading-7 text-slate-200/60">{description}</p>
            </article>
          ))}
        </div>
        <Link to="/login" className="mt-9 inline-flex rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 px-6 py-3 font-semibold text-white no-underline transition hover:brightness-110">شروع با MH Flow</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
