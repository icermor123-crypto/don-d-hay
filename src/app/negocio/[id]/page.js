'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { supabase } from '@/lib/supabase'

export default function NegocioPage({ params }) {
  const [negocio, setNegocio] = useState(null)
  const [precios, setPrecios] = useState([])
  const [reportes, setReportes] = useState([])
  const [tab, setTab] = useState('menu')
  const [guardado, setGuardado] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarNegocio()
  }, [params.id])

  const cargarNegocio = async () => {
    setLoading(true)
    const { data: neg } = await supabase.from('negocios').select('*').eq('id', params.id).single()
    const { data: prec } = await supabase.from('precios').select('*').eq('negocio_id', params.id)
    const { data: rep } = await supabase.from('reportes').select('*').eq('negocio_id', params.id)
    if (neg) setNegocio(neg)
    if (prec) setPrecios(prec)
    if (rep) setReportes(rep)
    setLoading(false)
  }

  const scoreColor = (s) => s >= 8 ? '#2A6E3A' : s >= 6 ? '#C87A0F' : '#C84B0F'
  const scoreBg = (s) => s >= 8 ? '#E4F0E8' : s >= 6 ? '#FEF3E8' : '#FDEBD8'
  const minPrecio = precios.length > 0 ? Math.min(...precios.map(p => Number(p.precio))) : 0

  if (loading) return (
    <div className="flex-1 bg-cream flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-beige-dark border-t-carbon rounded-full animate-spin" />
    </div>
  )

  if (!negocio) return (
    <div className="flex-1 bg-cream flex flex-col items-center justify-center gap-3">
      <p className="text-muted font-light">Negocio no encontrado</p>
      <Link href="/lista" className="text-carbon font-medium text-sm">← Volver a la lista</Link>
    </div>
  )

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <div className="relative h-44 bg-[#2A2820] flex-shrink-0 flex items-end">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 176" preserveAspectRatio="xMidYMid slice">
          <rect width="390" height="176" fill="#2A2820"/>
          {[[12,20,55,35],[80,14,70,42],[168,22,55,30],[240,16,65,38],[320,18,60,34]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#333028"/>
          ))}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A] to-transparent" />
        <Link href="/lista" className="absolute top-12 left-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="#F7F5F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <button onClick={() => setGuardado(!guardado)} className="absolute top-12 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 12.5L2.5 7.5a3.5 3.5 0 0 1 5-4.9 3.5 3.5 0 0 1 5 4.9L7.5 12.5z" stroke="#F7F5F0" strokeWidth="1.3" fill={guardado ? '#F7F5F0' : 'none'}/>
          </svg>
        </button>
        <div className="relative z-10 px-5 pb-4 w-full">
          <h1 className="font-serif text-xl font-bold text-cream mb-1">{negocio.nombre}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gold font-light">{negocio.tipo === 'restaurante' ? 'Restaurante' : 'Tienda'} · {negocio.municipio}</span>
            {negocio.verificado && <span className="bg-cream text-carbon text-[10px] px-2.5 py-0.5 rounded-full font-medium">✓ Verificado</span>}
            <span className="text-[11px] font-bold font-serif px-2 py-0.5 rounded-lg" style={{ background: scoreBg(negocio.puntuacion), color: scoreColor(negocio.puntuacion) }}>
              {negocio.puntuacion}/10
            </span>
          </div>
        </div>
      </div>

      <div className="flex px-5 py-2.5 gap-2 border-b border-border bg-card flex-shrink-0 overflow-x-auto scrollbar-hide">
        {[
          { icon: '🕐', label: negocio.abierto ? 'Abierto ahora' : 'Cerrado' },
          { icon: '📊', label: negocio.rango_label },
          { icon: '👤', label: `${negocio.reportes} reportes` }
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 bg-beige rounded-full px-3 py-1.5 flex-shrink-0">
            <span className="text-xs">{icon}</span>
            <span className="text-[11px] text-stone font-light">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex border-b border-border bg-card flex-shrink-0">
        {[{ key: 'menu', label: 'Menú y precios' }, { key: 'info', label: 'Información' }, { key: 'reportes', label: 'Reportes' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-[12px] border-b-2 transition-colors ${tab === t.key ? 'text-carbon font-medium border-carbon' : 'text-muted font-light border-transparent'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 flex flex-col gap-3">
        {tab === 'menu' && (
          <>
            <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium">
              {negocio.tipo === 'restaurante' ? 'Platos y bebidas' : 'Productos'}
            </p>
            {precios.map(p => (
              <div key={p.id} className="bg-card rounded-2xl px-4 py-3 flex items-center justify-between border border-border">
                <div>
                  <p className="text-[13px] font-medium text-carbon">{p.nombre}</p>
                  {p.descripcion && <p className="text-[11px] text-muted font-light">{p.descripcion}</p>}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[16px] font-medium text-carbon">${Number(p.precio).toFixed(2)}</p>
                  {Number(p.precio) === minPrecio && (
                    <span className="bg-[#E4F0E8] text-forest text-[10px] px-2 py-0.5 rounded-md font-medium">Más barato</span>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'info' && (
          <>
            {[
              { label: 'Dirección', value: negocio.direccion },
              { label: 'Teléfono', value: negocio.telefono || 'No disponible' },
              { label: 'Estado', value: negocio.verificado ? '✓ Verificado por el equipo Don D. Hay' : 'Pendiente de verificación', green: negocio.verificado },
            ].map(({ label, value, green }) => (
              <div key={label} className="bg-card rounded-2xl px-4 py-3 border border-border">
                <p className="text-[10px] text-muted font-light mb-1">{label}</p>
                <p className={`text-[13px] font-medium ${green ? 'text-forest' : 'text-carbon'}`}>{value}</p>
              </div>
            ))}
            <div className="bg-card rounded-2xl px-4 py-3 border border-border">
              <p className="text-[10px] text-muted font-light mb-2">Horario semanal</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between"><span className="text-[12px] text-stone font-light">Lun — Vie</span><span className="text-[12px] font-medium text-carbon">{negocio.horario_lv}</span></div>
                <div className="flex justify-between"><span className="text-[12px] text-stone font-light">Sábado</span><span className="text-[12px] font-medium text-carbon">{negocio.horario_sab}</span></div>
                <div className="flex justify-between"><span className="text-[12px] text-stone font-light">Domingo</span><span className={`text-[12px] font-medium ${negocio.horario_dom === 'Cerrado' ? 'text-pale' : 'text-carbon'}`}>{negocio.horario_dom}</span></div>
              </div>
            </div>
          </>
        )}

        {tab === 'reportes' && (
          <>
            <button className="w-full bg-beige border-2 border-dashed border-beige-dark rounded-2xl py-3.5 text-[12px] text-muted font-light">
              + Agregar reporte de precio
            </button>
            {reportes.length > 0 ? (
              <>
                <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium">Reportes recientes</p>
                {reportes.map(r => (
                  <div key={r.id} className="bg-card rounded-2xl px-4 py-3 border border-border flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-medium text-carbon">{r.usuario}</span>
                      <span className="text-[10px] text-pale">{new Date(r.created_at).toLocaleDateString('es-ES')}</span>
                    </div>
                    <p className="text-[12px] text-stone font-light leading-relaxed">{r.texto}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${r.tipo === 'precio' ? 'bg-[#FDEBD8] text-rust' : 'bg-[#E4F0E8] text-forest'}`}>
                        {r.tipo === 'precio' ? 'Precio actualizado' : 'Confirmación'}
                      </span>
                      <div className="flex gap-2">
                        <button className="bg-beige text-stone text-[10px] px-2.5 py-1 rounded-full">👍 {r.utiles}</button>
                        <button className="bg-beige text-stone text-[10px] px-2.5 py-1 rounded-full">👎 {r.no_utiles}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-[12px] text-pale text-center py-8 font-light">Aún no hay reportes para este negocio.</p>
            )}
          </>
        )}
      </div>

      {tab === 'menu' && (
        <div className="px-5 pb-4 pt-3 bg-card border-t border-border flex-shrink-0">
          <button className="w-full bg-beige text-stone rounded-full py-3.5 text-[13px] font-medium">
            Reportar precio desactualizado
          </button>
        </div>
      )}

      {tab === 'info' && (
        <div className="px-5 pb-4 pt-3 bg-card border-t border-border flex-shrink-0">
          <button className="w-full bg-beige text-stone rounded-full py-3.5 text-[13px] font-medium">
            Reportar información incorrecta
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
