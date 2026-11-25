# قرارداد API پیشنهادی MH Flow

Base URL: `/api/v1` — همه endpointهای خصوصی نیازمند session معتبر هستند. ساختار پاسخ یکنواخت پیشنهادی:

```json
{ "success": true, "data": {}, "meta": {} }
```

خطا:

```json
{ "success": false, "error": { "code": "FORBIDDEN", "message": "..." } }
```

## حساب و احراز هویت
| Method | Path | توضیح |
|---|---|---|
| POST | `/auth/register` | ثبت‌نام و تأیید ایمیل/موبایل |
| POST | `/auth/login` | ورود و ایجاد session |
| POST | `/auth/logout` | ابطال session |
| GET | `/auth/me` | کاربر جاری و entitlementها |
| GET | `/auth/sessions` | نشست‌های فعال |
| DELETE | `/auth/sessions/:id` | ابطال نشست |

## پلن و اشتراک
| Method | Path | توضیح |
|---|---|---|
| GET | `/billing/plans` | پلن‌های فعال و قیمت‌ها |
| GET | `/billing/subscription` | اشتراک جاری کاربر |
| POST | `/billing/checkout` | ساخت سفارش و شروع پرداخت |
| GET | `/billing/orders` | تاریخچه سفارش‌های کاربر |
| GET | `/billing/orders/:id` | جزئیات سفارش |
| POST | `/billing/subscription/cancel` | لغو تمدید یا درخواست لغو طبق سیاست |
| POST | `/billing/callback/:provider` | بازگشت درگاه و verify سمت سرور |

## Workspace و تیم
| Method | Path | توضیح |
|---|---|---|
| POST | `/workspaces` | ساخت Workspace با entitlement معتبر |
| GET | `/workspaces` | Workspaceهای کاربر |
| GET | `/workspaces/:workspaceId` | جزئیات با بررسی عضویت |
| PATCH | `/workspaces/:workspaceId` | تنظیمات؛ Owner/Admin مجاز |
| DELETE | `/workspaces/:workspaceId` | حذف طبق سیاست نگهداری؛ Owner |
| GET | `/workspaces/:id/members` | اعضا |
| POST | `/workspaces/:id/invitations` | دعوت عضو |
| POST | `/invitations/:token/accept` | پذیرش دعوت |
| PATCH | `/workspaces/:id/members/:userId` | تغییر نقش |
| DELETE | `/workspaces/:id/members/:userId` | حذف عضو/خروج |

## پروژه و وظیفه تیمی
| Method | Path | توضیح |
|---|---|---|
| GET/POST | `/workspaces/:id/projects` | فهرست/ساخت پروژه |
| PATCH/DELETE | `/projects/:id` | ویرایش/حذف پروژه |
| GET/POST | `/projects/:id/tasks` | فهرست/ساخت وظیفه تیمی |
| PATCH/DELETE | `/team-tasks/:id` | ویرایش/حذف وظیفه |
| POST | `/team-tasks/:id/assignees` | تخصیص عضو |

وظایف شخصی باید API و جدول مستقل داشته باشند. هیچ endpoint تیمی نباید با شناسه قابل حدس، وظیفه شخصی کاربر را برگرداند.

## پیام‌رسانی
| Method | Path | توضیح |
|---|---|---|
| GET/POST | `/workspaces/:id/channels` | فهرست/ساخت کانال |
| GET/POST | `/channels/:id/messages` | دریافت/ارسال پیام با ACL کانال |
| POST | `/messages/:id/replies` | پاسخ رشته‌ای |
| POST | `/messages/:id/reactions` | واکنش |
| GET/POST | `/conversations` | گفتگوهای مستقیم |
| GET | `/conversations/:id/messages` | پیام‌های خصوصی |

Realtime با Socket.IO یا فناوری منتخب، پس از احراز session و بررسی عضویت/ACL در زمان join و هر رویداد اجرا شود. اتصال Socket جایگزین مجوز API نیست.

## قواعد الزامی
- شناسه‌های تصادفی/UUID و مالکیت منبع در سرور بررسی شوند.
- نقش‌ها و entitlementها در هر درخواست خصوصی سمت سرور enforce شوند.
- ورودی‌ها با schema validation بررسی و pagination محدود شود.
- خطاهای داخلی، SQL و stack trace به کاربر ارسال نشوند.
- برای تغییر نقش، دعوت، پرداخت و حذف Workspace audit event ثبت شود.
