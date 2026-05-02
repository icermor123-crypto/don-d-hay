'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

  return (
    <nav style={{ zIndex: 9999 }} className="bg-card py-2 pb-6 flex justify-around items-center border-t border-border flex-shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] relative">

      <Link href="/mapa" className="flex flex-col items-center gap-1 px-3 py-1">
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${isActive('/mapa') ? 'bg-[#F0EDE7]' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L3 9v11h5v-6h6v6h5V9L11 2z" stroke={isActive('/mapa') ? '#1C1C1A' : '#B0ADA6'} strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <span className={isActive('/mapa') ? 'nav-label-active' : 'nav-label'}>Mapa</span>
      </Link>

      <Link href="/lista" className="flex flex-col items-center gap-1 px-3 py-1">
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${isActive('/lista') ? 'bg-[#F0EDE7]' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 6h16M3 11h16M3 16h16" stroke={isActive('/lista') ? '#1C1C1A' : '#B0ADA6'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={isActive('/lista') ? 'nav-label-active' : 'nav-label'}>Lista</span>
      </Link>

      <Link href="/agregar" className="flex flex-col items-center gap-1 px-3 py-1" style={{ zIndex: 9999, position: 'relative' }}>
        <div style={{ zIndex: 9999, position: 'relative', marginTop: '-20px' }} className="w-11 h-11 bg-carbon rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(28,28,26,0.3)]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9h12" stroke="#F7F5F0" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="nav-label">Agregar</span>
      </Link>

      <Link href="/buscar" className="flex flex-col items-center gap-1 px-3 py-1">
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${isActive('/buscar') ? 'bg-[#F0EDE7]' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="12" cy="10" r="5" stroke={isActive('/buscar') ? '#1C1C1A' : '#B0ADA6'} strokeWidth="1.5"/>
            <path d="M3 19l5-5" stroke={isActive('/buscar') ? '#1C1C1A' : '#B0ADA6'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={isActive('/buscar') ? 'nav-label-active' : 'nav-label'}>Buscar</span>
      </Link>

      <Link href="/perfil" className="flex flex-col items-center gap-1 px-3 py-1">
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${isActive('/perfil') ? 'bg-[#F0EDE7]' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="8" r="4" stroke={isActive('/perfil') ? '#1C1C1A' : '#B0ADA6'} strokeWidth="1.5"/>
            <path d="M3 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5" stroke={isActive('/perfil') ? '#1C1C1A' : '#B0ADA6'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={isActive('/perfil') ? 'nav-label-active' : 'nav-label'}>Perfil</span>
      </Link>

    </nav>
  )
}