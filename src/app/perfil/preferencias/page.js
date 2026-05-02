'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'

export default function PreferenciasPage() {
  const [notifPrecios, setNotifPrecios] = useState(true)
  const [notifNuevos, setNotifNuevos] = useState(true)
  const [notifReportes, setNotifReportes] = useState(false)

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-carbon' : 'bg-beige-dark'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-6' : 'left-1'}`} />
    </button>
  )

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />
      <div className="px-5 pb-4 bg-cream flex-shrink-0 border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/perfil" className="w-9 h-9 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L5 7l4 5" stroke="#1C1C1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <h1 className="font-serif text-xl font-bold text-carbon">Preferencias</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 flex flex-col gap-4">
        <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium">Notificaciones</p>

        {[
          { label: 'Actualizaciones de precios', sub: 'Cuando un negocio guardado actualiza precios', value: notifPrecios, onChange: setNotifPrecios },
          { label: 'Negocios nuevos cerca de ti', sub: 'Cuando hay negocios nuevos en tu zona', value: notifNuevos, onChange: setNotifNuevos },
          { label: 'Mis reportes confirmados', sub: 'Cuando otros usuarios confirman tus reportes', value: notifReportes, onChange: setNotifReportes },
        ].map(({ label, sub, value, onChange }) => (
          <div key={label} className="bg-card rounded-2xl px-4 py-3.5 border border-border flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-[13px] font-medium text-carbon">{label}</p>
              <p className="text-[11px] text-muted font-light">{sub}</p>
            </div>
            <Toggle value={value} onChange={onChange} />
          </div>
        ))}

        <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium mt-2">Privacidad</p>

        <div className="bg-card rounded-2xl px-4 py-3.5 border border-border">
          <p className="text-[13px] font-medium text-carbon mb-1">Mis reportes son</p>
          <div className="flex gap-2 mt-2">
            {['Públicos', 'Anónimos'].map(op => (
              <button key={op} className={`flex-1 py-2 rounded-xl text-[12px] font-medium border transition-all ${op === 'Públicos' ? 'bg-carbon text-cream border-carbon' : 'bg-beige text-stone border-transparent'}`}>{op}</button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl px-4 py-3.5 border border-border">
          <p className="text-[13px] font-medium text-carbon mb-1">Datos y privacidad</p>
          <p className="text-[11px] text-muted font-light leading-relaxed">Don D. Hay no comparte tus datos con terceros. Solo usamos tu información para personalizar tu experiencia en la app.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
