import React from 'react';

const Hero = () => {
  return (
    <section className="relative z-10 pt-28 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-10 max-w-[1280px] mx-auto min-h-[auto] lg:min-h-screen flex items-center">
      
      <style>{`
        @keyframes dashFloat {
          0%, 100% { transform: perspective(1000px) rotateY(-8deg) rotateX(3deg) translateY(0); }
          50% { transform: perspective(1000px) rotateY(-8deg) rotateX(3deg) translateY(-16px); }
        }
        .animate-dash-float { animation: dashFloat 6s ease-in-out infinite; will-change: transform; }
        
        @keyframes barGrow { from { height: 0; } }
        .animate-bar-grow { animation: barGrow 1s ease-out both; }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .animate-pulse-dot { animation: pulse-dot 2s infinite; }
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
            <button className="px-8 py-3.5 bg-gradient-to-br from-brandPurple to-brandViolet rounded-xl text-white text-base font-semibold shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(139,92,246,0.7)] transition-all flex items-center gap-2">
              شروع رایگان ✦
            </button>
            <button className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-slate-50 text-base backdrop-blur-md hover:border-brandPurple hover:bg-brandPurple/10 transition-all flex items-center gap-2">
              ▷ مشاهده دمو
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-8 pt-5 sm:pt-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-50">+۱۲۰۰۰</div>
              <div className="text-xs text-slate-50/55 mt-1">کاربر فعال</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-50">۴.۹ ★</div>
              <div className="text-xs text-slate-50/55 mt-1">امتیاز کاربران</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-50">+۸۰٪</div>
              <div className="text-xs text-slate-50/55 mt-1">افزایش بهره‌وری</div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] w-full mt-4 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] bg-brandPurple/20 rounded-full blur-[48px] -z-10 pointer-events-none"></div>
          
          <div className="animate-dash-float [transform-origin:center] motion-reduce:animate-none">
            <div className="bg-gradient-to-br from-[#14103c]/95 to-[#0a0828]/98 border border-brandPurple/30 rounded-2xl p-3 sm:p-5 backdrop-blur-md shadow-[0_24px_50px_rgba(0,0,0,0.38)] overflow-hidden">
              
              <div className="flex items-center gap-2 mb-4 pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C940]"></div>
                <span className="mr-auto text-xs text-slate-50/55">MH Flow — Dashboard</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                <div className="bg-brandPurple/10 border border-brandPurple/20 rounded-xl p-3">
                  <div className="text-[10px] text-slate-50/55 mb-1">وظایف امروز</div>
                  <div className="text-lg font-bold text-slate-50">۱۲</div>
                </div>
                <div className="bg-brandBlue/10 border border-brandBlue/20 rounded-xl p-3">
                  <div className="text-[10px] text-slate-50/55 mb-1">تکمیل‌شده</div>
                  <div className="text-lg font-bold text-slate-50">۸</div>
                </div>
                <div className="bg-brandPink/10 border border-brandPink/20 rounded-xl p-3">
                  <div className="text-[10px] text-slate-50/55 mb-1">پیشرفت</div>
                  <div className="text-lg font-bold text-slate-50">۶۷٪</div>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                <div className="col-span-3 bg-brandBlue/5 border border-brandBlue/20 rounded-xl p-3 h-[140px] flex flex-col">
                  <div className="text-[10px] text-slate-50/55 mb-2">پیشرفت هفتگی</div>
                  <div className="flex items-end gap-1.5 flex-1">
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '45%' }}></div>
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '60%', animationDelay: '0.1s' }}></div>
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '40%', animationDelay: '0.2s' }}></div>
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '75%', animationDelay: '0.3s' }}></div>
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '55%', animationDelay: '0.4s' }}></div>
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '85%', animationDelay: '0.5s' }}></div>
                    <div className="flex-1 bg-gradient-to-t from-brandPurple to-brandViolet rounded-t-md opacity-80 animate-bar-grow" style={{ height: '70%', animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                
                <div className="col-span-2 bg-brandViolet/5 border border-brandViolet/30 rounded-xl p-3">
                  <div className="text-[10px] text-slate-50/55 mb-2">وظایف اخیر</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] text-slate-50/55 pb-1 border-b border-white/5">
                      <div className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] bg-brandPurple border-brandPurple text-white">✓</div>
                      مطالعه React
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-50/55 pb-1 border-b border-white/5">
                      <div className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] bg-brandPurple border-brandPurple text-white">✓</div>
                      طراحی UI
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-50/55 pb-1 border-b border-white/5">
                      <div className="w-3.5 h-3.5 rounded border border-brandPurple/50"></div>
                      نوشتن API
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-50/55">
                      <div className="w-3.5 h-3.5 rounded border border-brandPurple/50"></div>
                      تست‌نویسی
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-50/55">
                      <div className="w-3.5 h-3.5 rounded border border-brandPurple/50"></div>
                     نوشتن api docs
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-50/55">
                      <div className="w-3.5 h-3.5 rounded border border-brandPurple/50"></div>
                    تست نویسی
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;