import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <div className="h-screen w-full bg-darkBg flex text-slate-50 overflow-hidden font-vazirmatn" dir="rtl">
      
      
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto p-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandPurple/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto w-full relative z-10">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">پروفایل من</h1>
              <p className="text-slate-50/50 text-sm">آمار، دستاوردها و وضعیت بهره‌وری شما.</p>
            </div>
            <button className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm transition-all flex items-center gap-2">
              ⚙️ تنظیمات حساب
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-[#1a1642] to-[#0f0c32] border border-brandPurple/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brandPurple/40 blur-2xl rounded-full group-hover:bg-brandPurple/60 transition-colors"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brandBlue to-brandPurple rounded-full p-1 shadow-[0_0_20px_rgba(139,92,246,0.4)] mb-4">
                    <div className="w-full h-full bg-darkBg rounded-full border-2 border-white/20 flex items-center justify-center text-3xl">
                      🧑‍💻
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-slate-50 mb-1">علی حسینی</h2>
                  <div className="text-brandPurple text-xs font-semibold mb-6">MH Flow Pro Member ✦</div>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-slate-50 mb-1">۴۵</div>
                      <div className="text-[10px] text-slate-50/50">وظایف تکمیل‌شده</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-brandPink mb-1">۱۲🔥</div>
                      <div className="text-[10px] text-slate-50/50">روز استریک (مداوم)</div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-br from-brandPurple to-brandViolet text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    اشتراک‌گذاری پروفایل
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-[#0f0c32]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span>🏆</span> دستاوردهای اخیر
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[
                    { icon: '🎯', name: 'تمرکز مطلق', desc: '۱۰ کار در یک روز' },
                    { icon: '🤖', name: 'دوست AI', desc: 'تولید ۵ برنامه با AI' },
                    { icon: '🌅', name: 'سحرخیز', desc: 'انجام کار قبل از ۸ صبح' }
                  ].map((badge, idx) => (
                    <div key={idx} className="min-w-[120px] bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-brandPurple/10 transition-colors cursor-default">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="text-xs font-bold text-slate-50 mb-1">{badge.name}</div>
                      <div className="text-[9px] text-slate-50/50">{badge.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0f0c32]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> میزان فعالیت در ماه اخیر
                </h3>
                <div className="flex flex-wrap gap-1.5 opacity-80">
                  {Array.from({ length: 90 }).map((_, i) => {
                    const intensity = Math.random();
                    let bg = 'bg-white/5';
                    if (intensity > 0.8) bg = 'bg-brandPurple';
                    else if (intensity > 0.5) bg = 'bg-brandPurple/60';
                    else if (intensity > 0.3) bg = 'bg-brandPurple/30';
                    
                    return (
                      <div key={i} className={`w-3.5 h-3.5 rounded-sm ${bg} hover:border hover:border-white transition-all cursor-pointer`}></div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;