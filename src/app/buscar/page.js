'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'
import { negocios } from '@/data/negocios'

export default function BuscarPage() {
  const [query, setQuery] = useState('')
  const [filtro, setFiltro] = useState('Todo')

  const resultados = negocios.filter(n => {
    const matchTipo = filtro === 'Todo' || (filtro === 'Restaurantes' && n.tipo === 'restaurante') || (filtro === 'Tiendas' && n.tipo === 'tienda')
    if (!query) return matchTipo
    const q = query.toLowerCase()
    return matchTipo && (n.nombre.toLowerCase().includes(q) || n.municipio.toLowerCase().includes(q) || n.precios.some(p => p.nombre.toLowerCase().includes(q)))
  })

  const mejoresPrecios = query
    ? negocios.flatMap(n => n.precios.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase())).map(p => ({ ...p, negocio: n.nombre, negocioId: n.id }))).sort((a, b) => a.precio - b.precio).slice(0, 4)
    : []

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />

      <div className="px-5 pb-3 bg-cream flex-shrink-0 border-b border-border">
        <h1 className="font-serif text-xl font-bold text-carbon mb-3">Buscar</h1>
        <div className="bg-carbon rounded-full px-4 py-3 flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#D4C8A8" strokeWidth="1.4"/>
            <path d="M11 11l3 3" stroke="#D4C8A8" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Buscar producto o negocio..."
            className="flex-1 bg-transparent text-[13px] text-gold font-light outline-none placeholder-[#4A4845]"
            autoFocus />
          {query && <button onClick={() => setQuery('')} className="w-5 h-5 rounded-full bg-[#3A3A38] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="#9C9A95" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>}
        </div>
        <div className="flex gap-2">
          {['Todo', 'Restaurantes', 'Tiendas'].map(f => <button key={f} onClick={() => setFiltro(f)} className={`chip ${filtro === f ? 'chip-active' : 'chip-inactive'}`}>{f}</button>)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 flex flex-col gap-3">
        {resultados.length > 0 && (
          <>
            <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium">{query ? `Negocios con "${query}"` : 'Todos los negocios'}</p>
            {resultados.map(n => (
              <Link key={n.id} href={`/negocio/${n.id}`}>
                <div className="bg-card rounded-2xl px-4 py-3 border border-border flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${n.tipo === 'restaurante' ? 'bg-[#FDEBD8]' : 'bg-[#E4F0E8]'}`}>
                    {n.tipo === 'restaurante' ? '🍽' : '🛒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-carbon">{n.nombre}</p>
                    <p className="text-[11px] text-muted font-light">{n.municipio} · {n.distancia}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[13px] font-medium text-carbon">${n.precios[0].precio.toFixed(2)}</span>
                    {n.verificado && <span className="bg-beige text-stone text-[9px] px-2 py-0.5 rounded-full">✓ Verificado</span>}
                    <span className="text-[10px] text-pale">{n.distancia}</span>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}

        {mejoresPrecios.length > 0 && (
          <>
            <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium mt-2">Mejores precios para "{query}"</p>
            {mejoresPrecios.map((p, i) => (
              <Link key={i} href={`/negocio/${p.negocioId}`}>
                <div className="bg-card rounded-2xl px-4 py-3 border border-border flex justify-between items-center">
                  <div><p className="text-[13px] font-medium text-carbon">{p.nombre}</p><p className="text-[11px] text-muted font-light">{p.negocio}</p></div>
                  <div className="text-right"><p className="text-[15px] font-medium text-rust">${p.precio.toFixed(2)}</p>{i === 0 && <p className="text-[10px] text-forest">más barato</p>}</div>
                </div>
              </Link>
            ))}
          </>
        )}

        {query && resultados.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16">
            <span className="text-4xl">🔍</span>
            <p className="text-sm text-muted font-light text-center">No encontramos resultados<br />para "{query}"</p>
          </div>
        )}

        {!query && (
          <p className="text-[11px] text-pale font-light text-center py-8">Busca por nombre, municipio o producto</p>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
