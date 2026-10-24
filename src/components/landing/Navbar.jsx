import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'ویژگی‌ها', href: '/#features' },
  { label: 'قیمت‌ها', href: '/#pricing' },
  { label: 'درباره ما', href: '/about' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] sm:w-[94%] max-w-[1200px] z-50">
      <nav aria-label="منوی اصلی" className="relative rounded-2xl border border-white/15 bg-slate-900/55 px-4 sm:px-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-900/35">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        <div className="flex items-center justify-between gap-3">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-slate-50 no-underline shrink-0">
            <img src="/mh-flow-mark.png" alt="" width="42" height="32" className="w-10 h-8 object-contain shrink-0" decoding="async" fetchPriority="high" />
            <span>MH <span className="text-cyan-300">Flow</span></span>
          </Link>

          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
            {navItems.map(item => (
              <li key={item.href}>
                {item.href.startsWith('/#') ? (
                  <a href={item.href} className="text-slate-100/70 hover:text-white text-sm transition-colors duration-200 no-underline">{item.label}</a>
                ) : (
                  <Link to={item.href} className="text-slate-100/70 hover:text-white text-sm transition-colors duration-200 no-underline">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden sm:flex items-center gap-2.5">
            <Link to="/login" className="px-4 py-2 rounded-xl border border-white/15 bg-white/[.04] text-slate-100/80 text-sm hover:bg-white/10 hover:text-white transition-colors no-underline">ورود</Link>
            <Link to="/login" className="px-5 py-2 rounded-xl bg-gradient-to-br from-brandPurple to-brandViolet text-white text-sm font-semibold shadow-[0_5px_20px_rgba(139,92,246,.22)] hover:brightness-110 transition-all no-underline">شروع رایگان</Link>
          </div>

          <button type="button" aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[.06] text-white transition-colors hover:bg-white/10">
            {menuOpen ? (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            ) : (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out ${menuOpen ? 'max-h-80 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0 pointer-events-none'}`}>
          <div className="rounded-xl border border-white/10 bg-slate-950/65 p-2">
            {navItems.map(item => (
              item.href.startsWith('/#') ? (
                <a key={item.href} href={item.href} onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm text-slate-100/80 hover:bg-white/[.07] hover:text-white no-underline">{item.label}</a>
              ) : (
                <Link key={item.href} to={item.href} onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm text-slate-100/80 hover:bg-white/[.07] hover:text-white no-underline">{item.label}</Link>
              )
            ))}
            <div className="grid grid-cols-2 gap-2 p-1 pt-2">
              <Link to="/login" onClick={closeMenu} className="text-center rounded-lg border border-white/15 px-3 py-2.5 text-sm text-white no-underline">ورود</Link>
              <Link to="/login" onClick={closeMenu} className="text-center rounded-lg bg-gradient-to-br from-brandPurple to-brandViolet px-3 py-2.5 text-sm font-semibold text-white no-underline">شروع رایگان</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
