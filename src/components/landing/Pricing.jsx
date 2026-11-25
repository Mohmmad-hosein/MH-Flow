
import React, { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

const plans = [
  { id:'free', name:'Free', subtitle:'برای شروع و استفاده شخصی', monthly:0, yearly:0, description:'رایگان و بدون تعهد', popular:false, features:[{text:'مدیریت وظایف شخصی',included:true},{text:'تقویم و برنامه‌ریزی',included:true},{text:'پروژه‌های پایه',included:true},{text:'همکاری تیمی',included:false}],button:'شروع رایگان',buttonStyle:'secondary' },
  { id:'pro', name:'Pro', subtitle:'برای برنامه‌ریزی حرفه‌ای و رشد فردی', monthly:200000, yearly:2000000, description:'برای کاربران حرفه‌ای',popular:true,features:[{text:'تمام امکانات Free',included:true},{text:'پروژه‌ها و تحلیل پیشرفته',included:true},{text:'تنظیمات و گزارش‌های حرفه‌ای',included:true},{text:'فضای کاری Team',included:false}],button:'انتخاب Pro',buttonStyle:'primary' },
  { id:'team', name:'Team', subtitle:'برای تیم‌ها و همکاری مشترک',monthly:380000,yearly:3800000,description:'قیمت هر ماه اشتراک تیم',popular:false,features:[{text:'تمام امکانات Pro',included:true},{text:'فضای کاری مشترک و اعضا',included:true},{text:'وظایف و کانال‌های تیمی',included:true},{text:'پیام خصوصی و پیوست فایل',included:true}],button:'انتخاب Team',buttonStyle:'secondary' },
];

const CheckIcon = ({ included }) => (
  <span
    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
      included
        ? 'bg-emerald-400/10 text-emerald-400'
        : 'bg-white/[0.04] text-slate-600'
    }`}
  >
    {included ? '✓' : '–'}
  </span>
);

const PricingCard = ({ plan, yearly }) => {
  const price = yearly ? plan.yearly : plan.monthly;
  const isFree = plan.id === 'free';

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
        plan.popular
          ? 'border-violet-400/50 bg-gradient-to-b from-violet-500/[0.16] via-[#151139]/95 to-[#0d0b29]/95 shadow-[0_0_45px_rgba(139,92,246,0.13)]'
          : 'border-white/[0.09] bg-[#11102f]/65 hover:border-white/20 hover:bg-[#151339]/80'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-violet-300/30 bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-1.5 text-[10px] font-bold text-white shadow-lg shadow-violet-900/30">
          ✦ محبوب‌ترین انتخاب
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3
            className={`text-xl font-extrabold ${
              plan.popular
                ? 'bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent'
                : 'text-white'
            }`}
          >
            {plan.name}
          </h3>

          {plan.id === 'team' && (
            <span className="rounded-lg border border-sky-400/20 bg-sky-400/[0.08] px-2.5 py-1 text-[9px] text-sky-300">
              TEAM
            </span>
          )}
        </div>

        <p className="min-h-[40px] text-xs leading-6 text-slate-400">
          {plan.subtitle}
        </p>
      </div>

      {/* Price */}
      <div className="mb-2">
        {isFree ? (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">۰</span>
            <span className="text-sm text-slate-400">تومان</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-white">
              {new Intl.NumberFormat('fa-IR').format(price)}
            </span>
            <span className="text-xs text-slate-400">
              تومان / {yearly ? 'سال' : 'ماه'}
            </span>
          </div>
        )}
      </div>

      <p className="mb-6 text-[10px] text-slate-500">
        {isFree
          ? plan.description
          : yearly
            ? 'پرداخت یک‌جای سالانه' 
            : plan.description}
      </p>

      {/* CTA */}
      <Link
        to="/login"
        className={`mb-7 block w-full rounded-xl py-3.5 text-center text-xs font-bold no-underline transition-all duration-300 ${
          plan.buttonStyle === 'primary'
            ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg shadow-violet-900/30 hover:shadow-violet-500/30 hover:brightness-110'
            : 'border border-white/10 bg-white/[0.035] text-slate-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white'
        }`}
      >
        {plan.button}
        {plan.popular && <span className="mr-2">✦</span>}
      </Link>

      {/* Divider */}
      <div className="mb-5 border-t border-white/[0.07]" />

      {/* Features */}
      <div className="mb-2 text-[10px] font-bold text-slate-300">
        امکانات این پلن
      </div>

      <ul className="flex-1 space-y-3.5">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center gap-2.5 text-xs ${
              feature.included ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <CheckIcon included={feature.included} />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

const Pricing = () => {
  const reduceMotion = useReducedMotion();
  const [yearly, setYearly] = useState(false);
  const [livePlans, setLivePlans] = useState(plans);
  useEffect(() => {
    let active = true;
    api('/billing/plans').then(({ plans: rows = [] }) => {
      if (!active || !rows.length) return;
      setLivePlans(current => current.map(plan => {
        const remote = rows.find(row => row.code === plan.id);
        return remote ? { ...plan, monthly: Number(remote.price_monthly_toman), yearly: Number(remote.price_yearly_toman), description: plan.id === 'team' ? 'قیمت اشتراک Team' : plan.description } : plan;
      }));
    }).catch(() => { /* Keep the confirmed local price table when the API is unavailable. */ });
    return () => { active = false; };
  }, []);

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      id="pricing"
      dir="rtl"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[140px]" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-4 py-2 text-[11px] font-medium text-violet-300">
            <span>✦</span>
            پلن‌ها و قیمت‌گذاری
          </div>

          <h2 className="text-3xl font-extrabold leading-relaxed text-white sm:text-4xl">
            پلن مناسب مسیر رشدت رو انتخاب کن
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
            از مدیریت ساده وظایف تا برنامه‌ریزی حرفه‌ای و همکاری تیمی؛
            MH Flow همراه مسیر پیشرفت شماست.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-[#11102f]/80 p-1.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-xl px-5 py-2.5 text-xs font-semibold transition-all ${
                !yearly
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              پرداخت ماهانه
            </button>

            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all ${
                yearly
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              پرداخت سالانه
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] text-emerald-300">
                ۲ ماه رایگان
              </span>
            </button>
          </div>

          <p className="text-[10px] text-slate-500">
            هزینه سالانه معادل ۱۰ ماه اشتراک ماهانه محاسبه شده است.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {livePlans.map((plan) => (
            <m.div key={plan.id} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.58, delay: reduceMotion ? 0 : livePlans.indexOf(plan) * 0.1 }}>
              <PricingCard plan={plan} yearly={yearly} />
            </m.div>
          ))}
        </div>

        {/* Trust / Note */}
        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-right">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              ✓
            </span>
            <div>
              <div className="text-xs font-bold text-slate-200">شروع رایگان</div>
              <div className="mt-1 text-[10px] text-slate-500">بدون نیاز به خرید اشتراک</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-center sm:justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              ✦
            </span>
            <div>
              <div className="text-xs font-bold text-slate-200">ارتقای پلن</div>
              <div className="mt-1 text-[10px] text-slate-500">امکان توسعه امکانات حساب</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-center sm:justify-end">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
              ◈
            </span>
            <div>
              <div className="text-xs font-bold text-slate-200">مناسب تیم‌ها</div>
              <div className="mt-1 text-[10px] text-slate-500">برای همکاری و مدیریت مشترک</div>
            </div>
          </div>
        </div>

        {/* Pricing Note */}
        <p className="mt-6 text-center text-[10px] leading-6 text-slate-500">مبالغ به تومان هستند. پرداخت و فعال‌سازی اشتراک پس از اتصال درگاه بانکی انجام می‌شود.</p>

      </div>
    </section>
  );
};

export default Pricing;
