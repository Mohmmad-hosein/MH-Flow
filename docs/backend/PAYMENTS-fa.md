# طراحی پرداخت داخلی MH Flow

## وضعیت تصمیم
- روش: پرداخت آنلاین داخلی ایران
- واحد قیمت‌گذاری محصول: تومان
- Provider: انتخاب نشده؛ مقدار پیکربندی فعلی `unconfigured`
- قیمت پلن‌های Pro و Team: هنوز تعیین نشده
- خرید از UI تا زمان تکمیل موارد بالا غیرفعال می‌ماند.

## قرارداد Provider مستقل از درگاه
سرور باید یک interface داشته باشد و هر درگاه فقط adapter همین interface باشد:

```ts
interface PaymentProvider {
  createPayment(input: {
    orderId: string;
    amountRial: bigint;
    callbackUrl: string;
    description: string;
    customer?: { email?: string; mobile?: string };
  }): Promise<{ authority: string; redirectUrl: string; raw?: unknown }>;

  verifyPayment(input: {
    authority: string;
    expectedAmountRial: bigint;
  }): Promise<{
    success: boolean;
    providerReference?: string;
    paidAmountRial?: bigint;
    raw?: unknown;
  }>;
}
```

در قرارداد داخلی، نام فیلدها و واحدها باید صریح باشند. اگر قیمت در UI تومان است، قبل از ارسال به API به عدد صحیح ریال تبدیل شود؛ هیچ تبدیل ضمنی در چند لایه انجام نشود. برای مبلغ‌های ریالی از integer/NUMERIC استفاده شود، نه float.

## چرخه سفارش
1. کاربر پلن و دوره را انتخاب می‌کند.
2. `POST /api/v1/billing/checkout` با `planCode` و `billingPeriod` ارسال می‌شود.
3. سرور قیمت فعال پلن را از دیتابیس می‌خواند، entitlement و تخفیف را محاسبه و یک order با snapshot قیمت ایجاد می‌کند.
4. adapter درگاه درخواست پرداخت می‌سازد و authority/redirect URL را برمی‌گرداند.
5. کاربر به درگاه هدایت می‌شود.
6. callback فقط یک trigger برای verify است؛ query string callback قابل اعتماد نیست.
7. سرور مبلغ و authority را با درگاه استعلام می‌کند.
8. در یک transaction دیتابیس: payment موفق ثبت، order پرداخت‌شده می‌شود و subscription فعال/تمدید می‌شود.
9. callback تکراری نتیجه قبلی را برمی‌گرداند؛ تمدید دوباره انجام نمی‌شود.

## وضعیت‌های پیشنهادی
- Order: `pending`, `paid`, `failed`, `cancelled`, `expired`, `refunded`
- Payment: `initiated`, `redirected`, `succeeded`, `failed`, `verification_failed`, `refunded`
- Subscription: `trialing`, `active`, `past_due`, `cancel_at_period_end`, `expired`, `cancelled`

## امنیت و عملیات
- verify سمت سرور اجباری است.
- amount مورد انتظار از order خوانده می‌شود، نه callback.
- روی `(provider, provider_reference)` قید unique اعمال شود.
- callback باید CSRF/session expectations مناسب داشته باشد؛ مسیر بازگشت از درگاه نباید به‌تنهایی مجوز تغییر حساب باشد.
- idempotency key برای checkout و callback در نظر گرفته شود.
- درخواست‌های پرداخت rate limit شوند و همه تغییرات در audit log ثبت شوند.
- logها نباید token، secret، شماره کارت یا داده حساس پرداخت را ثبت کنند.
- لغو، بازپرداخت و dispute باید عملیات مجزا با ثبت دلیل و عامل باشند.

## متغیرهای محیطی (نام‌های نمونه)
```env
PAYMENT_PROVIDER=unconfigured
PAYMENT_CALLBACK_URL=https://example.com/api/v1/billing/callback
PAYMENT_MERCHANT_ID=
PAYMENT_SECRET=
```

این مقادیر نمونه‌اند. پس از انتخاب ارائه‌دهنده، نام‌ها و روش امضا/استعلام باید مطابق مستندات رسمی همان درگاه تنظیم شوند. کلیدها فقط سمت سرور هستند.
