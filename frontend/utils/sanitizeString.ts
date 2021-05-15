/**
 * Sanitizes a string by the following business rules:
 * 1. Converts all escaped unicode characters to their string equivalents
 * 2. Trims the ends of all strings
 * @public
 *
 * @param {string} str - The string to sanitize
 *
 * @returns {string} - The sanitized string
 */
export function sanitizeString(str: string): string;
export function sanitizeString(str: string[]): string[];
export function sanitizeString(str: string | string[]): string | string[] {
    // Sanitize the string if possible
    if (typeof str === 'string') {
        return window.decodeURIComponent(str).trim();
    }

    // Look through each string in the array and sanitize it
    return str.map(s => sanitizeString(s)) as string[];
}
