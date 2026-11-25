const ACTIVITY_STORAGE_KEY = 'mhflow.activity.log.v1';
const MAX_ACTIVITY_ITEMS = 3000;

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const readActivityLog = () => {
  try {
    const value = safeParse(localStorage.getItem(ACTIVITY_STORAGE_KEY) || '[]', []);
    return Array.isArray(value)
      ? value.filter((item) => item && item.id && item.type && item.at)
      : [];
  } catch {
    return [];
  }
};

/**
 * Activity history for the current browser profile.
 * Do not put passwords, tokens, private descriptions, or other secrets here.
 */
export const trackActivity = (type, title, metadata = {}) => {
  if (!type || !title || typeof window === 'undefined') return false;

  try {
    const current = readActivityLog();
    const now = Date.now();

    // Avoid inflating the overview when React remounts the same route quickly.
    if (type === 'page_view') {
      const last = current[current.length - 1];
      const sameRoute = last?.type === type && last?.metadata?.path === metadata.path;
      const recent = last?.at && now - new Date(last.at).getTime() < 60_000;
      if (sameRoute && recent) return false;
    }

    const safeMetadata = {};
    if (metadata && typeof metadata === 'object') {
      for (const [key, value] of Object.entries(metadata)) {
        if (['path', 'date', 'time', 'category', 'status', 'source'].includes(key)) {
          if (typeof value === 'string' || typeof value === 'number') {
            safeMetadata[key] = value;
          }
        }
      }
    }

    const next = [
      ...current,
      {
        id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        type: String(type).slice(0, 40),
        title: String(title).trim().slice(0, 120),
        at: new Date(now).toISOString(),
        metadata: safeMetadata,
      },
    ].slice(-MAX_ACTIVITY_ITEMS);

    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('mhflow-activity-updated'));
    return true;
  } catch {
    return false;
  }
};

export const ACTIVITY_STORAGE = ACTIVITY_STORAGE_KEY;
