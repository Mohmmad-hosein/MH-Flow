import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  ['اطلاعات حساب و محتوای کاربر', 'برای ورود و ارائه سرویس، ایمیل، نام نمایشی و هش رمز عبور در پایگاه داده نگهداری می‌شوند. وظایف شخصی، پروژه‌ها، رویدادهای تقویم، تنظیمات، اعلان‌ها و گزارش‌های ارسالی نیز به حساب کاربر متصل هستند. وظایف شخصی از وظایف فضای کاری تیمی جدا نگهداری می‌شوند.'],
  ['نشست‌ها، دستگاه و نشانی IP', 'هنگام ورود، شناسه نشست به‌صورت هش‌شده، برچسب دستگاه، User-Agent، نشانی IP و زمان ورود ثبت می‌شود. آخرین فعالیت، زمان خروج و رویدادهای امنیتی نیز برای مدیریت نشست‌ها و بررسی فعالیت غیرعادی نگهداری می‌شوند. این اطلاعات در بخش امنیت حساب برای صاحب حساب نمایش داده می‌شوند.'],
  ['کوکی و ذخیره‌سازی مرورگر', 'احراز هویت با کوکی نشست HttpOnly و SameSite=Lax انجام می‌شود؛ در محیط Production باید ویژگی Secure نیز فعال باشد. توکن CSRF برای درخواست‌های تغییردهنده استفاده می‌شود. فهرست حساب‌های ذخیره‌شده در مرورگر فقط ایمیل و نام نمایشی را نگه می‌دارد و رمز عبور در آن ذخیره نمی‌شود. تنظیمات محلی انیمیشن نیز برای اعمال سریع‌تر رابط کاربری در مرورگر نگهداری می‌شود. فونت Vazirmatn از Google Fonts بارگذاری می‌شود و در زمان درخواست فونت، مرورگر با دامنه‌های Google Fonts ارتباط برقرار می‌کند.'],
  ['فضای کاری، پیام‌ها و فایل‌ها', 'پیام‌های کانال‌های تیمی و گفتگوهای خصوصی در پایگاه داده ثبت می‌شوند. فایل‌های مجاز پیام‌رسانی در فضای ذخیره‌سازی خصوصی سمت سرور قرار می‌گیرند، عمومی نیستند و دانلود آن‌ها با بررسی عضویت یا دسترسی گفتگو کنترل می‌شود. در نسخه فعلی فرانت‌اند، گفتگوها با درخواست‌های دوره‌ای تازه‌سازی می‌شوند و اتصال بلادرنگ WebSocket فعال نیست.'],
  ['محدودیت درخواست و وضعیت حساب', 'برای کاهش سوءاستفاده، تعداد درخواست‌ها در بازه زمانی محدود می‌شود. عبور حساب واردشده از آستانه فعلی API می‌تواند موجب تعلیق خودکار موقت پنج‌دقیقه‌ای و ثبت رویداد امنیتی شود. حساب‌های تعلیق‌شده یا مسدودشده اجازه استفاده از APIهای محافظت‌شده را ندارند تا وضعیت آن‌ها رفع شود.'],
  ['گزارش خطا و اطلاعات فنی', 'گزارش باگ همراه متن ارسالی و برخی اطلاعات فنی مانند مسیر صفحه، زبان مرورگر و اندازه نمای صفحه به سرور ارسال می‌شود. اطلاعات حساس مانند رمز عبور، کد ورود یا اطلاعات کارت بانکی را داخل گزارش وارد نکنید.'],
  ['پرداخت و اشتراک', 'پلن‌ها و مبالغ از API پلن‌ها خوانده می‌شوند. تا زمان انتخاب و پیکربندی درگاه بانکی، درخواست خرید صرفاً یک تراکنش با وضعیت ایجادشده ثبت می‌کند و به معنی پرداخت موفق یا فعال‌شدن اشتراک نیست.'],
  ['نگهداری، حذف و درخواست‌های حریم خصوصی', 'سوابق نشست و رویدادهای امنیتی برای امنیت حساب نگهداری می‌شوند. ابزار کامل حذف حساب و سیاست زمان‌بندی حذف خودکار همه داده‌ها در این نسخه ارائه نشده است؛ برای انتشار عمومی باید فرآیند درخواست دسترسی، اصلاح و حذف داده‌ها و دوره نگهداری به‌صورت شفاف تکمیل شود.'],
  ['امنیت و دامنه تضمین', 'کنترل دسترسی سمت سرور، نشست‌های مبتنی بر PostgreSQL، محافظت CSRF، اعتبارسنجی ورودی، محدودیت نرخ درخواست، بررسی نوع و امضای فایل و کنترل دسترسی دانلود در کد موجود هستند. این کنترل‌ها کاهش‌دهنده ریسک‌اند و تضمین نفوذناپذیری نیستند؛ پیکربندی Production، HTTPS، پشتیبان‌گیری و آزمون نفوذ مستقل همچنان ضروری است.'],
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
        <p className="text-sm text-slate-200/50">وضعیت معماری نسخه متصل به بک‌اند MH Flow — بازبینی: نوامبر ۲۰۲۶</p>
      </div>

      <div className="relative z-10 mb-6 rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-5">
        <h2 className="mb-2 font-bold text-amber-100">نکته مهم</h2>
        <p className="text-sm leading-7 text-slate-200/70">این صفحه شرح فنی قابلیت‌های موجود در کد فعلی است. جزئیات واقعی نگهداری داده، دسترسی مدیران، دوره حذف و الزامات قانونی باید پیش از انتشار عمومی با زیرساخت Production تطبیق داده شوند.</p>
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
