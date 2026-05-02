'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'
import { negocios } from '@/data/negocios'

const FILTROS = ['Todos', 'Restaurantes', 'Tiendas', 'Verificados']
const HABANA_CENTER = [23.1136, -82.3666]
const ZOOM = 14

const COORDS = {
  'rincon-habanero':  [23.1177, -82.3874],
  'cocina-alicia':    [23.1365, -82.3593],
  'mercado-aguila':   [23.1024, -82.4156],
  'bodega-san-rafael':[23.1350, -82.3620],
  'paladar-morro':    [23.1402, -82.3520],
}

export default function MapaPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [negocioActivo, setNegocioActivo] = useState(null)
  const [cardVisible, setCardVisible] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [gpsStatus, setGpsStatus] = useState('idle') // idle | loading | found | denied
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const userMarkerRef = useRef(null)

  const negociosFiltrados = negocios.filter(n => {
    if (filtro === 'Restaurantes') return n.tipo === 'restaurante'
    if (filtro === 'Tiendas') return n.tipo === 'tienda'
    if (filtro === 'Verificados') return n.verificado
    return true
  })

  const scoreColor = (s) => s >= 8 ? '#2A6E3A' : s >= 6 ? '#C87A0F' : '#C84B0F'
  const scoreBg = (s) => s >= 8 ? '#E4F0E8' : s >= 6 ? '#FEF3E8' : '#FDEBD8'

  // Inicializar mapa
  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current) return

    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current, {
        center: HABANA_CENTER,
        zoom: ZOOM,
        zoomControl: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map)

      mapInstanceRef.current = map
      setMapReady(true)

      map.on('click', () => {
        setCardVisible(false)
        setNegocioActivo(null)
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Agregar marcadores de negocios
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return

    import('leaflet').then(L => {
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []

      negociosFiltrados.forEach(n => {
        const coords = COORDS[n.id]
        if (!coords) return

        const color = n.verificado ? '#1C1C1A' : n.tipo === 'restaurante' ? '#C84B0F' : '#2A6E3A'
        const textColor = n.verificado ? '#D4C8A8' : '#1C1C1A'
        const precio = `$${n.precios[0].precio.toFixed(2)}`
        const icono = n.verificado ? '★' : n.tipo === 'restaurante' ? '🍽' : '🛒'

        const icon = L.divIcon({
          className: '',
          html: `
            <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
              <div style="background:${color};color:${textColor};border-radius:12px;padding:4px 10px;font-size:11px;font-weight:500;font-family:sans-serif;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2);">${icono} ${precio}</div>
              <div style="width:6px;height:6px;border-radius:50%;background:${color};margin-top:3px;"></div>
            </div>
          `,
          iconAnchor: [35, 44],
          iconSize: [80, 44],
        })

        const marker = L.marker(coords, { icon }).addTo(mapInstanceRef.current)
        marker.on('click', (e) => {
          e.originalEvent.stopPropagation()
          setNegocioActivo(n)
          setCardVisible(true)
          mapInstanceRef.current.panTo(coords, { animate: true })
        })
        markersRef.current.push(marker)
      })
    })
  }, [mapReady, filtro])

  // Función GPS
  const centrarEnMiUbicacion = () => {
    if (!mapInstanceRef.current) return
    setGpsStatus('loading')

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const userCoords = [latitude, longitude]

        import('leaflet').then(L => {
          // Eliminar marcador anterior si existe
          if (userMarkerRef.current) {
            userMarkerRef.current.remove()
          }

          // Marcador de ubicación del usuario
          const userIcon = L.divIcon({
            className: '',
            html: `
              <div style="position:relative;width:20px;height:20px;">
                <div style="position:absolute;inset:0;border-radius:50%;background:#4A90D9;opacity:0.2;animation:pulse 2s infinite;transform:scale(2.5);"></div>
                <div style="position:absolute;inset:3px;border-radius:50%;background:#4A90D9;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
              </div>
              <style>
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 0.3; }
                  50% { transform: scale(2.5); opacity: 0.1; }
                  100% { transform: scale(1); opacity: 0.3; }
                }
              </style>
            `,
            iconAnchor: [10, 10],
            iconSize: [20, 20],
          })

          userMarkerRef.current = L.marker(userCoords, { icon: userIcon }).addTo(mapInstanceRef.current)
          mapInstanceRef.current.flyTo(userCoords, 15, { animate: true, duration: 1.5 })
          setGpsStatus('found')

          // Volver a idle después de 3 segundos
          setTimeout(() => setGpsStatus('idle'), 3000)
        })
      },
      (err) => {
        console.error('GPS error:', err)
        setGpsStatus('denied')
        setTimeout(() => setGpsStatus('idle'), 3000)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>

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

      <div className="flex-1 relative overflow-hidden">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/* Botón GPS */}
        <button
          onClick={centrarEnMiUbicacion}
          className="absolute bottom-4 right-4 z-[999] w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
          style={{
            background: gpsStatus === 'found' ? '#1C1C1A' : gpsStatus === 'denied' ? '#C84B0F' : '#FDFBF7',
            border: '0.5px solid #E8E4DC'
          }}>
          {gpsStatus === 'loading' ? (
            <div style={{ width: 18, height: 18, border: '2px solid #9C9A95', borderTopColor: '#1C1C1A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          ) : gpsStatus === 'denied' ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L9 17M1 9L17 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" fill={gpsStatus === 'found' ? '#D4C8A8' : '#4A90D9'}/>
              <circle cx="10" cy="10" r="7" stroke={gpsStatus === 'found' ? '#D4C8A8' : '#4A90D9'} strokeWidth="1.5" fill="none"/>
              <path d="M10 1v3M10 16v3M1 10h3M16 10h3" stroke={gpsStatus === 'found' ? '#D4C8A8' : '#4A90D9'} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* Tooltip GPS denegado */}
        {gpsStatus === 'denied' && (
          <div className="absolute bottom-20 right-4 z-[999] bg-carbon text-cream text-[11px] px-3 py-2 rounded-xl font-light max-w-[180px] text-center">
            Activa el GPS en tu navegador para usar esta función
          </div>
        )}

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>

        {/* Card popup negocio */}
        {negocioActivo && (
          <div className={`absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl px-5 pb-5 z-[1000] border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ${cardVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="w-9 h-1 bg-beige-dark rounded-full mx-auto mt-3 mb-4" />
            <div className="flex justify-between items-start mb-1">
              <div>
                <Link href={`/negocio/${negocioActivo.id}`}>
                  <h3 className="font-serif text-lg text-carbon">{negocioActivo.nombre}</h3>
                </Link>
                <p className="text-xs text-muted font-light mb-3">
                  {negocioActivo.tipo === 'restaurante' ? 'Restaurante' : 'Tienda'} · {negocioActivo.municipio}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold font-serif px-2 py-0.5 rounded-lg"
                  style={{ background: scoreBg(negocioActivo.puntuacion), color: scoreColor(negocioActivo.puntuacion) }}>
                  {negocioActivo.puntuacion}/10
                </span>
                {negocioActivo.verificado && (
                  <span className="bg-beige text-stone text-[10px] px-2.5 py-1 rounded-full font-medium">✓ Verificado</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {negocioActivo.precios.slice(0, 3).map(p => (
                <div key={p.nombre} className="bg-beige rounded-xl px-3 py-1.5 text-[11px] text-stone">
                  {p.nombre} <b className="text-carbon font-medium">${p.precio.toFixed(2)}</b>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-pale font-light">Actualizado {negocioActivo.actualizadoHace}</span>
              <Link href={`/negocio/${negocioActivo.id}`}
                className="bg-carbon text-cream text-[12px] font-medium px-5 py-2.5 rounded-full">
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
