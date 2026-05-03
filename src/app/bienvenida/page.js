import Link from 'next/link'

export default function BienvenidaPage() {
  return (
    <main className="flex-1 bg-carbon flex flex-col items-center justify-between px-8 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[420px] h-[420px] rounded-full border border-[#252523] -top-36 -left-28" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-[#222220] -top-20 -left-14" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-[#222220] -bottom-44 -right-36" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-[#252523] -bottom-24 -right-20" />
      </div>

      <div className="flex flex-col items-center z-10">
        <div className="w-20 h-20 rounded-2xl bg-cream flex items-center justify-center mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <span className="font-serif text-3xl font-bold text-carbon tracking-tight leading-none">
            D<span className="text-lg opacity-25">•</span>H
          </span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-cream text-center leading-tight mb-2">Don D. Hay</h1>
        <p className="text-[9px] tracking-[4px] uppercase text-[#4A4845] font-light mb-6">La Habana · Cuba</p>
        <p className="text-sm text-[#6A6860] text-center leading-relaxed font-light max-w-[260px]">
          Precios reales, negocios verificados.<br />Todo en un mapa.
        </p>
      </div>

      <div className="w-10 h-px bg-[#3A3A38] z-10" />

      <div className="z-10 w-full flex flex-col items-center gap-3">
        <Link href="/mapa" className="btn-primary text-center block">
          Explorar el mapa
        </Link>
        <Link href="/agregar" className="w-full text-center bg-transparent text-[#5A5855] border border-[#2E2E2C] rounded-full py-4 text-sm font-light transition-all duration-200">
          Registrar mi negocio
        </Link>
        <p className="text-[10px] text-[#2E2E2C] text-center leading-relaxed font-light">
          Al continuar aceptas los{' '}
          <span className="text-[#4A4845]">términos de uso</span> y la{' '}
          <span className="text-[#4A4845]">política de privacidad</span>
        </p>
      </div>
    </main>
  )
}
