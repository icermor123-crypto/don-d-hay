# 🗺 Don D. Hay

Guía de precios en mapa para La Habana, Cuba.
Precios reales, negocios verificados. Todo en un mapa.

---

## 🚀 Cómo correr el proyecto localmente

### 1. Entra a la carpeta
```bash
cd don-d-hay
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Corre el servidor
```bash
npm run dev
```

### 4. Abre en el navegador
```
http://localhost:3000
```

---

## 🌐 Cómo subir a Vercel (para instalarlo en tu Android)

### Paso 1 — Sube el código a GitHub
1. Ve a github.com y crea un repositorio nuevo llamado `don-d-hay`
2. En tu computadora abre PowerShell dentro de la carpeta `don-d-hay` y ejecuta:

```bash
git init
git add .
git commit -m "Don D. Hay - primera versión"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/don-d-hay.git
git push -u origin main
```

> Reemplaza TU_USUARIO con tu usuario de GitHub

### Paso 2 — Conecta con Vercel
1. Ve a vercel.com e inicia sesión
2. Haz clic en "Add New Project"
3. Selecciona tu repositorio `don-d-hay`
4. Haz clic en "Deploy" — Vercel hace todo automático
5. En unos segundos tendrás un link tipo: `don-d-hay.vercel.app`

### Paso 3 — Instala en tu Android
1. Abre Chrome en tu Android
2. Ve a tu link de Vercel
3. Chrome mostrará un banner: "Agregar Don D. Hay a pantalla de inicio"
4. Toca "Agregar"
5. ¡Listo! Don D. Hay aparece como app en tu móvil

---

## 📱 Páginas disponibles

| Ruta | Pantalla |
|------|----------|
| `/` | Splash / Bienvenida |
| `/mapa` | Mapa principal |
| `/lista` | Lista de negocios |
| `/buscar` | Búsqueda |
| `/agregar` | Agregar negocio |
| `/perfil` | Perfil |
| `/perfil/guardados` | Negocios guardados |
| `/perfil/misnegocios` | Mis negocios |
| `/perfil/preferencias` | Preferencias |
| `/notificaciones` | Notificaciones |
| `/negocio/[id]` | Detalle de negocio |

---

## 📁 Estructura del proyecto

```
don-d-hay/
├── public/
│   ├── manifest.json     ← Configuración PWA
│   ├── sw.js             ← Service Worker
│   └── icons/            ← Íconos de la app
├── src/
│   ├── app/              ← Todas las páginas
│   ├── components/       ← BottomNav, StatusBar
│   └── data/
│       └── negocios.js   ← Datos de ejemplo
├── jsconfig.json
├── tailwind.config.js
└── package.json
```

---

## 🎨 Identidad visual

- **Nombre:** Don D. Hay
- **Logo:** D•H
- **Paleta:** Crema · Beige · Carbón · Óxido · Bosque
- **Tipografía:** Playfair Display (títulos) + DM Sans (cuerpo)
- **Puntuación:** Sistema numérico 0-10
