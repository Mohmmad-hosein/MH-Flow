import React from 'react';

const Hero = () => {
  return (
    <section className="relative z-10 pt-28 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-10 max-w-[1280px] mx-auto min-h-[auto] lg:min-h-screen flex items-center">
      
      <style>{`
        @keyframes dashFloat {
          0%, 100% { transform: perspective(1000px) rotateY(-8deg) rotateX(3deg) translateY(0); }
          50% { transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(-7px); }
        }
        .animate-dash-float { animation: dashFloat 9s ease-in-out infinite; }
        
        @keyframes barGrow { from { height: 0; } }
        .animate-bar-grow { animation: barGrow .7s ease-out both; }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .animate-pulse-dot { animation: pulse-dot 3.2s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
        
        <div className="flex-1 w-full max-w-[540px] text-center lg:text-right">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brandPurple/15 border border-brandPurple/30 rounded-full text-xs text-purple-300 mb-6">
            <div className="w-1.5 h-1.5 bg-brandPurple rounded-full animate-pulse-dot"></div>
            هوش مصنوعی برنامه‌ریزی نسل جدید
          </div>
          
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.2] tracking-tight mb-5">
            برنامه‌ریزی روزتان را از یک کار طاقت‌فرسا به یک
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#60A5FA] to-[#F472B6] bg-clip-text text-transparent"> اثر هنری </span>
            تبدیل کنید
          </h1>
          
          <p className="text-base text-slate-50/55 leading-relaxed mb-8 max-w-[440px]">
            MH Flow با هوش مصنوعی پیشرفته، اهداف شما را تحلیل می‌کند، آن‌ها را به وظایف قابل اجرا تبدیل می‌کند و برنامه روزانه‌تان را به صورت خودکار می‌سازد.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
            <a href="/login" className="px-8 py-3.5 bg-gradient-to-br from-brandPurple to-brandViolet rounded-xl text-white text-base font-semibold shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(139,92,246,0.7)] transition-all flex items-center gap-2 no-underline">
              شروع رایگان ✦
            </a>
            <a href="#features" className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-slate-50 text-base backdrop-blur-md hover:border-brandPurple hover:bg-brandPurple/10 transition-all flex items-center gap-2 no-underline">
              مشاهده امکانات <span aria-hidden="true">←</span>
            </a>
          </div>
          

        </div>


<div className="flex-1 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] w-full mt-4 lg:mt-0">

  {/* Background Glow */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-brandPurple/20 rounded-full blur-[70px] pointer-events-none" />

  <div className="animate-dash-float [transform-origin:center] motion-reduce:animate-none relative z-10">

    <div className="bg-gradient-to-br from-[#151139]/95 via-[#100d32]/95 to-[#090721]/95 border border-brandPurple/30 rounded-2xl p-3 sm:p-5 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.45)] overflow-hidden">

      {/* Dashboard Header */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/[0.07]">

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C940]" />
        </div>

        <div className="flex-1 text-center">
          <span className="text-[10px] sm:text-xs font-medium text-slate-300/70">
            MH Flow — Dashboard
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 text-xs">
            ♧
          </div>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brandBlue/40 to-brandPurple/40 border border-brandPurple/30 flex items-center justify-center text-white text-xs">
            ◉
          </div>
        </div>

      </div>

      {/* Welcome */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] text-slate-400 mb-1">فضای کاری شما</div>
          <div className="text-sm sm:text-base font-bold text-white">
            داشبورد شما
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-400/[0.08] border border-emerald-400/15 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-300">فعال</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">

        <div className="bg-emerald-400/[0.06] border border-emerald-400/15 rounded-xl p-2.5 sm:p-3">
          <div className="text-[9px] text-slate-400 mb-2">وظایف تکمیل‌شده</div>
          <div className="text-lg sm:text-xl font-extrabold text-white">۱۸</div>
          <div className="text-[8px] text-emerald-400 mt-1">+۱۲٪ رشد</div>
        </div>

        <div className="bg-sky-400/[0.06] border border-sky-400/15 rounded-xl p-2.5 sm:p-3">
          <div className="text-[9px] text-slate-400 mb-2">ساعت تمرکز</div>
          <div className="text-lg sm:text-xl font-extrabold text-white">۲۴.۵</div>
          <div className="text-[8px] text-slate-500 mt-1">این هفته</div>
        </div>

        <div className="bg-violet-400/[0.06] border border-violet-400/15 rounded-xl p-2.5 sm:p-3">
          <div className="text-[9px] text-slate-400 mb-2">بهره‌وری</div>
          <div className="text-lg sm:text-xl font-extrabold text-white">۸۲</div>
          <div className="text-[8px] text-violet-300 mt-1">شاخص عملکرد</div>
        </div>

        <div className="bg-pink-400/[0.06] border border-pink-400/15 rounded-xl p-2.5 sm:p-3">
          <div className="text-[9px] text-slate-400 mb-2">استریک روزانه</div>
          <div className="text-lg sm:text-xl font-extrabold text-white">۳</div>
          <div className="text-[8px] text-pink-300 mt-1">روز متوالی 🔥</div>
        </div>

      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-5 gap-2 mb-3">

        {/* Weekly Chart */}
        <div className="col-span-3 bg-brandBlue/[0.045] border border-brandBlue/15 rounded-xl p-3 min-h-[155px]">

          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold text-slate-200">روند بهره‌وری</div>
              <div className="text-[8px] text-slate-500 mt-1">فعالیت هفتگی</div>
            </div>
            <div className="text-[8px] text-violet-300 bg-violet-400/10 rounded-md px-2 py-1">
              ۷ روز
            </div>
          </div>

          <div className="relative h-[85px] w-full">

            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="border-t border-dashed border-white/[0.06]" />
              <div className="border-t border-dashed border-white/[0.06]" />
              <div className="border-t border-dashed border-white/[0.06]" />
              <div className="border-t border-dashed border-white/[0.06]" />
            </div>

            {/* Line Chart */}
            <svg
              viewBox="0 0 300 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity=".35" />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="heroChartLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#E879F9" />
                </linearGradient>
              </defs>

              <path
                d="M0 72 C20 67 25 55 50 59 S75 77 100 48 S130 35 150 48 S180 25 200 31 S230 49 250 20 S280 27 300 8 L300 100 L0 100 Z"
                fill="url(#heroChartFill)"
              />

              <path
                d="M0 72 C20 67 25 55 50 59 S75 77 100 48 S130 35 150 48 S180 25 200 31 S230 49 250 20 S280 27 300 8"
                fill="none"
                stroke="url(#heroChartLine)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {[[0,72],[50,59],[100,48],[150,48],[200,31],[250,20],[300,8]].map(([x,y],i)=>(
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#17143D"
                  stroke="#C4B5FD"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

          </div>

          <div className="flex justify-between mt-2 text-[8px] text-slate-500">
            <span>شنبه</span>
            <span>یکشنبه</span>
            <span>دوشنبه</span>
            <span>سه‌شنبه</span>
            <span>چهارشنبه</span>
            <span>پنجشنبه</span>
            <span>جمعه</span>
          </div>

        </div>

        {/* Daily Activity */}
        <div className="col-span-2 bg-brandViolet/[0.045] border border-brandViolet/15 rounded-xl p-3 min-h-[155px]">

          <div className="text-[10px] font-bold text-slate-200">فعالیت روزانه</div>
          <div className="text-[8px] text-slate-500 mt-1 mb-4">مقایسه هفتگی</div>

          <div className="flex items-end justify-between gap-1 h-[92px] border-b border-white/[0.07]">

            {[42, 68, 52, 88, 62, 96, 73].map((height, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full flex-1 gap-1">

                <div
                  className={`w-full max-w-[17px] rounded-t-md animate-bar-grow ${
                    index === 5
                      ? 'bg-gradient-to-t from-pink-500 to-pink-600 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                      : 'bg-gradient-to-t from-purple-700 to-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                  }`}
                  style={{
                    height: `${height}%`,
                    animationDelay: `${index * 0.08}s`
                  }}
                />

                <span className="text-[8px] text-slate-500">
                  {''[index]}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Tasks Section */}
      <div className="bg-[#17133D]/70 border border-white/[0.07] rounded-xl p-3">

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] font-bold text-white">وظایف امروز</div>
            <div className="text-[8px] text-slate-500 mt-1">برنامه‌های پیش‌رو</div>
          </div>

          <div className="text-[8px] text-brandPurple bg-brandPurple/10 border border-brandPurple/15 rounded-md px-2 py-1">
            مشاهده همه ←
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {[
            { title: 'طراحی دیتابیس کاربران', time: '۱۰:۰۰ صبح', done: true },
            { title: 'جلسه با تیم مارکتینگ', time: '۰۲:۳۰ عصر', done: false },
            { title: 'بررسی کدهای React', time: '۰۵:۰۰ عصر', done: false },
            { title: 'نوشتن مستندات API', time: 'فردا', done: false },
          ].map((task, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-lg border p-2 ${
                task.done
                  ? 'bg-white/[0.025] border-white/[0.04] opacity-60'
                  : 'bg-white/[0.025] border-white/[0.06]'
              }`}
            >
              <div className={`w-3.5 h-3.5 shrink-0 rounded-[4px] border flex items-center justify-center text-[8px] ${
                task.done
                  ? 'bg-brandPurple border-brandPurple text-white'
                  : 'border-slate-500/50'
              }`}>
                {task.done && '✓'}
              </div>

              <div className="min-w-0 flex-1">
                <div className={`text-[9px] truncate ${task.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {task.title}
                </div>
                <div className="text-[8px] text-slate-500 mt-1">
                  ◷ {task.time}
                </div>
              </div>

              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${task.done ? 'bg-emerald-400' : 'bg-brandPurple'}`} />
            </div>
          ))}

        </div>

      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[8px] text-slate-500">فضای کاری MH Flow</span>
        </div>

        <span className="text-[8px] text-slate-500">
          مدیریت هوشمند وظایف ✦
        </span>
      </div>

    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Hero;