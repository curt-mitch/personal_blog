import Script from 'next/script'

export default function HtmxScript() {
  return (
    <>
      <Script src="https://unpkg.com/htmx.org@2.0.8" strategy="beforeInteractive" />
      <Script id="htmx-theme-handler" strategy="lazyOnload">
        {`
          if (typeof htmx !== 'undefined') {
            document.body.addEventListener('theme-changed', function(evt) {
              window.location.reload();
            });
          }
        `}
      </Script>
    </>
  )
}
