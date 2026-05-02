import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'

const NOTIFS = [
  { id: 1, texto: 'El Rincón Habanero actualizó sus precios.', negocio: 'El Rincón Habanero', negocioId: 'rincon-habanero', icon: '🍽', iconBg: 'bg-[#FDEBD8]', tiempo: 'hace 30 min', leida: false },
  { id: 2, texto: 'Tu reporte en Mercado El Águila fue confirmado por 8 usuarios.', negocio: 'Mercado El Águila', negocioId: 'mercado-aguila', icon: '🛒', iconBg: 'bg-[#E4F0E8]', tiempo: 'hace 2 horas', leida: false },
  { id: 3, texto: 'Bodega San Rafael fue verificado por el equipo Don D. Hay.', negocio: 'Bodega San Rafael', negocioId: 'bodega-san-rafael', icon: '✓', iconBg: 'bg-[#E4F0E8]', tiempo: 'hace 5 horas', leida: false },
  { id: 4, texto: 'Tu negocio La Cocina de Alicia fue publicado exitosamente.', negocio: 'La Cocina de Alicia', negocioId: 'cocina-alicia', icon: '📋', iconBg: 'bg-beige', tiempo: 'ayer', leida: true },
  { id: 5, texto: '3 negocios nuevos cerca de ti en Vedado.', negocio: null, negocioId: null, icon: '📍', iconBg: 'bg-beige', tiempo: 'hace 3 días', leida: true },
  { id: 6, texto: 'El Paladar del Morro actualizó su menú con 2 nuevos platos.', negocio: 'El Paladar del Morro', negocioId: 'paladar-morro', icon: '🍽', iconBg: 'bg-[#FDEBD8]', tiempo: 'hace 4 días', leida: true },
]

export default function NotificacionesPage() {
  const nuevas = NOTIFS.filter(n => !n.leida)
  const anteriores = NOTIFS.filter(n => n.leida)

  const NotifCard = ({ n }) => (
    <Link href={n.negocioId ? `/negocio/${n.negocioId}` : '#'}>
      <div className={`rounded-2xl px-4 py-3.5 border flex items-start gap-3 ${!n.leida ? 'bg-[#F0EDE7] border-[#D4C8A8]' : 'bg-card border-border'}`}>
        <div className="pt-1 flex-shrink-0">
          <div className={`w-2 h-2 rounded-full ${!n.leida ? 'bg-rust' : 'bg-beige-dark'}`} />
        </div>
        <div className="flex-1">
          <p className="text-[12px] text-carbon leading-relaxed">
            {n.negocio && <span className="font-medium">{n.negocio} </span>}
            {n.texto.replace(n.negocio + ' ', '')}
          </p>
          <p className="text-[10px] text-pale mt-1">{n.tiempo}</p>
        </div>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-base ${n.iconBg}`}>
          {n.icon}
        </div>
      </div>
    </Link>
  )

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />
      <div className="px-5 pb-4 bg-cream flex-shrink-0 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-carbon">Notificaciones</h1>
          <button className="text-[11px] text-muted font-light">Marcar todo como leído</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 flex flex-col gap-3">
        {nuevas.length > 0 && (
          <>
            <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium">Nuevas</p>
            {nuevas.map(n => <NotifCard key={n.id} n={n} />)}
          </>
        )}
        {anteriores.length > 0 && (
          <>
            <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium mt-2">Anteriores</p>
            {anteriores.map(n => <NotifCard key={n.id} n={n} />)}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
