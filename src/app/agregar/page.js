'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'

const MUNICIPIOS = ['Habana Vieja','Centro Habana','Vedado','Miramar','Playa','Plaza de la Revolución','10 de Octubre','Cerro','Marianao','Arroyo Naranjo','Boyeros','Cotorro','Guanabacoa','Habana del Este','La Lisa','Regla','San Miguel del Padrón']
const PASOS = ['Info básica', 'Precios', 'Verificación']

export default function AgregarPage() {
  const [paso, setPaso] = useState(0)
  const [tipo, setTipo] = useState('restaurante')
  const [enviado, setEnviado] = useState(false)
  const [locationMarcado, setLocationMarcado] = useState(false)
  const [precios, setPrecios] = useState([{ nombre: '', precio: '' }, { nombre: '', precio: '' }])

  const agregarPrecio = () => setPrecios([...precios, { nombre: '', precio: '' }])

  const siguiente = () => {
    if (paso < 2) setPaso(paso + 1)
    else setEnviado(true)
  }

  const atras = () => {
    if (paso > 0) setPaso(paso - 1)
  }

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />

      <div className="px-5 pb-4 bg-cream flex-shrink-0 border-b border-border">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={atras} className="w-9 h-9 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L5 7l4 5" stroke="#1C1C1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-serif text-xl font-bold text-carbon">Agregar negocio</h1>
        </div>
        <p className="text-[11px] text-muted font-light pl-12 mb-3">Paso {paso + 1} de 3 — {PASOS[paso]}</p>
        <div className="w-full h-0.5 bg-beige-dark rounded-full overflow-hidden">
          <div className="h-full bg-carbon rounded-full transition-all duration-400" style={{ width: `${((paso + 1) / 3) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-1.5">
          {PASOS.map((p, i) => (
            <span key={p} className={`text-[10px] ${i === paso ? 'text-carbon font-medium' : i < paso ? 'text-muted' : 'text-pale'} font-light`}>{p}</span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5 flex flex-col gap-4">

        {paso === 0 && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Nombre del negocio</label>
              <input className="field-input" type="text" placeholder="Ej: La Cocina de Alicia"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Tipo de negocio</label>
              <div className="flex gap-2.5">
                {[{ key: 'restaurante', icon: '🍽', label: 'Restaurante', activeClass: 'bg-[#FDEBD8] text-rust border-rust' }, { key: 'tienda', icon: '🛒', label: 'Tienda o mercado', activeClass: 'bg-[#E4F0E8] text-forest border-forest' }].map(t => (
                  <button key={t.key} onClick={() => setTipo(t.key)}
                    className={`flex-1 rounded-2xl py-4 text-sm font-medium flex flex-col items-center gap-1.5 border-2 transition-all ${tipo === t.key ? t.activeClass : 'bg-beige text-stone border-transparent'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${tipo === t.key ? (t.key === 'restaurante' ? 'bg-rust' : 'bg-forest') : 'bg-beige-dark'}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Municipio</label>
              <select className="field-input appearance-none cursor-pointer">
                <option value="" disabled defaultValue>Selecciona el municipio...</option>
                {MUNICIPIOS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Dirección</label>
              <input className="field-input" type="text" placeholder="Calle, número, entre calles..."/>
              <p className="text-[10px] text-pale font-light pl-1">Incluye referencias para facilitar la ubicación</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Ubicación en el mapa</label>
              <div onClick={() => setLocationMarcado(true)}
                className={`rounded-2xl px-4 py-3.5 flex items-center gap-2 cursor-pointer border-2 transition-all ${locationMarcado ? 'bg-[#F0EDE7] border-carbon' : 'bg-beige border-transparent'}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="7" r="3.5" stroke={locationMarcado ? '#1C1C1A' : '#9C9A95'} strokeWidth="1.3"/>
                  <path d="M8 10.5V15" stroke={locationMarcado ? '#1C1C1A' : '#9C9A95'} strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span className={`text-[13px] flex-1 font-light ${locationMarcado ? 'text-carbon' : 'text-pale'}`}>
                  {locationMarcado ? '📍 Vedado, La Habana — Marcado' : 'Toca para marcar en el mapa'}
                </span>
                {!locationMarcado && (
                  <span className="bg-carbon text-cream text-[11px] font-medium px-3.5 py-1.5 rounded-xl">Abrir mapa</span>
                )}
              </div>
            </div>
          </>
        )}

        {paso === 1 && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Horario de atención</label>
              <div className="flex gap-2.5">
                <input className="field-input flex-1" type="time" defaultValue="09:00"/>
                <input className="field-input flex-1" type="time" defaultValue="21:00"/>
              </div>
              <p className="text-[10px] text-pale font-light pl-1">Hora de apertura · Hora de cierre</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Productos o platos con precio</label>
              <div className="flex flex-col gap-2">
                {precios.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="field-input flex-1 text-[12px]" type="text" placeholder="Nombre del producto"/>
                    <input className="field-input w-28 text-[12px]" type="number" placeholder="Precio $" min="0" step="0.10"/>
                  </div>
                ))}
              </div>
              <button onClick={agregarPrecio} className="w-full bg-beige border-2 border-dashed border-beige-dark rounded-2xl py-3.5 text-[12px] text-muted font-light hover:bg-beige-dark transition-all">
                + Agregar otro producto
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Rango general de precios</label>
              <select className="field-input cursor-pointer appearance-none">
                <option value="" disabled defaultValue>Selecciona el rango...</option>
                {['Muy económico (menos de $1)', 'Económico ($1 - $3)', 'Económico-Medio ($3 - $6)', 'Medio ($6 - $12)', 'Alto (más de $12)'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Teléfono de contacto (opcional)</label>
              <input className="field-input" type="tel" placeholder="+53 5 XXX XXXX"/>
            </div>
          </>
        )}

        {paso === 2 && (
          <>
            <div className="bg-card rounded-2xl p-5 border border-border flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-carbon flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L4 6v6c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V6L11 2z" stroke="#F7F5F0" strokeWidth="1.4" fill="none"/>
                  <path d="M8 11l2 2 4-4" stroke="#D4C8A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-lg text-carbon mb-1">Proceso de verificación</h3>
                <p className="text-[12px] text-muted font-light leading-relaxed">Nuestro equipo revisa cada negocio antes de publicarlo para garantizar información real y confiable.</p>
              </div>
              <div className="flex flex-col gap-3">
                {['Revisamos la información que enviaste', 'Coordinamos una visita o llamada con el encargado', 'Publicamos con el sello ✓ Verificado'].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-beige flex items-center justify-center text-[11px] font-medium text-stone flex-shrink-0">{i + 1}</div>
                    <p className="text-[12px] text-stone font-light">{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Nombre del encargado</label>
              <input className="field-input" type="text" placeholder="¿Con quién coordinamos?"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Teléfono para coordinación</label>
              <input className="field-input" type="tel" placeholder="+53 5 XXX XXXX"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Mejor horario para contactar</label>
              <select className="field-input cursor-pointer appearance-none">
                <option value="" disabled defaultValue>Selecciona un horario...</option>
                {['Mañana (8am - 12pm)', 'Mediodía (12pm - 3pm)', 'Tarde (3pm - 7pm)', 'Cualquier horario'].map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Notas adicionales (opcional)</label>
              <textarea className="field-input resize-none leading-relaxed" rows="3" placeholder="Alguna información extra..."/>
            </div>
          </>
        )}

      </div>

      <div className="px-5 pb-8 pt-3 bg-cream border-t border-border flex-shrink-0">
        <button onClick={siguiente}
          className={`btn-primary mb-2 ${enviado ? '!bg-forest' : ''}`}
          disabled={enviado}>
          {enviado ? '✓ Enviado — Te contactaremos pronto' : paso < 2 ? `Continuar → ${PASOS[paso + 1]}` : 'Enviar para revisión'}
        </button>
        <p className="text-[10px] text-pale text-center font-light">
          {enviado ? 'Revisa tu teléfono, nos pondremos en contacto en menos de 48h' : paso === 2 ? 'Nos contactaremos contigo en menos de 48 horas' : 'Tu negocio será revisado antes de aparecer en la app'}
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
