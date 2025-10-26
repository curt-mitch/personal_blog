import { NextRequest, NextResponse } from 'next/server'
import { THEME_COOKIE_NAME, type Theme } from '@/utils/theme'

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and form data
    const contentType = request.headers.get('content-type')
    let currentTheme: Theme

    if (contentType?.includes('application/json')) {
      const body = await request.json()
      currentTheme = body.currentTheme as Theme
    } else {
      // Handle form data from HTMX
      const formData = await request.formData()
      currentTheme = formData.get('currentTheme') as Theme
    }

    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark'

    const response = new NextResponse(JSON.stringify({ theme: newTheme }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'HX-Trigger': 'theme-changed',
      },
    })

    response.cookies.set(THEME_COOKIE_NAME, newTheme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch (error) {
    console.error('Theme toggle error:', error)
    return NextResponse.json({ error: 'Failed to toggle theme' }, { status: 500 })
  }
}
