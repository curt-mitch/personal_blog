'use client'

import { useState } from 'react'

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
}

// Code block with copy button
export default function Pre({ children, ...props }: PreProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const preElement = document.querySelector('pre code')
    if (preElement?.textContent) {
      await navigator.clipboard.writeText(preElement.textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  )
}
