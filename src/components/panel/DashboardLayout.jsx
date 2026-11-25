import React, { useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import PanelIcon from './PanelIcon';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
const mobileItems=[{to:'/dashboard',icon:'dashboard',label:'خانه'},{to:'/dashboard/tasks',icon:'tasks',label:'وظایف'},{to:'/dashboard/calendar',icon:'calendar',label:'تقویم'},{to:'/dashboard/workspace',icon:'workspace',label:'تیم'},{to:'/dashboard/settings',icon:'settings',label:'تنظیمات'}];
export default function DashboardLayout(){
 const {pathname}=useLocation(); const navigate=useNavigate(); const {user,loading,setUser}=useAuth(); const toast=useToast();
 const logout=async()=>{try{await authApi.logout();setUser(null);toast('از حساب خارج شدی.');navigate('/login',{replace:true});}catch(e){toast(e.message,'error');}};
 if(loading)return <div className="grid h-screen place-items-center bg-darkBg text-sm text-slate-300">در حال بررسی نشست کاربری...</div>;
 if(!user)return <Navigate to="/login" replace state={{from:pathname}}/>;
 return <div className="mh-workspace-shell flex h-[100dvh] w-full overflow-hidden bg-darkBg font-vazirmatn text-slate-50" dir="rtl">
  <Sidebar/>
  <main className="relative h-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto pb-20 md:pb-0"><header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[.06] bg-[#070a19]/75 px-4 py-2.5 backdrop-blur-xl md:px-7"><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-200">{pathname.split("/").filter(Boolean).slice(1).pop()?.replaceAll("-", " ") || "نمای کلی"}</p><p className="mt-0.5 hidden text-[10px] text-slate-500 sm:block">فضای کاری MH Flow</p></div><div className="flex items-center gap-2"><NotificationCenter/><Link to="/dashboard/profile" className="hidden max-w-[180px] truncate rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-200 no-underline sm:block">{user.displayName||user.email}</Link><button onClick={logout} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/5">خروج</button></div></header><Outlet/></main>
  <nav aria-label="ناوبری داشبورد موبایل" className="fixed inset-x-3 bottom-3 z-[60] grid grid-cols-5 rounded-2xl border border-white/15 bg-slate-950/75 p-2 shadow-[0_12px_40px_rgba(0,0,0,.4)] backdrop-blur-2xl md:hidden">{mobileItems.map(item=>{const active=pathname===item.to||(item.to!=='/dashboard'&&pathname.startsWith(`${item.to}/`));return <Link key={item.to} to={item.to} aria-current={active?'page':undefined} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] no-underline transition ${active?'bg-brandPurple/20 text-violet-200':'text-slate-200/55 hover:bg-white/5 hover:text-white'}`}><PanelIcon name={item.icon} size={18}/><span>{item.label}</span></Link>;})}</nav>
 </div>;
}
