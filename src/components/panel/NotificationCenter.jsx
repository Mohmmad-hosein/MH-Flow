import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../lib/api';

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [busy, setBusy] = useState(false);
  const root = useRef(null);
  async function load() {
    setBusy(true);
    try { const data = await api('/notifications'); setItems(data.notifications || []); setUnread(data.unreadCount || 0); }
    catch (error) { console.error('notifications:', error); }
    finally { setBusy(false); }
  }
  useEffect(() => { load(); const timer = window.setInterval(load, 60000); return () => window.clearInterval(timer); }, []);
  useEffect(() => {
    const close = (event) => { if (root.current && !root.current.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close); return () => document.removeEventListener('pointerdown', close);
  }, []);
  async function markRead(item) {
    if (!item.read_at) {
      try { await api(`/notifications/${item.id}/read`, { method: 'PATCH', body: {} }); setItems((old) => old.map((x) => x.id === item.id ? { ...x, read_at: new Date().toISOString() } : x)); setUnread((n) => Math.max(0, n - 1)); }
      catch (error) { console.error(error); }
    }
  }
  async function markAll() {
    try { await api('/notifications/read-all', { method: 'POST', body: {} }); setItems((old) => old.map((x) => ({ ...x, read_at: x.read_at || new Date().toISOString() }))); setUnread(0); }
    catch (error) { console.error(error); }
  }
  return <div className="relative" ref={root}>
    <button type="button" onClick={() => { setOpen((v) => !v); if (!open) load(); }} aria-label="اعلان‌ها" aria-expanded={open} className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-slate-200 transition hover:bg-white/10">
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {unread > 0 && <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-fuchsia-500 px-1 text-center text-[10px] leading-[18px] text-white">{unread > 9 ? '9+' : unread}</span>}
    </button>
    {open && <section className="absolute left-0 top-12 z-[90] w-[min(90vw,360px)] overflow-hidden rounded-2xl border border-white/10 bg-[#11152a] shadow-2xl shadow-black/50" dir="rtl">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div><p className="text-sm font-bold text-white">اعلان‌ها</p><p className="mt-0.5 text-[11px] text-slate-400">{unread} اعلان خوانده‌نشده</p></div><button onClick={markAll} disabled={!unread} className="text-[11px] text-violet-300 disabled:opacity-40">خواندن همه</button></header>
      <div className="max-h-[360px] overflow-y-auto">{busy && !items.length ? <p className="p-5 text-center text-xs text-slate-400">در حال دریافت...</p> : items.length ? items.map((item) => <button key={item.id} onClick={() => markRead(item)} className={`block w-full border-b border-white/[.06] px-4 py-3 text-right transition hover:bg-white/[.05] ${item.read_at ? 'opacity-65' : 'bg-violet-500/[.07]'}`}><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-violet-400"/><strong className="text-xs text-slate-100">{item.title}</strong></span><span className="mt-1 block text-[11px] leading-5 text-slate-400">{item.body}</span><time className="mt-1 block text-[10px] text-slate-500">{new Date(item.created_at).toLocaleString('fa-IR')}</time></button>) : <p className="p-6 text-center text-xs text-slate-400">فعلاً اعلانی نداری.</p>}</div>
    </section>}
  </div>;
}
