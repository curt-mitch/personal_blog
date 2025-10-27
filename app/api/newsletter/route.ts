// Newsletter API stub - returns 501 Not Implemented
// Add actual newsletter provider integration when needed
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Newsletter not configured' }, { status: 501 })
}

export async function POST() {
  return NextResponse.json({ error: 'Newsletter not configured' }, { status: 501 })
}
