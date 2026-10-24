import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'mh-flow-bug-reports-v1';

const BugReport = () => {
  const [form, setForm] = useState({ title: '', category: 'functional', severity: 'normal', description: '', steps: '' });
  const [status, setStatus] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const [savedReports, setSavedReports] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const technicalInfo = useMemo(() => ({
    browser: navigator.userAgent,
    language: navigator.language || 'نامشخص',
    screen: `${window.screen.width}×${window.screen.height}`,
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    page: window.location.pathname,
    reportedAt: new Date().toISOString(),
  }), []);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    if (title.length < 4 || description.length < 10) {
      setStatus('عنوان باید حداقل ۴ و توضیحات حداقل ۱۰ نویسه داشته باشد.');
      return;
    }

    const report = {
      id: `MH-${Date.now().toString(36).toUpperCase()}`,
      ...form,
      title,
      description,
      steps: form.steps.trim(),
      technicalInfo,
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const next = [report, ...(Array.isArray(existing) ? existing : [])].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedReports(next);
      setForm({ title: '', category: 'functional', severity: 'normal', description: '', steps: '' });
      setStatus(`گزارش ${report.id} روی همین مرورگر ذخیره شد.`);
      setShowSaved(true);
    } catch {
      setStatus('ذخیره‌سازی مرورگر در دسترس نیست. فضای ذخیره‌سازی را بررسی کنید یا بعداً دوباره تلاش کنید.');
    }
  };

  const clearReports = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedReports([]);
      setStatus('گزارش‌های ذخیره‌شده از این مرورگر پاک شدند.');
      setShowSaved(false);
    } catch {
      setStatus('پاک‌کردن گزارش‌ها ممکن نشد.');
    }
  };

  const inputClass = 'w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60';
  const labelClass = 'mb-2 block text-sm font-medium text-slate-200/80';

  return (
    <div dir="rtl" className="min-h-screen overflow-hidden bg-[#07091b] text-white">
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3 font-bold no-underline">
          <img src="/mh-flow-mark.png" alt="نشان MH Flow" className="h-9 w-9 object-contain" />
          <span>MH Flow</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-200/70">
          <Link to="/privacy" className="transition hover:text-white">حریم خصوصی</Link>
          <Link to="/" className="transition hover:text-white">صفحه اصلی</Link>
        </nav>
      </header>

      <main className="relative mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8">
        <div className="pointer-events-none absolute right-1/4 top-10 -z-0 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="relative z-10 mb-8">
          <span className="mb-4 inline-flex rounded-full border border-violet-300/20 bg-violet-300/[.07] px-4 py-2 text-xs text-violet-100">بازخورد و بهبود محصول</span>
          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">گزارش باگ در MH Flow</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-200/60 sm:text-base">
            مشکلی پیدا کرده‌اید؟ جزئیات را بنویسید تا بتوانیم آن را بررسی کنیم. در نسخه فعلی، گزارش فقط در حافظه همین مرورگر ذخیره می‌شود و به تیمی ارسال نمی‌شود.
          </p>
        </div>

        <form onSubmit={submit} className="relative z-10 space-y-6 rounded-3xl border border-white/10 bg-white/[.045] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div>
            <label htmlFor="bug-title" className={labelClass}>عنوان مشکل *</label>
            <input id="bug-title" name="title" value={form.title} onChange={update} maxLength={100} required minLength={4} placeholder="مثلاً: وظیفه جدید ذخیره نمی‌شود" className={inputClass} />
            <p className="mt-1 text-left text-xs text-slate-200/35">{form.title.length}/100</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bug-category" className={labelClass}>دسته‌بندی</label>
              <select id="bug-category" name="category" value={form.category} onChange={update} className={inputClass}>
                <option value="functional">عملکرد یا قابلیت</option>
                <option value="visual">ظاهر و طراحی</option>
                <option value="responsive">نمایش در موبایل یا تبلت</option>
                <option value="performance">سرعت و عملکرد</option>
                <option value="accessibility">دسترسی‌پذیری</option>
                <option value="other">سایر موارد</option>
              </select>
            </div>
            <div>
              <label htmlFor="bug-severity" className={labelClass}>شدت مشکل</label>
              <select id="bug-severity" name="severity" value={form.severity} onChange={update} className={inputClass}>
                <option value="low">کم — مشکل جزئی</option>
                <option value="normal">متوسط — بخشی از کار مختل شده</option>
                <option value="high">زیاد — قابلیت مهم از کار افتاده</option>
                <option value="critical">بحرانی — برنامه قابل استفاده نیست</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="bug-description" className={labelClass}>شرح مشکل *</label>
            <textarea id="bug-description" name="description" value={form.description} onChange={update} required minLength={10} maxLength={3000} rows={5} placeholder="چه اتفاقی افتاد و انتظار داشتید چه اتفاقی بیفتد؟" className={inputClass + ' resize-y'} />
            <p className="mt-1 text-left text-xs text-slate-200/35">{form.description.length}/3000</p>
          </div>

          <div>
            <label htmlFor="bug-steps" className={labelClass}>مراحل بازتولید مشکل (اختیاری)</label>
            <textarea id="bug-steps" name="steps" value={form.steps} onChange={update} maxLength={2000} rows={3} placeholder={'۱. وارد داشبورد شوید\n۲. روی «وظایف» کلیک کنید\n۳. مشکل را مشاهده کنید'} className={inputClass + ' resize-y'} />
          </div>

          <div className="rounded-2xl border border-cyan-200/10 bg-cyan-200/[.035] p-4">
            <h2 className="mb-2 text-sm font-bold text-cyan-100">اطلاعات فنی همراه گزارش</h2>
            <p className="mb-3 text-xs leading-6 text-slate-200/55">این اطلاعات هنگام ثبت، در مرورگر شما ذخیره می‌شوند. در این نسخه چیزی به سرور ارسال نمی‌شود.</p>
            <div className="grid gap-2 text-xs text-slate-200/60 sm:grid-cols-2">
              <p>زبان مرورگر: {technicalInfo.language}</p>
              <p>اندازه صفحه: {technicalInfo.viewport}</p>
              <p>اندازه نمایشگر: {technicalInfo.screen}</p>
              <p>مسیر صفحه: {technicalInfo.page}</p>
            </div>
          </div>

          <label className="flex items-start gap-3 text-xs leading-6 text-slate-200/60">
            <input type="checkbox" required className="mt-1 accent-violet-400" />
            می‌دانم که این گزارش فقط در حافظه محلی همین مرورگر ذخیره می‌شود و فعلاً برای پشتیبانی ارسال نمی‌شود.
          </label>

          <button type="submit" className="w-full rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 px-6 py-3.5 font-bold text-white transition hover:brightness-110">ذخیره گزارش در این مرورگر</button>
          {status && <p role="status" aria-live="polite" className="rounded-xl border border-white/10 bg-white/[.04] p-3 text-sm leading-6 text-slate-100/80">{status}</p>}
        </form>

        <section className="relative z-10 mt-8 rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">گزارش‌های ذخیره‌شده روی این دستگاه</h2>
              <p className="mt-1 text-xs text-slate-200/45">تعداد گزارش‌ها: {savedReports.length} از ۲۰</p>
            </div>
            {savedReports.length > 0 && <button type="button" onClick={clearReports} className="rounded-lg border border-rose-300/20 px-3 py-2 text-xs text-rose-200 transition hover:bg-rose-300/10">پاک‌کردن گزارش‌ها</button>}
          </div>
          {!savedReports.length ? <p className="text-sm text-slate-200/50">هنوز گزارشی در این مرورگر ذخیره نشده است.</p> : (
            <div className="space-y-3">
              {savedReports.map((report) => (
                <article key={report.id} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold">{report.title}</h3>
                    <span className="text-xs text-violet-200">{report.id}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200/65">{report.description}</p>
                  <p className="mt-2 text-xs text-slate-200/35">{new Date(report.technicalInfo.reportedAt).toLocaleString('fa-IR')}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BugReport;
