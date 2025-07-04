import { cookies } from 'next/headers';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
}

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60, // 24 hours
  path: '/',
};

// Server-side cookie utilities
export async function setCookie(name: string, value: string, options: CookieOptions = COOKIE_OPTIONS) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// Client-side cookie utilities
export function setClientCookie(name: string, value: string, options: CookieOptions = COOKIE_OPTIONS) {
  const cookieString = `${name}=${value}; path=${options.path || '/'}; max-age=${options.maxAge || 24 * 60 * 60}; ${options.httpOnly ? 'HttpOnly;' : ''} ${options.secure ? 'Secure;' : ''} SameSite=${options.sameSite || 'strict'}`;
  document.cookie = cookieString;
}

export function getClientCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

export function deleteClientCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
} 