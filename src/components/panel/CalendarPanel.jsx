
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PanelIcon from './PanelIcon';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';

const numberFa = new Intl.NumberFormat('fa-IR');

const weekdays = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
];

const jalaliMonths = [
  'فروردین', 'اردیبهشت', 'خرداد',
  'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر',
  'دی', 'بهمن', 'اسفند',
];

const categories = {
  general: {
    label: 'عمومی',
    color: 'bg-slate-400',
    text: 'text-slate-300',
    soft: 'bg-slate-400/10',
    border: 'border-slate-400/20',
  },
  work: {
    label: 'کاری',
    color: 'bg-violet-400',
    text: 'text-violet-300',
    soft: 'bg-violet-400/10',
    border: 'border-violet-400/20',
  },
  personal: {
    label: 'شخصی',
    color: 'bg-emerald-400',
    text: 'text-emerald-300',
    soft: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  study: {
    label: 'مطالعه',
    color: 'bg-cyan-400',
    text: 'text-cyan-300',
    soft: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
  meeting: {
    label: 'جلسه',
    color: 'bg-amber-400',
    text: 'text-amber-300',
    soft: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
};


/* -------------------------------------------------------
   Persian / Jalali date utilities
   ------------------------------------------------------- */

const div = (a, b) => Math.floor(a / b);
const mod = (a, b) => a - Math.floor(a / b) * b;

const gregorianToJalali = (gy, gm, gd) => {
  let jy;

  if (gy > 1600) {
    jy = 979;
    gy -= 1600;
  } else {
    jy = 0;
    gy -= 621;
  }

  const gdm = [
    0, 31, 59, 90, 120, 151,
    181, 212, 243, 273, 304, 334,
  ];

  const gy2 = gm > 2 ? gy + 1 : gy;

  let days =
    365 * gy +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400) -
    80 +
    gd +
    gdm[gm - 1];

  jy += 33 * div(days, 12053);
  days %= 12053;

  jy += 4 * div(days, 1461);
  days %= 1461;

  if (days > 365) {
    jy += div(days - 1, 365);
    days = mod(days - 1, 365);
  }

  let jm;
  let jd;

  if (days < 186) {
    jm = 1 + div(days, 31);
    jd = 1 + mod(days, 31);
  } else {
    jm = 7 + div(days - 186, 30);
    jd = 1 + mod(days - 186, 30);
  }

  return { year: jy, month: jm, day: jd };
};

const jalaliToGregorian = (jy, jm, jd) => {
  jy += 1595;

  let days =
    -355668 +
    365 * jy +
    div(jy, 33) * 8 +
    div(mod(jy, 33) + 3, 4) +
    jd +
    (jm < 7
      ? (jm - 1) * 31
      : (jm - 7) * 30 + 186);

  let gy = 400 * div(days, 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * div(days - 1, 36524);
    days %= 36524;

    if (days >= 365) days += 1;
  }

  gy += 4 * div(days, 1461);
  days %= 1461;

  if (days > 365) {
    gy += div(days - 1, 365);
    days = mod(days - 1, 365);
  }

  const gd = days + 1;

  const leap =
    (gy % 4 === 0 && gy % 100 !== 0) ||
    gy % 400 === 0;

  const monthLengths = [
    31, leap ? 29 : 28, 31, 30,
    31, 30, 31, 31, 30, 31, 30, 31,
  ];

  let gm = 0;
  let remaining = gd;

  while (gm < 12 && remaining > monthLengths[gm]) {
    remaining -= monthLengths[gm];
    gm++;
  }

  return {
    year: gy,
    month: gm + 1,
    day: remaining,
  };
};

const toISODate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const parseISODate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
};

const jalaliMonthLength = (year, month) => {
  if (month <= 6) return 31;
  if (month <= 11) return 30;

  const current = jalaliToGregorian(year, 12, 1);
  const next = jalaliToGregorian(year + 1, 1, 1);

  return Math.round(
    (Date.UTC(next.year, next.month - 1, next.day) -
      Date.UTC(current.year, current.month - 1, current.day)) /
      86400000
  );
};

const getTodayJalali = () => {
  const today = new Date();

  return gregorianToJalali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
};

const getJalaliDateLabel = (iso) => {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(parseISODate(iso));
};

const getShortDateLabel = (iso) => {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    day: 'numeric',
    month: 'short',
  }).format(parseISODate(iso));
};

/* -------------------------------------------------------
   Small visual helpers
   ------------------------------------------------------- */

const CalendarIcon = ({ name, size = 16 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const icons = {
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    check: <path d="m5 12 4 4L19 6" />,
    list: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <circle cx="3.5" cy="6" r=".7" />
        <circle cx="3.5" cy="12" r=".7" />
        <circle cx="3.5" cy="18" r=".7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14Z" />
      </>
    ),
  };

  return <svg {...common}>{icons[name] || icons.calendar}</svg>;
};

/* -------------------------------------------------------
   Calendar component
   ------------------------------------------------------- */

const CalendarPanel = ({ compact = false }) => {
  const todayISO = toISODate(new Date());

  const [month, setMonth] = useState(getTodayJalali);
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [events, setEvents] = useState([]);
  const toast = useToast();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventTime, setEventTime] = useState('09:00');
  const [category, setCategory] = useState('general');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let active = true;
    api('/calendar').then((result) => {
      if (!active) return;
      setEvents((result.events || []).map((event) => ({
        id: event.id, title: event.title, description: event.description || '',
        date: String(event.start_at).slice(0, 10), time: new Date(event.start_at).toTimeString().slice(0, 5),
        category: 'general', color: event.color || '#8B5CF6'
      })));
    }).catch((error) => toast(error.message, 'error'));
    return () => { active = false; };
  }, []);

  const cells = useMemo(() => {
    const first = jalaliToGregorian(month.year, month.month, 1);

    const firstDate = new Date(
      first.year,
      first.month - 1,
      first.day,
      12
    );

    const offset = (firstDate.getDay() + 1) % 7;

    const startDate = new Date(firstDate);
    startDate.setDate(startDate.getDate() - offset);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      const jalali = gregorianToJalali(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      return {
        key: toISODate(date),
        iso: toISODate(date),
        day: jalali.day,
        date,
        currentMonth:
          jalali.year === month.year &&
          jalali.month === month.month,
      };
    });
  }, [month]);

  const eventsByDate = useMemo(() => {
    const grouped = {};

    events.forEach((event) => {
      if (!grouped[event.date]) grouped[event.date] = [];
      grouped[event.date].push(event);
    });

    Object.values(grouped).forEach((items) => {
      items.sort((a, b) =>
        (a.time || '').localeCompare(b.time || '')
      );
    });

    return grouped;
  }, [events]);

  const selectedEvents = eventsByDate[selectedDate] || [];

  const monthlyEvents = useMemo(() => {
    return events.filter((event) => {
      if (!event.date) return false;

      const date = parseISODate(event.date);
      const jalali = gregorianToJalali(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      return (
        jalali.year === month.year &&
        jalali.month === month.month
      );
    });
  }, [events, month]);

  const upcomingEvents = useMemo(() => {
    return events
      .filter((event) => event.date >= todayISO)
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);

        return dateCompare !== 0
          ? dateCompare
          : (a.time || '').localeCompare(b.time || '');
      })
      .slice(0, 4);
  }, [events, todayISO]);

  const selectedLabel = getJalaliDateLabel(selectedDate);

  const changeMonth = (step) => {
    setMonth((current) => {
      let year = current.year;
      let nextMonth = current.month + step;

      if (nextMonth > 12) {
        nextMonth = 1;
        year++;
      } else if (nextMonth < 1) {
        nextMonth = 12;
        year--;
      }

      return { year, month: nextMonth };
    });
  };

  const goToToday = () => {
    setMonth(getTodayJalali());
    setSelectedDate(todayISO);
  };

  const selectCell = (cell) => {
    setSelectedDate(cell.iso);

    if (!cell.currentMonth) {
      const date = gregorianToJalali(
        cell.date.getFullYear(),
        cell.date.getMonth() + 1,
        cell.date.getDate()
      );

      setMonth({
        year: date.year,
        month: date.month,
      });
    }
  };

  const saveEvent = async (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (cleanTitle.length < 2) { setFormError('عنوان رویداد باید حداقل دو کاراکتر باشد.'); return; }
    try {
      const startAt = new Date(`${selectedDate}T${eventTime}:00`).toISOString();
      const result = await api('/calendar', { method: 'POST', body: { title: cleanTitle.slice(0, 180), description: description.trim().slice(0, 5000), startAt, allDay: false, color: '#8B5CF6' } });
      const item = result.event;
      setEvents((current) => [...current, { id:item.id, title:item.title, description:item.description||'', date:String(item.start_at).slice(0,10), time:new Date(item.start_at).toTimeString().slice(0,5), category:'general' }]);
      setTitle(''); setDescription(''); setEventTime('09:00'); setCategory('general'); setFormError(''); setShowForm(false); toast('رویداد در تقویم حساب شما ذخیره شد.');
    } catch (error) { setFormError(error.message); toast(error.message, 'error'); }
  };

  const removeEvent = async (id) => {
    try { await api(`/calendar/${id}`, { method: 'DELETE', body: {} }); setEvents((current) => current.filter((event) => String(event.id) !== String(id))); toast('رویداد حذف شد.'); }
    catch (error) { toast(error.message, 'error'); }
  };

  const openForm = () => {
    setFormError('');
    setShowForm((value) => !value);
  };

  const monthTitle = `${jalaliMonths[month.month - 1]} ${numberFa.format(month.year)}`;

  return (
    <section
      dir="rtl"
      className={`relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b0a24]/80 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl ${
        compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6 lg:p-7'
      }`}
    >
      {/* Decorative glass effects */}
      <div className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-brandPurple/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-brandBlue/10 blur-[90px]" />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brandPurple/25 bg-gradient-to-br from-brandPurple/25 to-brandBlue/10 text-purple-200 shadow-lg shadow-brandPurple/10">
              <PanelIcon name="calendar" size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white sm:text-lg">
                  تقویم برنامه‌ریزی
                </h2>
                <span className="hidden rounded-full border border-brandPurple/20 bg-brandPurple/10 px-2 py-0.5 text-[9px] font-medium text-purple-200 sm:inline-flex">
                  MH Flow Calendar
                </span>
              </div>

              <p className="mt-1 text-[10px] text-slate-50/40 sm:text-xs">
                زمانت را مدیریت کن، نه اینکه دنبالش بدوی.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={goToToday}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-[10px] font-semibold text-slate-200/80 transition hover:border-brandPurple/40 hover:bg-brandPurple/10 hover:text-white"
          >
            <CalendarIcon name="calendar" size={14} />
            برو به امروز
          </button>
        </div>

        {/* Summary cards */}
        {!compact && (
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="group rounded-2xl border border-brandPurple/15 bg-gradient-to-br from-brandPurple/[0.12] to-transparent p-4 transition hover:border-brandPurple/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-50/45">
                  رویدادهای این ماه
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brandPurple/15 text-purple-300">
                  <CalendarIcon name="calendar" size={16} />
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-bold text-white">
                  {numberFa.format(monthlyEvents.length)}
                </span>
                <span className="mb-1 text-[9px] text-slate-50/35">
                  رویداد ثبت‌شده
                </span>
              </div>
            </div>

            <div className="group rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] to-transparent p-4 transition hover:border-cyan-400/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-50/45">
                  برنامه‌های امروز
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <CalendarIcon name="clock" size={16} />
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-bold text-white">
                  {numberFa.format(
                    eventsByDate[todayISO]?.length || 0
                  )}
                </span>
                <span className="mb-1 text-[9px] text-slate-50/35">
                  برنامه برای امروز
                </span>
              </div>
            </div>

            <div className="group rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.08] to-transparent p-4 transition hover:border-emerald-400/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-50/45">
                  برنامه‌های پیش‌رو
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <CalendarIcon name="list" size={16} />
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-bold text-white">
                  {numberFa.format(upcomingEvents.length)}
                </span>
                <span className="mb-1 text-[9px] text-slate-50/35">
                  نزدیک‌ترین رویدادها
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main calendar layout */}
        <div
          className={`grid gap-4 ${
            compact
              ? 'grid-cols-2'
              : 'grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.85fr)]'
          }`}
        >

          {/* Calendar area */}
          <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#11102d]/60 p-3 sm:p-4">

            {/* Month navigation */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="mb-1 text-[9px] text-slate-50/35">
                  نمای ماهانه
                </p>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {monthTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="ماه قبل"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-200/70 transition hover:border-brandPurple/40 hover:bg-brandPurple/10 hover:text-white"
                >
                  <CalendarIcon name="right" size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="ماه بعد"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-200/70 transition hover:border-brandPurple/40 hover:bg-brandPurple/10 hover:text-white"
                >
                  <CalendarIcon name="left" size={17} />
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="mb-2 grid grid-cols-7 gap-1.5">
              {weekdays.map((day, index) => (
                <div
                  key={day}
                  className={`py-2 text-center text-[9px] font-semibold sm:text-[10px] ${
                    index === 6
                      ? 'text-rose-300/60'
                      : 'text-slate-50/40'
                  }`}
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.slice(0, 1)}</span>
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {cells.map((cell) => {
                const dayEvents = eventsByDate[cell.iso] || [];
                const isToday = cell.iso === todayISO;
                const isSelected = cell.iso === selectedDate;

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => selectCell(cell)}
                    aria-pressed={isSelected}
                    aria-label={`${numberFa.format(cell.day)} ${jalaliMonths[gregorianToJalali(
                      cell.date.getFullYear(),
                      cell.date.getMonth() + 1,
                      cell.date.getDate()
                    ).month - 1]}`}
                    className={`group relative flex min-h-[51px] flex-col items-center rounded-xl border px-0.5 py-2 text-center transition-all duration-200 sm:min-h-[79px] sm:rounded-2xl sm:px-1.5 sm:py-2.5 ${
                      isSelected
                        ? 'border-brandPurple/50 bg-gradient-to-br from-brandPurple/35 to-brandViolet/20 shadow-[0_5px_24px_rgba(139,92,246,0.16)]'
                        : isToday
                          ? 'border-brandPurple/35 bg-brandPurple/[0.09]'
                          : cell.currentMonth
                            ? 'border-white/[0.045] bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.055]'
                            : 'border-transparent bg-transparent opacity-30 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className={`mb-1 flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-medium sm:h-7 sm:w-7 sm:text-xs ${
                      isSelected
                        ? 'bg-brandPurple text-white shadow-md shadow-brandPurple/30'
                        : isToday
                          ? 'text-purple-200'
                          : cell.currentMonth
                            ? 'text-slate-100/75'
                            : 'text-slate-100/35'
                    }`}>
                      {numberFa.format(cell.day)}
                    </span>

                    {/* Event labels on desktop */}
                    {!compact && dayEvents.length > 0 && (
                      <div className="hidden w-full space-y-1 px-0.5 sm:block">
                        {dayEvents.slice(0, 2).map((event) => {
                          const eventCategory =
                            categories[event.category] || categories.general;

                          return (
                            <div
                              key={event.id}
                              className={`flex items-center gap-1 overflow-hidden rounded-md px-1 py-0.5 text-right text-[8px] ${eventCategory.soft} ${eventCategory.text}`}
                            >
                              <span className={`h-1 w-1 shrink-0 rounded-full ${eventCategory.color}`} />
                              <span className="truncate">
                                {event.title}
                              </span>
                            </div>
                          );
                        })}

                        {dayEvents.length > 2 && (
                          <span className="block text-[8px] text-slate-50/35">
                            +{numberFa.format(dayEvents.length - 2)} مورد دیگر
                          </span>
                        )}
                      </div>
                    )}

                    {/* Event dots for mobile */}
                    {dayEvents.length > 0 && (
                      <div className="mt-auto flex items-center justify-center gap-0.5 pt-1 sm:hidden">
                        {dayEvents.slice(0, 3).map((event) => {
                          const eventCategory =
                            categories[event.category] || categories.general;

                          return (
                            <span
                              key={event.id}
                              className={`h-1 w-1 rounded-full ${eventCategory.color}`}
                            />
                          );
                        })}
                      </div>
                    )}

                    {dayEvents.length > 0 && !compact && (
                      <span className="absolute left-1 top-1 hidden h-1.5 w-1.5 rounded-full bg-cyan-300/80 sm:block" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4">
              <span className="text-[9px] text-slate-50/35">
                دسته‌بندی‌ها:
              </span>

              {Object.entries(categories).map(([key, item]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                  <span className="text-[9px] text-slate-50/50">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: day agenda */}
          <div className="flex min-w-0 flex-col gap-4">

            {/* Selected day */}
            <div className="overflow-hidden rounded-2xl border border-brandPurple/20 bg-gradient-to-br from-brandPurple/[0.15] via-[#17133a]/70 to-brandBlue/[0.08] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-[9px] text-purple-200/60">
                    برنامه روز انتخاب‌شده
                  </p>
                  <h3 className="text-base font-bold text-white">
                    {selectedLabel}
                  </h3>
                  <p className="mt-2 text-[10px] text-slate-50/40">
                    {numberFa.format(selectedEvents.length)} رویداد برای این روز
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brandPurple/20 bg-brandPurple/15 text-purple-200">
                  <PanelIcon name="calendar" size={20} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                <div className="flex items-center gap-2 text-[9px] text-slate-50/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  برنامه‌ریزی شخصی
                </div>

                <button
                  type="button"
                  onClick={openForm}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-l from-brandPurple to-brandViolet px-3 py-2 text-[10px] font-bold text-white shadow-lg shadow-brandPurple/20 transition hover:brightness-110 active:scale-[0.97]"
                >
                  <CalendarIcon name="plus" size={13} />
                  افزودن رویداد
                </button>
              </div>
            </div>

            {/* Add event form */}
            {showForm && (
              <form
                onSubmit={saveEvent}
                className="rounded-2xl border border-brandPurple/25 bg-[#151232]/90 p-4 shadow-xl shadow-black/10"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      رویداد جدید
                    </h3>
                    <p className="mt-1 text-[9px] text-slate-50/40">
                      برای {getJalaliDateLabel(selectedDate)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    aria-label="بستن فرم"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-50/50 transition hover:bg-white/5 hover:text-white"
                  >
                    <CalendarIcon name="close" size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-[9px] text-slate-50/55">
                      عنوان رویداد
                    </label>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      maxLength={90}
                      minLength={2}
                      required
                      placeholder="مثلاً: جلسه تیم طراحی"
                      className="w-full rounded-xl border border-white/10 bg-[#09081f]/80 px-3 py-3 text-xs text-white outline-none transition placeholder:text-slate-50/25 focus:border-brandPurple/60 focus:ring-2 focus:ring-brandPurple/10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1.5 block text-[9px] text-slate-50/55">
                        ساعت شروع
                      </label>
                      <input
                        aria-label="ساعت رویداد"
                        type="time"
                        value={eventTime}
                        onChange={(event) => setEventTime(event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#09081f]/80 px-3 py-2.5 text-xs text-white outline-none focus:border-brandPurple/60"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[9px] text-slate-50/55">
                        دسته‌بندی
                      </label>
                      <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#09081f]/80 px-3 py-2.5 text-xs text-white outline-none focus:border-brandPurple/60"
                      >
                        {Object.entries(categories).map(([key, item]) => (
                          <option key={key} value={key}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[9px] text-slate-50/55">
                      توضیحات (اختیاری)
                    </label>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      rows={2}
                      maxLength={240}
                      placeholder="جزئیات بیشتری درباره این رویداد بنویس..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#09081f]/80 px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-50/25 focus:border-brandPurple/60"
                    />
                  </div>

                  {formError && (
                    <p className="text-[10px] leading-5 text-rose-300">
                      {formError}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brandPurple to-brandViolet py-3 text-[10px] font-bold text-white shadow-lg shadow-brandPurple/20 transition hover:brightness-110 active:scale-[0.98]"
                    >
                      <CalendarIcon name="check" size={14} />
                      ثبت رویداد
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormError('');
                      }}
                      className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[10px] text-slate-200/60 transition hover:bg-white/[0.07]"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Selected day events */}
            <div className="flex-1 rounded-2xl border border-white/[0.07] bg-[#11102d]/60 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">
                    برنامه‌های روز
                  </h3>
                  <p className="mt-1 text-[9px] text-slate-50/35">
                    رویدادهای زمان‌بندی‌شده
                  </p>
                </div>

                <span className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[9px] text-slate-200/50">
                  {numberFa.format(selectedEvents.length)} مورد
                </span>
              </div>

              {selectedEvents.length === 0 ? (
                <div className="flex min-h-[175px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-4 py-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-brandPurple/15 bg-brandPurple/[0.08] text-purple-300/70">
                    <CalendarIcon name="calendar" size={21} />
                  </div>

                  <p className="text-xs font-semibold text-slate-100/65">
                    روز خلوتی در پیش داری!
                  </p>

                  <p className="mt-2 max-w-[210px] text-[9px] leading-5 text-slate-50/35">
                    هنوز برنامه‌ای برای این روز ثبت نکرده‌ای.
                    می‌توانی اولین رویدادت را اضافه کنی.
                  </p>

                  <button
                    type="button"
                    onClick={openForm}
                    className="mt-4 text-[10px] font-semibold text-purple-300 transition hover:text-white"
                  >
                    + افزودن اولین رویداد
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((event) => {
                    const item =
                      categories[event.category] || categories.general;

                    return (
                      <div
                        key={event.id}
                        className="group flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition hover:border-white/15 hover:bg-white/[0.045]"
                      >
                        <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
                          <CalendarIcon
                            name="clock"
                            size={14}
                          />
                          <span
                            dir="ltr"
                            className="mt-1 text-[10px] font-semibold tabular-nums text-slate-200/70"
                          >
                            {event.time || '--:--'}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                            <h4 className="truncate text-[11px] font-semibold text-slate-100/85">
                              {event.title}
                            </h4>
                          </div>

                          {event.description && (
                            <p className="mb-2 line-clamp-2 text-[9px] leading-5 text-slate-50/40">
                              {event.description}
                            </p>
                          )}

                          <span className={`inline-flex rounded-md border px-2 py-1 text-[8px] ${item.soft} ${item.text} ${item.border}`}>
                            {item.label}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeEvent(event.id)}
                          aria-label={`حذف ${event.title}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-lg text-slate-50/20 opacity-100 transition hover:bg-rose-400/10 hover:text-rose-300 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <CalendarIcon name="trash" size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Upcoming events */}
            {!compact && (
              <div className="rounded-2xl border border-white/[0.07] bg-[#11102d]/60 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      برنامه‌های پیش‌رو
                    </h3>
                    <p className="mt-1 text-[9px] text-slate-50/35">
                      نزدیک‌ترین رویدادهای ثبت‌شده
                    </p>
                  </div>

                  <CalendarIcon name="sparkle" size={16} />
                </div>

                {upcomingEvents.length === 0 ? (
                  <p className="rounded-xl bg-white/[0.025] px-3 py-4 text-center text-[9px] text-slate-50/35">
                    هنوز رویداد آینده‌ای ثبت نشده است.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {upcomingEvents.map((event) => {
                      const item =
                        categories[event.category] || categories.general;

                      return (
                        <button
                          type="button"
                          key={event.id}
                          onClick={() => {
                            setSelectedDate(event.date);
                            const date = parseISODate(event.date);
                            const jalali = gregorianToJalali(
                              date.getFullYear(),
                              date.getMonth() + 1,
                              date.getDate()
                            );
                            setMonth({
                              year: jalali.year,
                              month: jalali.month,
                            });
                          }}
                          className="flex w-full items-center gap-3 rounded-xl border border-white/[0.045] bg-white/[0.02] p-2.5 text-right transition hover:border-brandPurple/25 hover:bg-brandPurple/[0.06]"
                        >
                          <span className={`h-8 w-1 shrink-0 rounded-full ${item.color}`} />

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[10px] font-medium text-slate-100/75">
                              {event.title}
                            </span>
                            <span className="mt-1 block text-[8px] text-slate-50/35">
                              {getShortDateLabel(event.date)}
                            </span>
                          </span>

                          <span dir="ltr" className="text-[9px] text-slate-50/40">
                            {event.time || '--:--'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {!compact && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 text-[9px] text-slate-50/35">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              تقویم شخصی MH Flow
            </div>

            <p className="text-[9px] text-slate-50/30">
              رویدادها فعلاً در حافظه همین مرورگر ذخیره می‌شوند.
            </p>
          </div>
        )}

        {compact && (
          <Link
            to="/dashboard/calendar"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brandPurple/20 bg-brandPurple/[0.08] px-3 py-2.5 text-[10px] font-semibold text-purple-200 no-underline transition hover:bg-brandPurple/15 hover:text-white"
          >
            باز کردن تقویم کامل
            <CalendarIcon name="left" size={13} />
          </Link>
        )}
      </div>
    </section>
  );
};

export default CalendarPanel;
