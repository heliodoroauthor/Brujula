# Brújula — Vida + Trading

Tu brújula para navegar la vida y los mercados. Una sola app que une un panel de vida intencional con un módulo de trading construido alrededor del sistema de **los 5 porqués**.

## Qué incluye

- **Hoy** — tu "norte" del día y tareas con estructura DMS (Driver · Método · Sentido).
- **Estrella** — radar de equilibrio de vida (8 áreas, editable) + auditoría de **Tiempo** (calendario como fuente de verdad).
- **Trading** — diario de operaciones, P&L, curva de capital, score de disciplina y los **5 porqués**:
  - por qué tomé un trade
  - por qué NO lo tomé
  - al cerrar: por qué fue ganador / por qué fue perdedor
- **Mente** — tus "fantasmas" (creencias limitantes, incl. las de trading) + filtro de decisiones.
- **Gente** — relaciones que nutrir + protocolo de reconexión.
- **Enfoque** — timer de trabajo profundo + biblioteca de audio.

## Stack (objetivo)

- Frontend: HTML/CSS/JS (prototipo actual) → **Next.js** (App Router)
- Backend: **Supabase** (Auth + Postgres + Storage)
- Hosting: **Vercel**
- PWA instalable

## Estado actual

`index.html` es un prototipo funcional y autónomo (datos guardados en el navegador con `localStorage`). Es la fuente de diseño y el punto de partida para la migración a Next.js + Supabase descrita en `brujula-blueprint.md`.

## Estructura

```
index.html             # la app (prototipo v2)
manifest.webmanifest   # PWA
icon.svg               # ícono
brujula-blueprint.md   # arquitectura, modelo de datos y roadmap
```

## Deploy

Sitio estático: Vercel detecta `index.html` y lo sirve en la raíz. Cada push a `main` publica automáticamente.

---

*Hecho con Cowork. Sin ejecución de órdenes ni asesoría financiera — el módulo de trading es solo registro, análisis y psicología.*
