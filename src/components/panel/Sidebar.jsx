import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import PanelIcon from "./PanelIcon";

const ProBadge = () => (
  <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#A78BFA] to-[#F472B6] text-white rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
    PRO
  </span>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const toast = useToast();
  const [loggingOut, setLoggingOut] = useState(false);
  const logout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try { await authApi.logout(); setUser(null); toast("با موفقیت از حساب خارج شدی."); navigate("/login", { replace: true }); }
    catch (error) { toast(error.message || "خروج از حساب انجام نشد.", "error"); }
    finally { setLoggingOut(false); }
  };

  const isActive = (path) => path === "/dashboard" ? location.pathname === path : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <aside
      className={`relative border-l border-white/10 bg-[#0a0f2e]/50 backdrop-blur-xl flex flex-col hidden md:flex shrink-0 h-full transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "باز کردن منو" : "جمع کردن منو"}
        title={isCollapsed ? "باز کردن منو" : "جمع کردن منو"}
        className="absolute -left-3 top-8 w-6 h-6 bg-[#0f0c32] border border-white/20 rounded-full flex items-center justify-center text-slate-50 hover:bg-brandPurple transition-colors z-50 shadow-lg"
      >
        <PanelIcon name={isCollapsed ? "chevronLeft" : "chevronRight"} size={15} />
      </button>

      <div
        className={`p-6 border-b border-white/10 flex items-center ${isCollapsed ? "justify-center px-0" : ""}`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-50 no-underline overflow-hidden"
        >
          <img src="/mh-flow-mark.png" alt="MH Flow" width="36" height="30" className="w-9 h-8 object-contain shrink-0" decoding="async" />
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
            <PanelIcon name="dashboard" size={19} />
            {!isCollapsed && <span>نمای کلی</span>}
          </Link>
          <Link
            to="/dashboard/tasks"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/tasks") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
          >
            <PanelIcon name="tasks" size={19} />
            {!isCollapsed && <span>وظایف من</span>}
          </Link>
          <Link to="/dashboard/projects" title={isCollapsed ? "پروژه‌ها" : undefined} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/projects") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}><PanelIcon name="folder" size={19}/>{!isCollapsed && <span>پروژه‌ها</span>}</Link>
          <Link
            to="/dashboard/calendar"
            title={isCollapsed ? "تقویم" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/calendar") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
          >
            <PanelIcon name="calendar" size={19} />
            {!isCollapsed && <span>تقویم</span>}
          </Link>
          <Link
            to="/dashboard/profile"
            title={isCollapsed ? "پروفایل من" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/profile") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
          >
            <PanelIcon name="user" size={19} />
            {!isCollapsed && <span>پروفایل من</span>}
          </Link>
          <div className="p-3">
            <Link
              to="/dashboard/settings"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors border ${isActive("/dashboard/settings") ? "bg-brandPurple/15 text-brandPurple font-semibold border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border-transparent"} ${isCollapsed ? "justify-center" : ""}`}
            >
              <PanelIcon name="settings" size={19} />
              {!isCollapsed && <span>تنظیمات</span>}
            </Link>
          </div>
        </div>

        {!isCollapsed && (
          <div className="text-[10px] text-slate-50/40 mb-2 mt-6 px-6">همکاری تیمی</div>
        )}
        <div className="px-3 space-y-1">
          <Link to="/dashboard/workspace" title={isCollapsed ? "فضای کاری تیم" : undefined} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/workspace") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}>
            <PanelIcon name="workspace" size={19}/>{!isCollapsed && <><span>فضای کاری تیم</span><span className="mr-auto rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-300">Team</span></>}
          </Link>
          <Link to="/dashboard/team-chat" title={isCollapsed ? "گفت‌وگوی تیمی" : undefined} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/team-chat") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : ""}`}>
            <PanelIcon name="chat" size={19}/>{!isCollapsed && <><span>گفت‌وگوی تیمی</span><span className="mr-auto rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-300">Team</span></>}
          </Link>
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
              <PanelIcon name="ai" size={19} />
              {!isCollapsed && <span>برنامه‌ریز AI</span>}
            </div>
            {!isCollapsed && <ProBadge />}
          </Link>
          <Link
            to="/dashboard/analytics"
            className={`flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive("/dashboard/analytics") ? "bg-brandPurple/15 text-brandPurple font-semibold border border-brandPurple/30" : "text-slate-50/55 hover:text-slate-50 hover:bg-white/5 border border-transparent"} ${isCollapsed ? "justify-center" : "justify-between"}`}
          >
            <div className="flex items-center gap-3">
              <PanelIcon name="analytics" size={19} />
              {!isCollapsed && <span>نمودار پیشرفته</span>}
            </div>
            {!isCollapsed && <ProBadge />}
          </Link>
        </div>
      </nav>

      <div className="p-3 mb-2">
        {isCollapsed ? (
          <div className="w-full aspect-square bg-gradient-to-br from-brandPurple/10 to-brandBlue/5 border border-white/10 rounded-xl flex items-center justify-center">
            <img src="/mh-flow-mark.png" alt="MH Flow" width="38" height="28" className="w-10 h-8 object-contain" loading="lazy" decoding="async" />
          </div>
        ) : (
          <div className="p-4 bg-gradient-to-br from-brandPurple/20 to-brandBlue/10 border border-brandPurple/30 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-brandPurple/20 blur-xl rounded-full" aria-hidden="true"></div>
            <h4 className="text-sm font-bold mb-1 relative z-10">
              نسخه حرفه‌ای MH Flow
            </h4>
            <p className="text-[10px] text-slate-50/60 mb-3 relative z-10">
              دسترسی نامحدود به هوش مصنوعی و تحلیل‌ها.
            </p>
            <Link to="/#pricing" className="block w-full py-2 bg-gradient-to-br from-brandPurple to-brandViolet text-center text-white text-xs font-bold rounded-lg relative z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 transition-all no-underline">
              مشاهده پلن‌ها
            </Link>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10">
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-colors disabled:opacity-50 ${isCollapsed ? "justify-center" : ""}`}
        >
          <PanelIcon name="logout" size={19} />
          {!isCollapsed && <span>{loggingOut ? "در حال خروج..." : "خروج"}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
