import { ReactNode } from 'react'

interface BleedProps {
  children: ReactNode
  full?: boolean
}

// Full-bleed container that breaks out of content width
export default function Bleed({ children, full = false }: BleedProps) {
  return (
    <div
      className={full ? 'relative left-1/2 right-1/2 -mx-[50vw] w-screen' : 'w-full'}
    >
      {children}
    </div>
  )
}
