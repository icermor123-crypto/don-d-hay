'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'
import { negocios } from '@/data/negocios'

const TIPOS = ['Todos', 'Restaurantes', 'Tiendas', 'Verificados']
const SORTS = [
  { key: 'mejor', label: '⭐ Mejor valorado' },
  { key: 'peor', label: '📉 Peor valorado' },
  { key: 'economico', label: '💰 Más económico' },
  { key: 'caro', label: '💎 Más caro' },
  { key: 'cercano', label: '📍 Más cercano' },
  { key: 'nuevo', label: '🆕 Recién agregado' },
  { key: 'verificado', label: '✓ Verificados' },
]

export default function ListaPage() {
  const [tipo, setTipo] = useState('Todos')
  const [sort, setSort] = useState('mejor')

  const scoreColor = (s) => s >= 8 ? 'bg-[#E4F0E8] text-forest' : s >= 6 ? 'bg-[#FEF3E8] text-[#C87A0F]' : 'bg-[#FDEBD8] text-rust'

  let lista = negocios.filter(n => {
    if (tipo === 'Restaurantes') return n.tipo === 'restaurante'
    if (tipo === 'Tiendas') return n.tipo === 'tienda'
    if (tipo === 'Verificados') return n.verificado
    return true
  })

  lista = [...lista].sort((a, b) => {
    if (sort === 'mejor') return b.puntuacion - a.puntuacion
    if (sort === 'peor') return a.puntuacion - b.puntuacion
    if (sort === 'economico') return a.precios[0].precio - b.precios[0].precio
    if (sort === 'caro') return b.precios[0].precio - a.precios[0].precio
    if (sort === 'cercano') return parseFloat(a.distancia) - parseFloat(b.distancia)
    if (sort === 'nuevo') return b.nuevo ? 1 : -1
    if (sort === 'verificado') return b.verificado ? 1 : -1
    return 0
  })

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />

      <div className="px-5 pb-3 bg-cream flex-shrink-0 border-b border-border">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-serif text-xl font-bold text-carbon">Lista de negocios</h1>
          <span className="text-[11px] text-muted font-light">{lista.length} resultados</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-2">
          {TIPOS.map(t => <button key={t} onClick={() => setTipo(t)} className={`chip ${tipo === t ? 'chip-active' : 'chip-inactive'}`}>{t}</button>)}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {SORTS.map(s => (
            <button key={s.key} onClick={() => setSort(s.key)}
              className={`text-[10px] font-medium whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-full border transition-all ${sort === s.key ? 'bg-[#F0EDE7] border-carbon text-carbon' : 'bg-card border-beige-dark text-stone'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-3 flex flex-col gap-3">
        {lista.map(n => (
          <Link key={n.id} href={`/negocio/${n.id}`}>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-4 pt-3 pb-2 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${n.tipo === 'restaurante' ? 'bg-rust' : 'bg-forest'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-carbon">{n.nombre}</p>
                  <p className="text-[10px] text-muted font-light">{n.tipo === 'restaurante' ? 'Restaurante' : 'Tienda'} · {n.municipio} · {n.distancia}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[12px] font-bold font-serif px-2 py-0.5 rounded-lg ${scoreColor(n.puntuacion)}`}>{n.puntuacion}<span className="text-[9px] font-normal opacity-60">/10</span></span>
                  <div className="flex gap-1">
                    {n.verificado && <span className="bg-beige text-stone text-[8px] px-1.5 py-0.5 rounded-full">✓</span>}
                    {n.nuevo && <span className="bg-carbon text-gold text-[8px] px-1.5 py-0.5 rounded-full">Nuevo</span>}
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${n.abierto ? 'bg-[#E4F0E8] text-forest' : 'bg-beige text-pale'}`}>{n.abierto ? 'Abierto' : 'Cerrado'}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
                {n.precios.slice(0,3).map(p => (
                  <div key={p.nombre} className="bg-[#F0EDE7] rounded-lg px-2.5 py-1.5 flex-shrink-0">
                    <p className="text-[9px] text-muted">{p.nombre}</p>
                    <p className="text-[11px] font-medium text-carbon">${p.precio.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[#F0EDE7] flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= n.rango ? 'bg-rust' : 'bg-beige-dark'}`} />)}
                  <span className="text-[9px] text-muted ml-1">{n.rangoLabel}</span>
                </div>
                <span className="text-[9px] text-pale">{n.actualizadoHace}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
