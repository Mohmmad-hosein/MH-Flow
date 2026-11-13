// Client-side UX filter only. The API/server must repeat validation and moderation.
const normalizeText = (value = '') => value
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[\u200B-\u200F\uFEFF\u0640]/g, '')
  .replace(/[يى]/g, 'ی').replace(/ك/g, 'ک')
  .replace(/[0]/g, 'o').replace(/[1!|]/g, 'i').replace(/[3]/g, 'e').replace(/[@4]/g, 'a').replace(/[5$]/g, 's')
  .replace(/[^\p{L}\p{N}\s]/gu, ' ')
  .replace(/\s+/g, ' ').trim();

const blockedTerms = [
  // Persian (common insults/profanity)
  'کس', 'کیر', 'کون', 'جنده', 'حرومزاده', 'بی شعور', 'بی شرف', 'گوه', 'ریدی', 'مادرجنده', 'لاشی', 'عن',
  // English
  'fuck', 'fucker', 'motherfucker', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dickhead',
  // Arabic / Spanish / French / German common profanity
  'شرموط', 'كس', 'كلب', 'قحبة', 'puta', 'mierda', 'joder', 'putain', 'merde', 'scheisse', 'arschloch'
];

const suspiciousPatterns = [
  /<\s*script\b/i, /javascript\s*:/i, /on\w+\s*=\s*['"`]/i,
  /\b(union\s+select|drop\s+table|insert\s+into|delete\s+from|update\s+\w+\s+set)\b/i,
  /\b(eval|exec)\s*\(/i, /document\s*\.\s*cookie/i, /window\s*\.\s*location/i,
  /(?:\.\.[/\\]){2,}/, /\b(?:powershell|cmd\.exe)\s+\//i
];

export function validateUserText(value, { min = 0, max = 3000 } = {}) {
  const raw = String(value ?? '').trim();
  const normalized = normalizeText(raw);
  if (raw.length < min) return `متن باید حداقل ${min} نویسه داشته باشد.`;
  if (raw.length > max) return `متن نباید بیشتر از ${max} نویسه باشد.`;
  if (suspiciousPatterns.some((pattern) => pattern.test(raw))) return 'متن شامل الگوی کد یا ورودی مشکوک است. لطفاً فقط مشکل را با زبان عادی توضیح دهید.';
  const padded = ` ${normalized} `;
  const found = blockedTerms.some((term) => padded.includes(` ${term} `));
  if (found) return 'لطفاً از واژه‌های توهین‌آمیز استفاده نکنید. گزارش را محترمانه و با توضیح فنی ثبت کنید.';
  return '';
}

export function cleanPlainText(value) {
  return String(value ?? '').normalize('NFKC').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
}
