import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  ['وضعیت فعلی سرویس', 'MH Flow در نسخه فعلی یک نمونه فرانت‌اند است. ورود و ثبت‌نام نمایشی است و حساب کاربری واقعی یا سامانه سمت سرور برای پردازش گزارش‌ها در این نسخه پیاده‌سازی نشده است.'],
  ['اطلاعاتی که در این نسخه ذخیره می‌شود', 'اگر از فرم گزارش باگ استفاده کنید، متن گزارش و اطلاعات فنی محدود مانند زبان مرورگر، ابعاد صفحه و مسیر فعلی، در حافظه محلی (localStorage) همین مرورگر ذخیره می‌شوند. این داده‌ها به سرور ارسال نمی‌شوند.'],
  ['کوکی‌ها و ابزارهای تحلیل', 'در کد این نسخه، سامانه رضایت کوکی، سرویس تبلیغاتی یا ابزار تحلیل‌گر شخص ثالث به‌عنوان بخشی از این پیاده‌سازی اضافه نشده است. localStorage با کوکی یکسان نیست، اما همچنان نوعی ذخیره‌سازی روی دستگاه شماست. این توضیح باید پس از افزودن کتابخانه‌ها یا سرویس‌های جدید دوباره بررسی شود.'],
  ['اطلاعات حساس', 'در گزارش باگ، رمز عبور، کد ورود، اطلاعات بانکی یا اطلاعات خصوصی دیگر را وارد نکنید. گزارش‌های ذخیره‌شده در مرورگر برای هر کسی که به همان پروفایل مرورگر و دستگاه دسترسی دارد ممکن است قابل دسترس باشند.'],
  ['مدیریت و حذف داده‌ها', 'می‌توانید گزارش‌های ذخیره‌شده را از بخش گزارش باگ پاک کنید یا داده‌های سایت را از تنظیمات مرورگر حذف کنید. حذف داده‌های سایت ممکن است اطلاعات محلی دیگر این نمونه را نیز پاک کند.'],
  ['امنیت و محدودیت‌ها', 'ذخیره‌سازی محلی برای نمونه‌سازی و آزمایش مناسب است، اما جایگزین ذخیره‌سازی امن سمت سرور نیست. ورود نمایشی، احراز هویت یا حفاظت واقعی از حساب‌ها را فراهم نمی‌کند. قبل از انتشار عمومی، باید بک‌اند، کنترل دسترسی، اعتبارسنجی سمت سرور و سیاست‌های نگهداری داده طراحی و آزمایش شوند.'],
  ['به‌روزرسانی این متن', 'این صفحه توضیح وضعیت فنی نسخه فعلی است و به‌تنهایی تضمین حقوقی یا جایگزین بررسی الزامات قانونی محل فعالیت شما نیست. با اضافه شدن حساب‌های واقعی، تحلیل‌گرها، کوکی‌ها یا سرویس‌های ثالث، باید این متن و رفتار محصول به‌روزرسانی شوند.'],
];

const Privacy = () => (
  <div dir="rtl" className="min-h-screen overflow-hidden bg-[#07091b] text-white">
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <Link to="/" className="flex items-center gap-3 font-bold no-underline">
        <img src="/mh-flow-mark.png" alt="نشان MH Flow" className="h-9 w-9 object-contain" />
        <span>MH Flow</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm text-slate-200/70">
        <Link to="/report-bug" className="transition hover:text-white">گزارش باگ</Link>
        <Link to="/" className="transition hover:text-white">صفحه اصلی</Link>
      </nav>
    </header>

    <main className="relative mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8">
      <div className="pointer-events-none absolute left-1/4 top-12 -z-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative z-10 mb-8">
        <span className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-4 py-2 text-xs text-cyan-100">شفافیت و کنترل داده‌ها</span>
        <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">حریم خصوصی و داده‌ها</h1>
        <p className="text-sm text-slate-200/50">وضعیت فعلی نسخه فرانت‌اند MH Flow — آخرین بازبینی: ۲۲ اکتبر ۲۰۲۶</p>
      </div>

      <div className="relative z-10 mb-6 rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-5">
        <h2 className="mb-2 font-bold text-amber-100">نکته مهم</h2>
        <p className="text-sm leading-7 text-slate-200/70">این متن بر اساس قابلیت‌هایی نوشته شده که در نسخه فعلی پیاده‌سازی می‌شوند. پیش از انتشار عمومی و جمع‌آوری اطلاعات کاربران، باید با رفتار واقعی برنامه، سرویس‌های مستقرشده و الزامات قانونی مربوط تطبیق داده شود.</p>
      </div>

      <div className="relative z-10 space-y-4">
        {sections.map(([title, description], index) => (
          <section key={title} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] sm:p-6">
            <h2 className="mb-3 flex items-center gap-3 text-lg font-bold">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[.08] text-sm text-violet-100">{index + 1}</span>
              {title}
            </h2>
            <p className="text-sm leading-8 text-slate-200/65">{description}</p>
          </section>
        ))}
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap gap-3">
        <Link to="/report-bug" className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white no-underline transition hover:brightness-110">رفتن به گزارش باگ</Link>
        <Link to="/" className="rounded-xl border border-white/15 bg-white/[.04] px-5 py-3 text-sm text-white no-underline transition hover:bg-white/10">بازگشت به صفحه اصلی</Link>
      </div>
    </main>
  </div>
);

export default Privacy;
