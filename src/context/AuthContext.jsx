import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../lib/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    try { const result = await authApi.me(); setUser(result.user || null); return result.user || null; }
    catch { setUser(null); return null; }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    reload();
    const handler = () => { setUser(null); setLoading(false); };
    window.addEventListener('mhflow:unauthorized', handler);
    return () => window.removeEventListener('mhflow:unauthorized', handler);
  }, [reload]);
  const value = useMemo(() => ({ user, loading, setUser, reload }), [user, loading, reload]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used inside AuthProvider'); return value; }
