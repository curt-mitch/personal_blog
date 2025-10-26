import Script from 'next/script'

interface AnalyticsProps {
  plausibleDataDomain?: string
}

export default function Analytics({ plausibleDataDomain }: AnalyticsProps) {
  if (!plausibleDataDomain) {
    return null
  }

  return (
    <Script
      defer
      data-domain={plausibleDataDomain}
      src="https://plausible.io/js/script.js"
    />
  )
}
