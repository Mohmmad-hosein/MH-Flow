const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1').replace(/\/$/, '');
// CSRF token stays in memory; the HttpOnly session cookie is managed by the browser.
let csrfToken = null;
let csrfPromise = null;

export class ApiError extends Error {
  constructor(message, status, code, payload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

export async function refreshCsrf() {
  if (!csrfPromise) {
    csrfPromise = fetch(`${API_BASE}/auth/csrf`, { credentials: 'include', cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.csrfToken) throw new ApiError(payload?.error?.message || 'دریافت توکن امنیتی ناموفق بود.', response.status, payload?.error?.code, payload);
        csrfToken = payload.csrfToken;
        return csrfToken;
      })
      .finally(() => { csrfPromise = null; });
  }
  return csrfPromise;
}

export async function api(path, options = {}, retry = true) {
  const method = (options.method || 'GET').toUpperCase();
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;
  if (options.body !== undefined && !isFormData && typeof options.body !== 'string' && !(options.body instanceof Blob)) {
    headers.set('Content-Type', 'application/json');
    options = { ...options, body: JSON.stringify(options.body) };
  }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    if (!csrfToken) await refreshCsrf();
    headers.set('X-CSRF-Token', csrfToken);
  }
  const response = await fetch(`${API_BASE}${path.startsWith('/') ? path : `/${path}`}`, {
    ...options, method, headers, credentials: 'include', cache: 'no-store'
  });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json().catch(() => ({})) : await response.blob();
  if (!response.ok) {
    const code = payload?.error?.code;
    if (response.status === 403 && code === 'CSRF_INVALID' && retry) {
      csrfToken = null;
      await refreshCsrf();
      return api(path, options, false);
    }
    if (response.status === 401 || ['ACCOUNT_BANNED', 'ACCOUNT_SUSPENDED', 'SESSION_REVOKED'].includes(code)) window.dispatchEvent(new CustomEvent('mhflow:unauthorized'));
    throw new ApiError(payload?.error?.message || `درخواست ناموفق بود (${response.status}).`, response.status, code, payload);
  }

  // Login/register regenerate the session id on the server. The server returns
  // a fresh token bound to that new session; never persist it in localStorage.
  if (typeof payload?.csrfToken === 'string') csrfToken = payload.csrfToken;
  if (method === 'POST' && /^\/auth\/logout\/?$/.test(path.startsWith('/') ? path : `/${path}`)) csrfToken = null;
  return payload;
}

export function apiUrl(path) {
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export const authApi = {
  me: () => api('/auth/me'),
  login: (body) => api('/auth/login', { method: 'POST', body }),
  register: (body) => api('/auth/register', { method: 'POST', body }),
  logout: () => api('/auth/logout', { method: 'POST', body: {} }),
  sessions: () => api('/auth/sessions'),
  revokeSession: (id) => api(`/auth/sessions/${id}`, { method: 'DELETE', body: {} }),
  revokeOtherSessions: () => api('/auth/sessions/others', { method: 'DELETE', body: {} }),
};
