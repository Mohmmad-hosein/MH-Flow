import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import PanelIcon from './PanelIcon';

const panel = 'rounded-2xl border border-white/10 bg-[#11102f]/70 p-5 sm:p-6';
const fa = new Intl.NumberFormat('fa-IR');
const date = (value) => value ? new Date(value).toLocaleDateString('fa-IR', {year:'numeric',month:'long',day:'numeric'}) : '—';
export default function UserProfile() {
  const toast = useToast();
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({displayName:user?.displayName || '', email:user?.email || '', role:user?.role || 'user', createdAt:user?.createdAt || null});
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let alive = true;
    Promise.all([api('/settings/profile'), api('/tasks'), api('/projects'), api('/auth/sessions')])
      .then(([p,t,pr,se]) => {
        if (!alive) return;
        setProfile(p.profile);
        setTasks(t.tasks || []);
        setProjects(pr.projects || []);
        setSessions(se.sessions || []);
      })
      .catch((error) => toast(error.message, 'error'))
      .finally(() => { if (alive) setBusy(false); });
    return () => { alive = false; };
  }, []);
  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter(x => x.status === 'done').length,
    active: tasks.filter(x => x.status === 'in_progress').length,
    projects: projects.length,
  }), [tasks, projects]);
  const save = async (event) => {
    event.preventDefault(); setSaving(true);
    try {
      const result = await api('/settings/profile', {method:'PATCH', body:{displayName:profile.displayName.trim()}});
      setProfile(v => ({...v, ...result.profile}));
      setUser(v => v ? {...v, displayName:result.profile.displayName} : v);
      toast('پروفایل با موفقیت به‌روزرسانی شد.');
    } catch (error) { toast(error.message, 'error'); }
    finally { setSaving(false); }
  };
  return <section dir="rtl" className="min-h-full p-4 text-white sm:p-8">
    <div className="mx-auto max-w-6xl">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-bold text-violet-300">MH FLOW / ACCOUNT</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">پروفایل من</h1><p className="mt-2 text-sm text-slate-400">اطلاعات و فعالیت واقعی حساب کاربری</p></div>
        <Link to="/dashboard/settings" className="rounded-xl border border-white/10 px-4 py-3 text-xs text-slate-200 no-underline">تنظیمات حساب</Link>
      </header>
      <div className={`${panel} mb-5 flex flex-wrap items-center gap-4`}>
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-2xl font-black text-violet-200">{(profile.displayName || profile.email || 'MH').slice(0,1).toUpperCase()}</div>
        <div className="min-w-0 flex-1"><h2 className="truncate text-lg font-bold">{profile.displayName || 'کاربر MH Flow'}</h2><p className="mt-1 truncate text-xs text-slate-400">{profile.email}</p><p className="mt-2 text-[10px] text-slate-500">عضویت از {date(profile.createdAt)}</p></div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] text-emerald-300">{user?.accountStatus === 'banned' ? 'مسدود' : user?.accountStatus === 'suspended' ? 'معلق' : 'حساب فعال'}</span>
      </div>
      <form onSubmit={save} className={`${panel} mb-5`}>
        <h2 className="mb-4 font-bold">اطلاعات نمایشی</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs text-slate-400">نام نمایشی<input required minLength={2} maxLength={100} value={profile.displayName || ''} onChange={e=>setProfile(v=>({...v,displayName:e.target.value}))} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"/></label>
          <label className="text-xs text-slate-400">ایمیل<input disabled value={profile.email || ''} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-500"/></label>
        </div>
        <button disabled={saving} className="mt-4 rounded-xl bg-violet-500 px-5 py-3 text-xs font-bold disabled:opacity-50">{saving?'در حال ذخیره...':'ذخیره تغییرات'}</button>
      </form>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[["همه وظایف",stats.total,'tasks'],['تکمیل‌شده',stats.done,'check-circle'],['در حال انجام',stats.active,'clock'],['پروژه‌ها',stats.projects,'folder']].map(([label,value,icon])=><article key={label} className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-5"><div className="flex items-center justify-between"><span className="text-xs text-slate-400">{label}</span><PanelIcon name={icon} size={19}/></div><p className="mt-4 text-3xl font-black">{busy?'—':fa.format(value)}</p></article>)}
      </div>
      <section className={panel}><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">نشست‌های حساب</h2><Link to="/dashboard/settings" className="text-xs text-violet-300 no-underline">مدیریت امنیت</Link></div>
        {busy?<p className="py-5 text-center text-xs text-slate-400">در حال دریافت اطلاعات...</p>:sessions.slice(0,5).map(s=><div key={s.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 py-3 last:border-0"><div><p className="text-xs font-semibold">{s.device_label || 'دستگاه ناشناس'} {s.is_current && <span className="mr-2 text-emerald-300">· این دستگاه</span>}</p><p className="mt-1 text-[10px] text-slate-500">{s.ip_address || 'IP نامشخص'} · ورود {new Date(s.login_at).toLocaleString('fa-IR')}</p></div><span className={`text-[10px] ${s.is_current?'text-emerald-300':'text-slate-500'}`}>{s.is_current?'فعال':'ثبت‌شده'}</span></div>)}
        {!busy&&!sessions.length&&<p className="py-6 text-center text-xs text-slate-500">نشستی برای نمایش وجود ندارد.</p>}
      </section>
    </div>
  </section>;
}
