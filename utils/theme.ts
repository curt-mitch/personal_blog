import { cookies } from 'next/headers'

export const THEME_COOKIE_NAME = 'theme'
export type Theme = 'light' | 'dark' | 'system'

export function getTheme(): Theme {
  const cookieStore = cookies()
  const theme = cookieStore.get(THEME_COOKIE_NAME)?.value as Theme | undefined
  return theme || 'system'
}

export function setTheme(theme: Theme) {
  cookies().set(THEME_COOKIE_NAME, theme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
