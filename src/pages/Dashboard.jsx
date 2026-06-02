import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ProBadge = () => (
  <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#A78BFA] to-[#F472B6] text-white rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
    PRO
  </span>
);

const StatCard = ({ title, value, subtitle, colorClass }) => (
  <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md transition-transform hover:-translate-y-1">
    <div className="text-xs text-slate-50/50 mb-2">{title}</div>
    <div className="text-3xl font-bold text-slate-50 mb-1">{value}</div>
    <div className={`text-[11px] ${colorClass}`}>{subtitle}</div>
  </div>
);

const PremiumLockOverlay = ({ title, desc }) => (
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050816]/60 backdrop-blur-[6px] rounded-2xl border border-brandPurple/30">
    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-brandPurple to-brandPink rounded-xl mb-3 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
      <span className="text-xl">👑</span>
    </div>
    <h3 className="text-slate-50 font-bold mb-1">{title}</h3>
    <p className="text-xs text-slate-50/60 mb-4 max-w-[200px] text-center">{desc}</p>
    <button className="px-5 py-2 bg-white text-darkBg text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      ارتقا به حرفه‌ای ✦
    </button>
  </div>
);


const Dashboard = () => {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <div className="h-screen w-full bg-darkBg flex text-slate-50 overflow-hidden font-vazirmatn" dir="rtl">
      
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-8 relative">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brandBlue/10 rounded-full blur-[120px] pointer-events-none"></div>

        <header className="flex justify-between items-center mb-8 relative z-50">
          <div>
            <h1 className="text-[1.75rem] font-bold mb-1">داشبورد شما</h1>
            <p className="text-sm text-slate-50/50">امروز دوشنبه، ۱۲ شهریور — <span className="text-brandPurple font-semibold">۳ وظیفه</span> در انتظار شماست.</p>
          </div>
          
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors relative border ${showNotifs ? 'bg-brandPurple/20 text-brandPurple border-brandPurple/50' : 'bg-white/5 border-white/10 text-slate-50/70 hover:text-white'}`}
            >
              🔔
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-brandPink rounded-full animate-pulse"></span>
            </button>

            {showNotifs && (
              <div className="absolute top-14 left-0 w-80 bg-[#0f0c32]/95 backdrop-blur-2xl border border-brandPurple/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-bold text-sm">اعلان‌ها</h3>
                  <span className="text-[10px] text-brandPurple bg-brandPurple/10 px-2 py-1 rounded-full">۲ پیام جدید</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brandPink/20 flex items-center justify-center text-brandPink text-sm shrink-0">🔥</div>
                    <div>
                      <div className="text-xs font-bold text-slate-50 mb-1">استریک ۳ روزه!</div>
                      <div className="text-[11px] text-slate-50/60 leading-relaxed">فقط ۱ وظیفه دیگه مونده تا رکورد این هفته‌ت رو بشکنی. بزن بریم! 🚀</div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brandBlue/20 flex items-center justify-center text-brandBlue text-sm shrink-0">🤖</div>
                    <div>
                      <div className="text-xs font-bold text-slate-50 mb-1">برنامه جدید آماده شد</div>
                      <div className="text-[11px] text-slate-50/60 leading-relaxed">برنامه‌ریزی برای هدف "یادگیری React" توسط AI تکمیل شد.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Link to="/dashboard/profile" className="w-11 h-11 rounded-full bg-gradient-to-br from-brandBlue to-brandPurple p-[2px] cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all">
              <div className="w-full h-full bg-darkBg rounded-full border border-white/20 flex items-center justify-center text-sm">👤</div>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 relative z-10">
          <StatCard title="وظایف تکمیل شده (این هفته)" value="۱۸" subtitle="↑ ۱۲٪ رشد نسبت به هفته قبل" colorClass="text-green-400" />
          <StatCard title="ساعت‌های تمرکز" value="۲۴.۵" subtitle="هم‌تراز با میانگین شما" colorClass="text-slate-50/50" />
          <StatCard title="امتیاز بهره‌وری" value="۸۲" subtitle="↓ ۳ امتیاز کاهش" colorClass="text-brandPink" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 pb-10">
          
          <div className="lg:col-span-2 relative bg-[#0f0c32]/40 border border-white/10 rounded-2xl p-6 h-[320px] overflow-hidden">
            <PremiumLockOverlay 
              title="نمودار تحلیل بهره‌وری" 
              desc="با نسخه Pro، روند پیشرفت روزانه و نقاط ضعف خود را توسط هوش مصنوعی کشف کنید." 
            />
            <div className="filter blur-[8px] opacity-40 pointer-events-none h-full flex flex-col">
              <div className="text-sm font-semibold mb-6">تحلیل عملکرد (هفتگی)</div>
              <div className="flex-1 flex items-end gap-4">
                {[40, 70, 45, 90, 65, 85, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-brandPurple/50 rounded-t-lg" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0f0c32]/60 border border-white/10 rounded-2xl p-6 flex flex-col h-[320px]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-bold">وظایف امروز</h3>
              <Link to="/dashboard/tasks" className="text-xs text-brandPurple hover:text-purple-300">مشاهده همه</Link>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-auto pr-1 space-y-3 custom-scrollbar">
              {[
                { title: 'طراحی دیتابیس کاربران', time: '۱۰:۰۰ صبح', done: true },
                { title: 'جلسه با تیم مارکتینگ', time: '۰۲:۳۰ عصر', done: false },
                { title: 'بررسی کدهای ریکت', time: '۰۵:۰۰ عصر', done: false },
                { title: 'نوشتن مستندات API', time: 'فردا', done: false },
              ].map((task, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${task.done ? 'bg-white/5 border-transparent opacity-50' : 'bg-[#1a1642]/50 border-white/10 hover:border-brandPurple/30'}`}>
                  <div className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center text-[10px] cursor-pointer ${task.done ? 'bg-brandPurple border-brandPurple text-white' : 'border-slate-50/30'}`}>
                    {task.done && '✓'}
                  </div>
                  <div>
                    <div className={`text-sm ${task.done ? 'line-through text-slate-50/50' : 'text-slate-50'}`}>{task.title}</div>
                    <div className="text-[10px] text-slate-50/40 mt-1">🕒 {task.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;