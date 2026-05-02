import './globals.css'

export const metadata = {
  title: 'Don D. Hay',
  description: 'Precios reales, negocios verificados. Todo en un mapa.',
  manifest: '/manifest.json',
  themeColor: '#1C1C1A',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Don D. Hay' },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1C1C1A" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="h-screen overflow-hidden bg-[#111111] flex items-center justify-center">
        <div className="w-full h-full md:w-[390px] md:h-[844px] md:rounded-[48px] md:overflow-hidden md:shadow-[0_40px_120px_rgba(0,0,0,0.6)] relative flex flex-col overflow-hidden">
          {children}
        </div>
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
            })
          }
        `}} />
      </body>
    </html>
  )
}
