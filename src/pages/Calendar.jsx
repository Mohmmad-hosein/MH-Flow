import React from 'react';
import CalendarPanel from '../components/panel/CalendarPanel';

const Calendar = () => (
  <section className="relative min-h-full overflow-hidden p-5 text-slate-50 sm:p-8" dir="rtl">
    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brandPurple/10 blur-[100px]" />
    <div className="relative mx-auto max-w-5xl">
      <header className="mb-7">
        <p className="mb-2 text-xs font-semibold text-brandPurple">MH FLOW / PLANNER</p>
        <h1 className="text-2xl font-bold sm:text-3xl">تقویم و برنامه‌ریزی</h1>
        <p className="mt-2 text-sm leading-7 text-slate-50/50">زمان‌بندی وظایف، ثبت رویدادها و مرور برنامه روزانه در یک نگاه.</p>
      </header>
      <CalendarPanel />
    </div>
  </section>
);

export default Calendar;
