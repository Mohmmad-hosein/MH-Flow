import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const toast = useCallback((message, type = 'success', duration = 3600) => {
    const id = `${Date.now()}-${Math.random()}`;
    setItems((current) => [...current, { id, message, type }].slice(-4));
    window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), duration);
  }, []);
  const value = useMemo(() => ({ toast }), [toast]);
  return <ToastContext.Provider value={value}>{children}<div className="mh-toast-stack" aria-live="polite" aria-relevant="additions text">
    {items.map((item) => <div key={item.id} role="status" className={`mh-toast mh-toast-${item.type}`}><span className="mh-toast-mark">{item.type === 'success' ? '✓' : item.type === 'error' ? '!' : 'i'}</span><span>{item.message}</span><button type="button" aria-label="بستن اعلان" onClick={() => setItems((current) => current.filter((x) => x.id !== item.id))}>×</button></div>)}
  </div></ToastContext.Provider>;
}
export function useToast() { const value = useContext(ToastContext); if (!value) throw new Error('useToast must be used inside ToastProvider'); return value.toast; }
