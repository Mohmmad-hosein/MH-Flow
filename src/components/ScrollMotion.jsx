import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function chooseMotion() {
  let config = { mode: 'auto', scroll: true };
  try { const saved = localStorage.getItem('mhflow.motion.settings'); if (saved) config = { ...config, ...JSON.parse(saved) }; } catch { /* Keep safe defaults if local settings are malformed. */ }
  if (config.mode === 'off' || config.scroll === false) return 'off';
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'reduced';
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  if (config.mode === 'reduced' || (config.mode === 'auto' && (cores <= 4 || memory <= 4 || window.innerWidth < 640))) return 'reduced';
  return 'full';
}
export default function ScrollMotion() {
  const { user, loading } = useAuth();
  useEffect(() => {
    let observer;
    let mutation;
    const apply = () => {
      document.documentElement.dataset.motion = chooseMotion();
      if (observer) observer.disconnect();
      if (mutation) mutation.disconnect();
      if (document.documentElement.dataset.motion === 'off') {
        document.querySelectorAll('[data-mh-reveal]').forEach((el) => el.classList.add('mh-revealed'));
        return;
      }
      const selector = '.mh-workspace-shell main section, .mh-workspace-shell main article, .mh-workspace-shell main header, .mh-workspace-shell main .mh-motion-card';
      const attach = (root = document) => root.querySelectorAll?.(selector).forEach((el) => {
        if (el.dataset.revealBound) return;
        el.dataset.revealBound = '1'; el.dataset.mhReveal = 'true';
        if (document.documentElement.dataset.motion !== 'reduced') el.classList.add('mh-reveal-pending');
        if (observer) observer.observe(el); else el.classList.add('mh-revealed');
      });
      observer = typeof window.IntersectionObserver === 'function' ? new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('mh-revealed'); observer.unobserve(entry.target); }
      }), { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }) : null;
      attach();
      mutation = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => { if (node.nodeType === 1) { if (node.matches?.(selector)) attach(node.parentNode || document); else attach(node); } })));
      mutation.observe(document.body, { childList: true, subtree: true });
    };
    apply();
    // Pull the signed-in account's animation preferences from the backend.
    let active = true;
    if (user && !loading) api('/settings').then(({ settings }) => {
      if (!active || !settings) return;
      const remote = { mode: settings.preferences?.animationMode || 'auto', scroll: settings.preferences?.scrollAnimations !== false };
      localStorage.setItem('mhflow.motion.settings', JSON.stringify(remote));
      apply();
    }).catch(() => { /* Guest pages keep adaptive device defaults. */ });
    const onSettings = () => apply();
    window.addEventListener('mhflow:motion-settings', onSettings);
    return () => { active = false; observer?.disconnect(); mutation?.disconnect(); window.removeEventListener('mhflow:motion-settings', onSettings); };
  }, [user, loading]);
  return null;
}
