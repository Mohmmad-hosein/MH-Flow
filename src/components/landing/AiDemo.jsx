import React from 'react';
import { Link } from 'react-router-dom';

const AiDemo = () => {
  return (
    <section className="py-24 px-10 max-w-[1200px] mx-auto" id="ai-demo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        <div>
          <div className="inline-block px-3.5 py-1 bg-brandPurple/15 border border-brandPurple/25 rounded-full text-xs text-purple-300 mb-4 tracking-wide">
            برنامه‌ریزی هدف
          </div>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight mb-4">
            هدف خود را بگویید،<br />
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent">هدف را به گام‌های اجرایی تبدیل کن</span>
          </h2>
          <p className="text-base text-slate-50/55 mb-8">
            یک نمونه مسیر مرحله‌بندی‌شده برای رسیدن به هدف را ببینید و آن را در برنامه‌ریزی خود به‌کار بگیرید.
          </p>
          
          <div className="bg-[#0f0c32]/70 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-sm text-slate-50/55 mb-3">نمونه هدف برای برنامه‌ریزی:</div>
            <div className="w-full rounded-xl border border-brandPurple/20 bg-white/[.04] px-4 py-3.5 text-sm leading-7 text-slate-100/75">می‌خواهم مبانی React را طی ۸ هفته یاد بگیرم و یک پروژه واقعی بسازم.</div>
            <Link to="/dashboard/ai-planner" className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-brandPurple to-brandViolet py-3.5 text-sm font-semibold text-white no-underline shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]">
              ورود به برنامه‌ریز
            </Link>
          </div>
        </div>

        {/* نمونه مسیر برنامه‌ریزی */}
        <div className="bg-[#0f0c32]/70 border border-brandPurple/25 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold">نمونه مسیر پیشنهادی</span>
            <span className="text-[11px] px-2.5 py-1 bg-brandPurple/20 text-purple-300 rounded-full border border-brandPurple/30">
              نمونه نمایشی
            </span>
          </div>
          
          {/* مایلستون ها */}
          {[
            { week: 'هفته ۱–۲', title: 'پایه‌های JavaScript و ES6', tags: ['Arrow Functions', 'Destructuring', 'Promises'] },
            { week: 'هفته ۳–۴', title: 'مبانی React و Hooks', tags: ['useState', 'useEffect', 'Components'] },
            { week: 'هفته ۵–۸', title: 'پروژه واقعی + State Management', tags: ['Redux Toolkit', 'React Router', 'Final Project'] }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-2.5">
              <div className="text-[11px] text-[#A78BFA] mb-1 font-semibold">{item.week}</div>
              <div className="text-sm text-slate-50 mb-2">{item.title}</div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-brandPurple/10 border border-brandPurple/20 rounded-md text-slate-50/55">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default AiDemo;