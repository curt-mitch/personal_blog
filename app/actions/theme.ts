'use server'

import { cookies } from 'next/headers'
import { THEME_COOKIE_NAME, type Theme } from '@/utils/theme'

export async function toggleTheme(currentTheme: Theme) {
  const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark'

  cookies().set(THEME_COOKIE_NAME, newTheme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return newTheme
}
