import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProBadge = () => (
  <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#A78BFA] to-[#F472B6] text-white rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
    PRO
  </span>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`relative border-l border-white/10 bg-[#0a0f2e]/50 backdrop-blur-xl flex flex-col hidden md:flex shrink-0 h-full transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-8 w-6 h-6 bg-[#0f0c32] border border-white/20 rounded-full flex items-center justify-center text-slate-50 hover:bg-brandPurple transition-colors z-50 shadow-lg"
      >
        {isCollapsed ? "◀" : "▶"}
      </button>

      <div
        className={`p-6 border-b border-white/10 flex items-center ${isCollapsed ? "justify-center px-0" : ""}`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-50 no-underline overflow-hidden"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-brandPurple to-brandViolet rounded-lg text-sm shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            ✦
          </div>
          {!isCollapsed && <span className="whitespace-nowrap">MH Flow</span>}
        </Link>
      </div>

      <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {!isCollapsed && (
          <div className="text-[10px] text-slate-50/40 mb-2 px-6">
            منوی اصلی
          </div>
        )}

        <div className="px-3 space-y-1">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
          >
            <span className="text-lg">📊</span>
            {!isCollapsed && <span>نمای کلی</span>}
          </Link>
          <Link
            to="/dashboard/tasks"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/tasks") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
          >
            <span className="text-lg">📋</span>
            {!isCollapsed && <span>وظایف من</span>}
          </Link>
          <Link
            to="/dashboard/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/profile") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
          >
            <span className="text-lg">👤</span>
            {!isCollapsed && <span>پروفایل من</span>}
          </Link>
          <div className="p-3">
            <Link
              to="/dashboard/settings"
              className={`flex items-center gap-3 px-3 py-2.5 text-slate-50/55 hover:text-slate-50 hover:bg-white/5 rounded-xl text-sm transition-colors ${isCollapsed ? "justify-center" : ""}`}
            >
              <span className="text-lg">⚙️</span>
              {!isCollapsed && <span>تنظیمات</span>}
            </Link>
          </div>
        </div>

        {!isCollapsed && (
          <div className="text-[10px] text-slate-50/40 mb-2 mt-6 px-6">
            ابزارهای هوشمند
          </div>
        )}
        <div className={`px-3 space-y-1 ${isCollapsed ? "mt-4" : ""}`}>
          <Link
            to="/dashboard/ai-planner"
            className={`flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/ai-planner") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : "justify-between"}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🤖</span>
              {!isCollapsed && <span>برنامه‌ریز AI</span>}
            </div>
            {!isCollapsed && <ProBadge />}
          </Link>
          <Link
            to="/dashboard/analytics"
            className={`flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/analytics") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : "justify-between"}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">📈</span>
              {!isCollapsed && <span>نمودار پیشرفته</span>}
            </div>
            {!isCollapsed && <ProBadge />}
          </Link>
        </div>
      </nav>

      <div className="p-3 mb-2">
        {isCollapsed ? (
          <div className="w-full aspect-square bg-gradient-to-br from-brandPurple/20 to-brandBlue/10 border border-brandPurple/30 rounded-xl flex items-center justify-center cursor-pointer hover:bg-brandPurple/30 transition-colors">
            👑
          </div>
        ) : (
          <div className="p-4 bg-gradient-to-br from-brandPurple/20 to-brandBlue/10 border border-brandPurple/30 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brandPurple/30 blur-2xl rounded-full"></div>
            <h4 className="text-sm font-bold mb-1 relative z-10">
              نسخه حرفه‌ای MH Flow
            </h4>
            <p className="text-[10px] text-slate-50/60 mb-3 relative z-10">
              دسترسی نامحدود به هوش مصنوعی و تحلیل‌ها.
            </p>
            <button className="w-full py-2 bg-gradient-to-br from-brandPurple to-brandViolet text-white text-xs font-bold rounded-lg relative z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 transition-all">
              مشاهده پلن‌ها
            </button>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10">
        <Link
          to="/login"
          className={`flex items-center gap-3 px-3 py-2.5 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-colors ${isCollapsed ? "justify-center" : ""}`}
        >
          <span className="text-lg">🚪</span>
          {!isCollapsed && <span>خروج</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
