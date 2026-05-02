import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'

export default function PerfilPage() {
  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />
      <div className="px-5 pb-4 bg-cream flex-shrink-0 border-b border-border">
        <h1 className="font-serif text-xl font-bold text-carbon">Mi perfil</h1>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 py-4 flex items-center gap-4 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-carbon flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-xl font-bold text-cream tracking-tight">D<span className="text-sm opacity-25">•</span>H</span>
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-medium text-carbon">Carlos Rodríguez</p>
            <p className="text-[11px] text-muted font-light">Usuario desde enero 2025</p>
          </div>
          <button className="bg-beige rounded-full px-3.5 py-2 text-[11px] text-stone font-medium">Editar</button>
        </div>

        <div className="flex px-5 py-4 gap-3 border-b border-border">
          {[{ num: 12, label: 'Negocios\nguardados' }, { num: 4, label: 'Negocios\nagregados' }, { num: 38, label: 'Precios\nreportados' }].map(({ num, label }) => (
            <div key={label} className="flex-1 bg-card rounded-2xl py-3 px-2 text-center border border-border">
              <p className="font-serif text-2xl font-bold text-carbon">{num}</p>
              <p className="text-[9px] text-muted font-light mt-1 leading-tight whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 flex flex-col gap-3">
          <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium">Mi actividad</p>

          <Link href="/perfil/guardados">
            <div className="bg-card rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-border">
              <div className="w-9 h-9 rounded-xl bg-carbon flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 13L3 8a3.5 3.5 0 0 1 5-4.9A3.5 3.5 0 0 1 13 8L8 13z" stroke="#F7F5F0" strokeWidth="1.3" fill="none"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-carbon">Negocios guardados</p>
                <p className="text-[11px] text-muted font-light">12 favoritos guardados</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-25">
                <path d="M5 3l4 4-4 4" stroke="#1C1C1A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          <Link href="/perfil/misnegocios">
            <div className="bg-card rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-border">
              <div className="w-9 h-9 rounded-xl bg-beige flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="4" width="12" height="10" rx="1.5" stroke="#5C5A55" strokeWidth="1.3"/>
                  <path d="M5 4V3a2 2 0 0 1 4 0v1" stroke="#5C5A55" strokeWidth="1.3"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-carbon">Mis negocios agregados</p>
                <p className="text-[11px] text-muted font-light">4 negocios registrados</p>
              </div>
              <span className="bg-carbon text-cream text-[10px] px-2.5 py-0.5 rounded-full font-medium">4</span>
            </div>
          </Link>

          <p className="text-[9px] tracking-[2px] uppercase text-muted font-medium mt-2">Configuración</p>

          <Link href="/perfil/preferencias">
            <div className="bg-card rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-border">
              <div className="w-9 h-9 rounded-xl bg-beige flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="2.5" stroke="#5C5A55" strokeWidth="1.3"/>
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" stroke="#5C5A55" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-carbon">Preferencias</p>
                <p className="text-[11px] text-muted font-light">Notificaciones y privacidad</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-25">
                <path d="M5 3l4 4-4 4" stroke="#1C1C1A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          <Link href="/notificaciones">
            <div className="bg-card rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-border">
              <div className="w-9 h-9 rounded-xl bg-beige flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2a4 4 0 0 1 4 4v2l1.5 2h-11L4 8V6a4 4 0 0 1 4-4z" stroke="#5C5A55" strokeWidth="1.3" fill="none"/>
                  <path d="M6.5 12a1.5 1.5 0 0 0 3 0" stroke="#5C5A55" strokeWidth="1.3"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-carbon">Notificaciones</p>
                <p className="text-[11px] text-muted font-light">3 nuevas notificaciones</p>
              </div>
              <span className="bg-rust text-cream text-[10px] px-2.5 py-0.5 rounded-full font-medium">3</span>
            </div>
          </Link>

          <button className="bg-card rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-border w-full text-left">
            <div className="w-9 h-9 rounded-xl bg-[#FDEBD8] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 2h4M2 4h12M3 4l1 10h8l1-10" stroke="#C84B0F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[13px] font-medium text-rust flex-1">Cerrar sesión</p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40">
              <path d="M5 3l4 4-4 4" stroke="#C84B0F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
