'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'
import { negocios } from '@/data/negocios'

const FILTROS = ['Todos', 'Restaurantes', 'Tiendas', 'Verificados']

export default function MapaPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [negocioActivo, setNegocioActivo] = useState(negocios[0])
  const [cardVisible, setCardVisible] = useState(true)

  const negociosFiltrados = negocios.filter(n => {
    if (filtro === 'Restaurantes') return n.tipo === 'restaurante'
    if (filtro === 'Tiendas') return n.tipo === 'tienda'
    if (filtro === 'Verificados') return n.verificado
    return true
  })

  const scoreColor = (s) => s >= 8 ? 'text-forest bg-[#E4F0E8]' : s >= 6 ? 'text-[#C87A0F] bg-[#FEF3E8]' : 'text-rust bg-[#FDEBD8]'

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />

      <div className="px-5 pb-3 bg-cream flex-shrink-0">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="font-serif text-[22px] font-bold text-carbon leading-none">D<span className="text-sm opacity-25">•</span>H</div>
            <div className="text-[9px] tracking-[3px] uppercase text-muted font-light mt-0.5">Don D. Hay</div>
          </div>
          <Link href="/notificaciones" className="w-10 h-10 rounded-full bg-beige flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a4.5 4.5 0 0 1 4.5 4.5v2.25L15 11H3l1.5-2.25V6.5A4.5 4.5 0 0 1 9 2z" stroke="#5C5A55" strokeWidth="1.3" fill="none"/>
              <path d="M7.25 13.5a1.75 1.75 0 0 0 3.5 0" stroke="#5C5A55" strokeWidth="1.3" fill="none"/>
            </svg>
          </Link>
        </div>

        <Link href="/buscar" className="bg-beige rounded-full px-4 py-3 flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#9C9A95" strokeWidth="1.4"/>
            <path d="M11 11l3 3" stroke="#9C9A95" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span className="text-[13px] text-muted font-light flex-1">Buscar producto o negocio...</span>
        </Link>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTROS.map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`chip ${filtro === f ? 'chip-active' : 'chip-inactive'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-map-bg" onClick={e => { if (e.target === e.currentTarget) setCardVisible(false) }}>
        <svg width="100%" height="100%" viewBox="0 0 390 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
          <rect width="390" height="400" fill="#EAE6DC"/>
          {[65,130,195,260,325].map(y => <rect key={y} x="0" y={y} width="390" height="2.5" fill="#D8D4C8" opacity="0.8"/>)}
          {[65,130,195,260,325].map(x => <rect key={x} x={x} y="0" width="2.5" height="400" fill="#D8D4C8" opacity="0.8"/>)}
          {[[12,72,48,50],[72,68,52,56],[140,74,48,46],[202,70,52,54],[268,72,46,50],[330,68,50,56],[10,136,50,52],[74,134,48,56],[138,136,52,50],[204,134,48,56],[268,136,50,52],[330,134,48,56],[12,200,48,54],[74,200,50,52],[140,200,48,54],[204,200,50,52],[268,200,48,54],[332,200,46,52],[10,266,52,48],[74,266,48,52],[140,266,52,48],[204,266,48,52],[268,266,50,48],[330,266,48,52]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#D4CEB8" stroke="#C8C2AA" strokeWidth="0.5"/>
          ))}
        </svg>

        <div className="absolute w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_0_6px_rgba(74,144,217,0.15)]" style={{ left: 195, top: 220, transform: 'translate(-50%,-50%)' }} />

        {negociosFiltrados.map(n => (
          <button key={n.id} onClick={() => { setNegocioActivo(n); setCardVisible(true) }}
            className="absolute flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
            style={{ left: n.lat, top: n.lng, transform: 'translate(-50%, -100%)' }}>
            <div className={`rounded-2xl px-3 py-1.5 text-[11px] font-medium shadow-md whitespace-nowrap ${n.verificado ? 'bg-carbon text-gold' : n.tipo === 'restaurante' ? 'bg-card text-carbon border border-beige-dark border-t-2 border-t-rust' : 'bg-card text-carbon border border-beige-dark border-t-2 border-t-forest'}`}>
              {n.verificado ? '★' : n.tipo === 'restaurante' ? '🍽' : '🛒'} ${n.precios[0].precio.toFixed(2)}
            </div>
            <div className={`w-1.5 h-1.5 rounded-full mt-1 ${n.verificado ? 'bg-carbon' : n.tipo === 'restaurante' ? 'bg-rust' : 'bg-forest'}`} />
          </button>
        ))}

        <div className="absolute top-3 right-3 bg-card rounded-xl px-3 py-2 flex flex-col gap-1.5 border border-border shadow-sm">
          {[{ color: 'bg-rust', label: 'Restaurante' }, { color: 'bg-forest', label: 'Tienda' }, { color: 'bg-carbon', label: 'Verificado' }].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-[10px] text-stone">{label}</span>
            </div>
          ))}
        </div>

        {negocioActivo && (
          <div className={`absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl px-5 pb-5 z-30 border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.06)] transition-transform duration-300 ${cardVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="w-9 h-1 bg-beige-dark rounded-full mx-auto mt-3 mb-4" />
            <div className="flex justify-between items-start mb-1">
              <div>
                <Link href={`/negocio/${negocioActivo.id}`}>
                  <h3 className="font-serif text-lg text-carbon">{negocioActivo.nombre}</h3>
                </Link>
                <p className="text-xs text-muted font-light mb-3">{negocioActivo.tipo === 'restaurante' ? 'Restaurante' : 'Tienda'} · {negocioActivo.municipio}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-sm font-bold font-serif px-2 py-0.5 rounded-lg ${scoreColor(negocioActivo.puntuacion)}`}>{negocioActivo.puntuacion}/10</span>
                {negocioActivo.verificado && <span className="bg-beige text-stone text-[10px] px-2.5 py-1 rounded-full font-medium">✓ Verificado</span>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {negocioActivo.precios.slice(0,3).map(p => (
                <div key={p.nombre} className="bg-beige rounded-xl px-3 py-1.5 text-[11px] text-stone">
                  {p.nombre} <b className="text-carbon font-medium">${p.precio.toFixed(2)}</b>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-pale font-light">Actualizado {negocioActivo.actualizadoHace}</span>
              <Link href={`/negocio/${negocioActivo.id}`} className="bg-carbon text-cream text-[12px] font-medium px-5 py-2.5 rounded-full">
                Ver menú completo →
              </Link>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
