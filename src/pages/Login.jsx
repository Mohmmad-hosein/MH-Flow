import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const sliderData = [
  {
    id: 1,
    icon: "🚀",
    title: "برنامه‌ریزی شفاف و متمرکز",
    subtitle: "همه کارها در یک فضای منظم",
    text: "اهداف خود را به گام‌های روشن تبدیل کنید و پیشرفت کارهایتان را در یک محیط یکپارچه دنبال کنید.",
  },
  {
    id: 2,
    icon: "🧠",
    title: "تمرکز روی اولویت‌ها",
    subtitle: "وظایف کوچک‌تر، مسیر روشن‌تر",
    text: "کارهای مهم را مشخص کنید، برای آن‌ها زمان در نظر بگیرید و بدون شلوغی ذهنی قدم بعدی را بردارید.",
  },
  {
    id: 3,
    icon: "⚡",
    title: "آماده برای همکاری تیمی",
    subtitle: "فضای کاری شخصی و تیمی",
    text: "کارهای شخصی و فعالیت‌های تیمی را در فضاهای جداگانه و منظم مدیریت کنید.",
  },
];

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [form, setForm] = useState({
    displayName: "",
    email: new URLSearchParams(window.location.search).get("email") || "",
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();
  const toast = useToast();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (motionQuery?.matches) return undefined;

    let timer;
    const startTimer = () => {
      if (document.hidden || timer) return;
      timer = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      }, 6500);
    };
    const stopTimer = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const handleVisibility = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (user) return <Navigate to={redirectTo} replace />;

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");

    try {
      const email = form.email.trim().toLowerCase();
      const result = isLogin
        ? await authApi.login({ email, password: form.password })
        : await authApi.register({
            email,
            password: form.password,
            displayName: form.displayName.trim(),
          });

      setUser(result.user);
      toast(
        isLogin ? "با موفقیت وارد حساب شدی." : "حساب کاربری با موفقیت ساخته شد.",
        "success"
      );
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      const message = requestError?.message || "ارتباط با سرور ناموفق بود. دوباره تلاش کن.";
      setError(message);
      toast(message, "error", 5200);
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setIsLogin((current) => !current);
    setError("");
    setForm((current) => ({ ...current, password: "" }));
  };

  return (
    <div dir="rtl" className="mh-login-shell min-h-screen w-full flex bg-darkBg text-slate-50 overflow-x-hidden">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -28px) scale(1.035); }
          66% { transform: translate(-16px, 16px) scale(.97); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 18s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide { animation: fadeSlide 0.5s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-fade-slide { animation: none !important; }
        }
      `}</style>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 xl:p-20 z-10 bg-darkBg">
        <div className="w-full max-w-[420px]">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold mb-12 no-underline w-fit hover:opacity-80 transition-opacity"
          >
            <div className="w-11 h-11 flex items-center justify-center rounded-2xl border border-white/15 bg-white/[.06] shadow-lg overflow-hidden">
              <img src="/mh-flow-mark.png" alt="MH Flow" className="w-9 h-9 object-contain" />
            </div>
            MH Flow
          </Link>

          <h1 className="text-[2rem] font-bold mb-2 tracking-tight">
            {isLogin ? "خوش برگشتید" : "ایجاد حساب کاربری"}
          </h1>
          <p className="text-slate-50/50 mb-8 text-sm">
            {isLogin
              ? "برای دسترسی به فضای کاری خود وارد شوید."
              : "برای ساخت حساب، اطلاعات خود را وارد کنید."}
          </p>

          <div className="flex gap-4 mb-8">
            <button type="button" disabled title="ورود با گوگل هنوز فعال نشده است" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium opacity-45 cursor-not-allowed">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              گوگل
            </button>
            <button type="button" disabled title="ورود با گیت‌هاب هنوز فعال نشده است" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium opacity-45 cursor-not-allowed">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              گیت‌هاب
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-xs text-slate-50/40 font-medium">یا با ایمیل ادامه دهید</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="displayName"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={form.displayName}
                  onChange={(event) => updateField("displayName", event.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-brandPurple focus:bg-white/5"
                  placeholder="نام و نام خانوادگی"
                  aria-label="نام و نام خانوادگی"
                />
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-brandPurple focus:bg-white/5"
                placeholder="ایمیل (name@example.com)"
                aria-label="ایمیل"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                minLength={isLogin ? 1 : 8}
                maxLength={72}
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-brandPurple focus:bg-white/5 mb-3"
                placeholder="رمز عبور"
                aria-label="رمز عبور"
              />
              {isLogin && (
                <div className="flex justify-end">
                  <span className="text-xs text-slate-50/35" title="بازیابی رمز عبور هنوز فعال نشده است">بازیابی رمز عبور</span>
                </div>
              )}
            </div>

            {error && (
              <div role="alert" aria-live="assertive" className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs leading-6 text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 mt-4 bg-slate-50 text-[#050816] rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {busy ? "لطفاً صبر کنید..." : isLogin ? "ورود به حساب کاربری" : "ایجاد حساب رایگان"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-50/50">
            {isLogin ? "حساب کاربری ندارید؟ " : "قبلاً ثبت‌نام کرده‌اید؟ "}
            <button
              type="button"
              onClick={switchMode}
              className="text-white hover:text-brandPurple font-medium transition-colors"
            >
              {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative bg-[#0a0f2e] items-center justify-center border-r border-white/10 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-brandPurple rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-brandBlue rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-20 w-80 h-80 bg-brandPink rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000" />

        <div className="relative z-10 w-full max-w-sm mx-8">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl min-h-[220px] flex flex-col justify-between">
            <div key={sliderData[currentSlide].id} className="animate-fade-slide">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brandPurple to-brandBlue p-[2px]">
                  <div className="w-full h-full bg-[#0a0f2e] rounded-full flex items-center justify-center">
                    <span className="text-xl">{sliderData[currentSlide].icon}</span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-50 font-bold">{sliderData[currentSlide].title}</div>
                  <div className="text-slate-50/50 text-xs">{sliderData[currentSlide].subtitle}</div>
                </div>
              </div>
              <p className="text-slate-50/80 text-sm leading-relaxed italic h-[80px]">{sliderData[currentSlide].text}</p>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              {sliderData.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`رفتن به اسلاید ${index + 1}`}
                  aria-pressed={currentSlide === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-6 bg-brandPurple" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
