import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelIcon from './PanelIcon';

const routes = [
  { path: '/', words: ['صفحه اصلی سایت', 'صفحه اصلی', 'خانه', 'خانه سایت', 'لندینگ', 'سایت اصلی'] },
  { path: '/about', words: ['درباره ما', 'درباره ام اچ فلو', 'معرفی'] },
  { path: '/login', words: ['ورود', 'صفحه ورود', 'لاگین'] },
  { path: '/report-bug', words: ['گزارش مشکل', 'گزارش باگ', 'پشتیبانی'] },
  { path: '/privacy', words: ['حریم خصوصی', 'سیاست حریم خصوصی'] },
  { path: '/dashboard', words: ['داشبورد', 'پنل', 'نمای کلی'] },
  { path: '/dashboard/tasks', words: ['وظایف', 'تسک', 'کارها', 'لیست کارها'] },
  { path: '/dashboard/projects', words: ['پروژه ها', 'پروژه‌ها', 'پروژه'] },
  { path: '/dashboard/calendar', words: ['تقویم', 'برنامه روزانه', 'زمان بندی', 'رویدادها'] },
  { path: '/dashboard/ai-planner', words: ['برنامه ریز', 'برنامه‌ریز', 'برنامه ریزی هوشمند', 'هوش مصنوعی', 'ای آی'] },
  { path: '/dashboard/analytics', words: ['گزارش', 'گزارش ها', 'تحلیل', 'آمار', 'عملکرد'] },
  { path: '/dashboard/workspace', words: ['فضای کاری', 'تیم', 'ورک اسپیس'] },
  { path: '/dashboard/team-chat', words: ['گفتگو', 'چت تیمی', 'پیام ها'] },
  { path: '/dashboard/profile', words: ['پروفایل', 'حساب کاربری'] },
  { path: '/dashboard/settings', words: ['تنظیمات', 'تنظیمات حساب'] },
];

const normalize = (value) => value.toLowerCase().replace(/[\u064B-\u065F\u0670]/g, '').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[؟?!،,.]/g, ' ').replace(/\s+/g, ' ').trim();

const VoiceNavigator = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('برای رفتن به یک صفحه، روی میکروفون بزن و نام آن را بگو.');
  const [heard, setHeard] = useState('');
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* already stopped */ }
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setUnsupported(true);
      setMessage('تشخیص گفتار در این مرورگر پشتیبانی نمی‌شود. از نسخه به‌روز Chrome یا Edge استفاده کن.');
      setOpen(true);
      return;
    }

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.onstart = () => {
      setListening(true);
      setOpen(true);
      setMessage('دارم گوش می‌دم… نام صفحه موردنظر را بگو.');
      setHeard('');
    };
    recognition.onresult = (event) => {
      const transcript = normalize(event.results?.[0]?.[0]?.transcript || '');
      setHeard(transcript);
      const command = transcript
        .replace(/^(لطفا |لطفاً )?/, '')
        .replace(/^(برو به |برو |باز کن |نمایش بده |برو صفحه )/, '')
        .trim();
      const match = routes
        .flatMap((route) => route.words.map((word) => ({ route, word: normalize(word) })))
        .filter(({ word }) => word.length > 1 && (command.includes(word) || word.includes(command)))
        .sort((a, b) => b.word.length - a.word.length)[0]?.route;
      if (match) {
        setMessage(`در حال انتقال به ${match.words[0]}…`);
        navigate(match.path);
      } else {
        setMessage('صفحه‌ای با این فرمان پیدا نکردم. مثلاً بگو «برو به تقویم».');
      }
    };
    recognition.onerror = (event) => {
      const errors = {
        'not-allowed': 'دسترسی میکروفون داده نشده است. مجوز میکروفون مرورگر را بررسی کن.',
        'no-speech': 'صدایی دریافت نشد؛ دوباره تلاش کن.',
        'network': 'سرویس تشخیص گفتار در دسترس نیست؛ اتصال اینترنت را بررسی کن.',
      };
      setMessage(errors[event.error] || 'تشخیص صدا با خطا روبه‌رو شد. دوباره تلاش کن.');
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setListening(false);
      setMessage('میکروفون در حال استفاده است یا امکان شروع تشخیص صدا وجود ندارد.');
      setOpen(true);
    }
  };

  return (
    <div className="fixed bottom-24 left-4 z-[70] md:bottom-5 md:left-5" dir="rtl">
      {open && (
        <div data-voice-panel className="mb-3 w-[min(310px,calc(100vw-2rem))] rounded-2xl border border-brandPurple/30 bg-[var(--voice-panel-bg)] p-4 shadow-[0_18px_55px_rgba(0,0,0,.45)] backdrop-blur-2xl">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--voice-text)]"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brandPurple/20 text-purple-200"><PanelIcon name="mic" size={17} /></span> دستیار صوتی MH Flow</div>
            <button type="button" onClick={() => setOpen(false)} aria-label="بستن دستیار" className="text-lg text-[var(--voice-muted)] hover:text-[var(--voice-text)]">×</button>
          </div>
          <p className="text-xs leading-6 text-[var(--voice-muted)]">{message}</p>
          {heard && <p className="mt-2 rounded-lg bg-white/5 px-3 py-2 text-[11px] text-purple-200">شنیدم: «{heard}»</p>}
          {unsupported && <p className="mt-2 text-[10px] leading-5 text-amber-200/70">این قابلیت به پشتیبانی مرورگر از Web Speech API نیاز دارد.</p>}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['برو به تقویم', 'وظایف', 'داشبورد', 'تنظیمات'].map((example) => <span key={example} className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-[var(--voice-muted)]">{example}</span>)}
          </div>
        </div>
      )}
      <button type="button" onClick={startListening} aria-label={listening ? 'توقف دستیار صوتی' : 'فعال‌سازی دستیار صوتی'} aria-pressed={listening}
        className={`flex items-center gap-2 rounded-full border px-4 py-3 text-xs font-bold text-[var(--voice-text)] shadow-[0_12px_35px_rgba(0,0,0,.35)] backdrop-blur-xl transition ${listening ? 'border-emerald-300/50 bg-emerald-500/20' : 'border-brandPurple/40 bg-[#171333]/90 hover:bg-brandPurple/25'}`}>
        <span className={`flex h-7 w-7 items-center justify-center rounded-full ${listening ? 'bg-emerald-400/20 text-emerald-200' : 'bg-brandPurple/25 text-purple-200'}`}><PanelIcon name="mic" size={16} /></span>
        {listening ? 'در حال شنیدن…' : 'دستیار صوتی'}
        {listening && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />}
      </button>
    </div>
  );
};

export default VoiceNavigator;
