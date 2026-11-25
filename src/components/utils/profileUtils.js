/**
 * Local profile storage helpers for MH Flow.
 *
 * IMPORTANT:
 * This is a browser-local implementation. It does not guarantee globally
 * unique usernames. The backend must enforce username uniqueness before
 * usernames are used as identities in team chat or mentions.
 */

export const PROFILE_STORAGE_KEY = 'mhflow.profile.public.v1';

const DEFAULT_PROFILE = Object.freeze({
  username: 'mh_user',
  bio: '',
});

const RESERVED_USERNAMES = new Set([
  'admin',
  'administrator',
  'support',
  'help',
  'mhflow',
  'root',
  'system',
  'moderator',
  'api',
  'security',
]);

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

/** Normalize a username typed by the user. */
export const normalizeUsername = (value) => {
  return String(value ?? '')
    .trim()
    .replace(/^@+/, '')
    .toLowerCase();
};

/**
 * Validate a username.
 * Returns { valid, value, error } so the UI can display a Persian message.
 */
export const validateUsername = (value) => {
  const username = normalizeUsername(value);

  if (username.length < 3 || username.length > 20) {
    return {
      valid: false,
      value: username,
      error: 'شناسه باید بین ۳ تا ۲۰ کاراکتر باشد.',
    };
  }

  if (!/^[a-z0-9][a-z0-9._]*$/.test(username)) {
    return {
      valid: false,
      value: username,
      error: 'شناسه فقط می‌تواند شامل حروف انگلیسی، عدد، نقطه و زیرخط باشد و باید با حرف یا عدد شروع شود.',
    };
  }

  if (username.endsWith('.') || username.endsWith('_') || username.includes('..')) {
    return {
      valid: false,
      value: username,
      error: 'نقطه یا زیرخط نباید در انتهای شناسه باشد و دو نقطه پشت‌سرهم مجاز نیست.',
    };
  }

  if (RESERVED_USERNAMES.has(username)) {
    return {
      valid: false,
      value: username,
      error: 'این شناسه قابل استفاده نیست. شناسه دیگری انتخاب کن.',
    };
  }

  return { valid: true, value: username, error: '' };
};

/** Read the local public profile. Falls back safely when storage is empty. */
export const readPublicProfile = () => {
  if (!isBrowser()) return { ...DEFAULT_PROFILE };

  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { ...DEFAULT_PROFILE };
    }

    return {
      ...DEFAULT_PROFILE,
      username: typeof parsed.username === 'string'
        ? normalizeUsername(parsed.username) || DEFAULT_PROFILE.username
        : DEFAULT_PROFILE.username,
      bio: typeof parsed.bio === 'string' ? parsed.bio.slice(0, 240) : '',
      displayName: typeof parsed.displayName === 'string' ? parsed.displayName.slice(0, 80) : undefined,
      avatar: typeof parsed.avatar === 'string' ? parsed.avatar.slice(0, 2048) : undefined,
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};

/** Save a public profile to this browser. Returns false on storage failure. */
export const savePublicProfile = (profile) => {
  if (!isBrowser() || !profile || typeof profile !== 'object') return false;

  try {
    const current = readPublicProfile();
    const next = {
      ...current,
      ...profile,
      username: normalizeUsername(profile.username ?? current.username),
      bio: typeof profile.bio === 'string' ? profile.bio.slice(0, 240) : current.bio,
    };

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('mhflow-profile-updated'));
    return true;
  } catch {
    return false;
  }
};

/** Copy the current user's public handle. Returns a success boolean. */
export const copyUsername = async (username) => {
  const clean = normalizeUsername(username);
  if (!clean || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(`@${clean}`);
    return true;
  } catch {
    return false;
  }
};
