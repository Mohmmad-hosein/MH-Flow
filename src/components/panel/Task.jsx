import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// -----------------------------------------------------------
// دیتای تستی برای وظایف
// -----------------------------------------------------------
const initialTasks = [
  { id: 1, title: 'طراحی دیتابیس کاربران', desc: 'ایجاد شمای اولیه برای ثبت‌نام و ورود', status: 'todo', tag: 'توسعه 💻', priority: 'high', date: 'امروز' },
  { id: 2, title: 'یادگیری هوک‌های React', desc: 'مطالعه مستندات useEffect و useState', status: 'todo', tag: '✦ برنامه AI', priority: 'medium', date: 'فردا' },
  { id: 3, title: 'جلسه با تیم مارکتینگ', desc: 'بررسی کمپین فروش پاییزه', status: 'in-progress', tag: 'جلسه 👥', priority: 'high', date: 'امروز ۱۶:۰۰' },
  { id: 4, title: 'طراحی UI داشبورد', desc: 'تکمیل حالت دارک مود و افکت‌های شیشه‌ای', status: 'done', tag: 'طراحی 🎨', priority: 'low', date: 'دیروز' },
];

const ProBadge = () => (
  <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#A78BFA] to-[#F472B6] text-white rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
    PRO
  </span>
);

const Tasks = () => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); 

  const getTasksByStatus = (status) => initialTasks.filter(task => task.status === status);

  return (
    <div className="h-screen w-full bg-darkBg flex text-slate-50 overflow-hidden font-vazirmatn" dir="rtl">
      

      {/* ناحیه محتوا */}
      <main className="flex-1 h-full overflow-y-hidden overflow-x-hidden relative">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brandPurple/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* هدر */}
        <header className="flex justify-between items-center p-8 pb-4 relative z-50">
          <div>
            <h1 className="text-[1.75rem] font-bold mb-1">مدیریت وظایف</h1>
            <p className="text-sm text-slate-50/50">وظایف خود را بکشید و رها کنید (Drag & Drop)</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-brandPurple to-brandViolet text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 transition-all">
              <span>+</span> وظیفه جدید
            </button>

            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors relative border ${showNotifs ? 'bg-brandPurple/20 text-brandPurple border-brandPurple/50' : 'bg-white/5 border-white/10 text-slate-50/70 hover:text-white'}`}
            >
              🔔
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-brandPink rounded-full"></span>
            </button>

            <Link to="/dashboard/profile" className="w-11 h-11 rounded-full bg-gradient-to-br from-brandBlue to-brandPurple p-[2px] cursor-pointer">
              <div className="w-full h-full bg-darkBg rounded-full border border-white/20 flex items-center justify-center text-sm">👤</div>
            </Link>
          </div>
        </header>

        <div className="px-8 mb-6 relative z-10 flex gap-2 border-b border-white/5 pb-4">
          <button onClick={() => setActiveTab('all')} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'all' ? 'bg-white/10 text-white font-semibold' : 'text-slate-50/50 hover:text-slate-50'}`}>همه تسک‌ها</button>
          <button onClick={() => setActiveTab('today')} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'today' ? 'bg-white/10 text-white font-semibold' : 'text-slate-50/50 hover:text-slate-50'}`}>امروز</button>
          <button onClick={() => setActiveTab('ai')} className={`px-4 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${activeTab === 'ai' ? 'bg-brandPurple/20 text-brandPurple font-semibold' : 'text-slate-50/50 hover:text-brandPurple'}`}>
            <span>✦</span> برنامه‌های AI
          </button>
        </div>

        <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 items-start">
          
          <div className="bg-[#0f0c32]/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                در انتظار (To Do)
              </h3>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{getTasksByStatus('todo').length}</span>
            </div>
            
            {getTasksByStatus('todo').map(task => (
              <div key={task.id} className="bg-[#1a1642]/80 border border-white/10 hover:border-brandPurple/50 rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] group">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] px-2 py-1 rounded-md border ${task.tag.includes('AI') ? 'bg-brandPurple/10 border-brandPurple/30 text-purple-300' : 'bg-white/5 border-white/10 text-slate-50/70'}`}>
                    {task.tag}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                </div>
                <h4 className="font-bold text-sm mb-1 group-hover:text-brandPurple transition-colors">{task.title}</h4>
                <p className="text-xs text-slate-50/50 mb-4 line-clamp-2">{task.desc}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-50/40 border-t border-white/5 pt-3">
                  <span>📅 {task.date}</span>
                  <div className="w-6 h-6 rounded-full bg-darkBg border border-white/20 flex items-center justify-center text-[8px]">👤</div>
                </div>
              </div>
            ))}
           
            <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-sm text-slate-50/50 hover:bg-white/5 hover:text-white transition-colors">
              + تسک جدید
            </button>
          </div>

          <div className="bg-[#0f0c32]/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brandBlue"></span>
                در حال انجام (In Progress)
              </h3>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{getTasksByStatus('in-progress').length}</span>
            </div>
            
            {getTasksByStatus('in-progress').map(task => (
              <div key={task.id} className="bg-[#1a1642]/80 border border-white/10 hover:border-brandBlue/50 rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] px-2 py-1 rounded-md border bg-white/5 border-white/10 text-slate-50/70">{task.tag}</span>
                  <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                </div>
                <h4 className="font-bold text-sm mb-1 group-hover:text-brandBlue transition-colors">{task.title}</h4>
                <p className="text-xs text-slate-50/50 mb-4 line-clamp-2">{task.desc}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-50/40 border-t border-white/5 pt-3">
                  <span>📅 {task.date}</span>
                  <div className="w-6 h-6 rounded-full bg-darkBg border border-white/20 flex items-center justify-center text-[8px]">👤</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0f0c32]/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                تکمیل شده (Done)
              </h3>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{getTasksByStatus('done').length}</span>
            </div>
            
            {getTasksByStatus('done').map(task => (
              <div key={task.id} className="bg-[#1a1642]/40 border border-white/5 rounded-xl p-4 cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] px-2 py-1 rounded-md border bg-white/5 border-white/10 text-slate-50/50">{task.tag}</span>
                </div>
                <h4 className="font-bold text-sm mb-1 line-through text-slate-50/60">{task.title}</h4>
                <p className="text-xs text-slate-50/40 mb-4 line-clamp-2">{task.desc}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-50/40 border-t border-white/5 pt-3">
                  <span className="text-green-400">✓ انجام شد</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Tasks;