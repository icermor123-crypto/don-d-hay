'use client'
import { useState } from 'react'
import Link from 'next/link'
import StatusBar from '@/components/StatusBar'

export default function RegistroPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegistro = () => {
    if (!nombre || !email || !password || !confirmar) {
      setError('Por favor completa todos los campos')
      return
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/bienvenida'
    }, 1500)
  }

  return (
    <div className="flex-1 bg-cream flex flex-col overflow-hidden">
      <StatusBar />

      <div className="px-5 pb-4 bg-cream flex-shrink-0 border-b border-border">
        <Link href="/" className="w-9 h-9 rounded-full bg-beige flex items-center justify-center mb-3 inline-flex">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L5 7l4 5" stroke="#1C1C1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-serif text-2xl font-bold text-carbon mb-1">Crear cuenta</h1>
        <p className="text-[12px] text-muted font-light">Únete a Don D. Hay</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-6 flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label className="field-label">Nombre completo</label>
          <input className="field-input" type="text" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label">Correo electrónico</label>
          <input className="field-input" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label">Contraseña</label>
          <input className="field-input" type="password" placeholder="Mínimo 8 caracteres" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label">Confirmar contraseña</label>
          <input className="field-input" type="password" placeholder="Repite tu contraseña" value={confirmar} onChange={e => setConfirmar(e.target.value)}/>
        </div>

        {error && (
          <div className="bg-[#FDEBD8] border border-[#F0C8A8] rounded-xl px-4 py-3">
            <p className="text-[12px] text-rust font-light">{error}</p>
          </div>
        )}

        <button
          onClick={handleRegistro}
          disabled={loading}
          className={`btn-primary ${loading ? 'opacity-70' : ''}`}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-pale font-light">o regístrate con</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3 text-[12px] font-medium text-carbon">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-3 text-[12px] font-medium text-carbon">
            📱 Teléfono
          </button>
        </div>

        <p className="text-[12px] text-muted text-center font-light">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-carbon font-medium">Inicia sesión</Link>
        </p>

        <p className="text-[10px] text-pale text-center font-light leading-relaxed">
          Al crear tu cuenta aceptas los{' '}
          <span className="text-muted">términos de uso</span> y la{' '}
          <span className="text-muted">política de privacidad</span>
        </p>
      </div>
    </div>
  )
}
