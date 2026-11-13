// Shared helpers for the quiz-book build and verification scripts.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
export const BOOK_DIR = path.join(ROOT, 'book');
export const CONTENT_DIR = path.join(BOOK_DIR, 'content');
export const OUTPUT_DIR = path.join(ROOT, 'output');

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** Converts ASCII digits to Persian (Extended Arabic-Indic) digits. */
export function fa(value) {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[d]);
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const LEVELS = {
  easy: 'آسان',
  medium: 'متوسط',
  hard: 'سخت',
};

/** Ordinal names used in chapter headings. */
export const FA_ORDINALS = ['', 'اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم'];

export function relPath(file) {
  return path.relative(ROOT, file);
}
