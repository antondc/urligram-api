/**
 * Removes one or more trailing slashes from URL
 * @param {string} url
 */
export const removeTrailingSlash = (url: string): string => url.replace(/\/+$/, '');
