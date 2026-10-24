import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const NotFound = () => (
  <div dir="rtl" className="min-h-screen overflow-hidden bg-[#07091b] text-white">
    <Navbar />
    <main className="relative flex min-h-[76vh] items-center justify-center px-5 pb-20 pt-36 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="relative z-10 max-w-xl">
        <div className="mb-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">404</div>
        <h1 className="mb-4 text-2xl font-bold sm:text-3xl">این صفحه پیدا نشد</h1>
        <p className="mb-8 text-sm leading-7 text-slate-200/60 sm:text-base">ممکن است آدرس اشتباه باشد یا صفحه جابه‌جا شده باشد. می‌توانید به صفحه‌ی اصلی برگردید و از آنجا ادامه دهید.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 px-6 py-3 font-semibold text-white no-underline transition hover:brightness-110">بازگشت به صفحه اصلی</Link>
          <Link to="/dashboard" className="rounded-xl border border-white/15 bg-white/[.04] px-6 py-3 text-white no-underline transition hover:bg-white/10">رفتن به داشبورد</Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
