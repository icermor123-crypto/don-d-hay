import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'
import { negocios } from '@/data/negocios'

export default function MisNegociosPage() {
  const misNegocios = negocios.slice(0, 4)

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
          <h1 className="font-serif text-xl font-bold text-carbon">Mis negocios agregados</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 flex flex-col gap-3">
        {misNegocios.map(n => (
          <Link key={n.id} href={`/negocio/${n.id}`}>
            <div className="bg-card rounded-2xl px-4 py-3.5 border border-border flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${n.tipo === 'restaurante' ? 'bg-[#FDEBD8]' : 'bg-[#E4F0E8]'}`}>
                {n.tipo === 'restaurante' ? '🍽' : '🛒'}
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-carbon">{n.nombre}</p>
                <p className="text-[11px] text-muted font-light">{n.municipio} · Agregado el {n.agregado}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${n.verificado ? 'bg-[#E4F0E8] text-forest' : 'bg-beige text-muted'}`}>
                {n.verificado ? '✓ Verificado' : 'Pendiente'}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}
