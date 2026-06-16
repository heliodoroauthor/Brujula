# Brújula — Build Blueprint

**One app for navigating both your life and the markets.** Merges *Brújula* (life compass) + *FocusFlow* (deep work) and adds a *Trading* module built around your 5-Whys discipline system.

- **Stack:** Next.js (App Router) · Supabase (Auth + Postgres + Storage) · Vercel · PWA
- **Language:** Spanish UI (easy to make bilingual later)
- **Aesthetic:** dark editorial — near-black navy, warm gold accent, serif display headers, mono micro-labels. Focus module uses a purple→pink accent; Trading uses green/red for P&L over the gold base.

---

## 1. Information architecture

One shell, 5 primary tabs in the bottom nav, plus a focus sub-screen launched from Hoy.

| Tab | From | What it does |
|-----|------|--------------|
| **Hoy** | Brújula | Daily "norte" (guiding value), DMS tasks (Driver / Método / Sentido) linked to values & goals, focus-session launcher |
| **Estrella** | Brújula | Life-balance radar across 8 areas + a **Tiempo** toggle (calendar-as-truth time audit that flags say/do gaps) |
| **Trading** | NEW | Journal, P&L metrics, equity curve, and the 5-Whys system |
| **Mente** | Brújula | "Fantasmas" (limiting beliefs, incl. trading ones like *El Apostador*) + AI decision filter |
| **Gente** | Brújula | Relationships to nurture + AI apology/reconnect protocol |
| *Enfoque* | FocusFlow | Focus timer + audio library (binaural/focus/ambient), reached from Hoy |

Trading ties into the rest: emotional state on a trade feeds **Mente**; trading hours show up in **Estrella → Tiempo**; "Journaling de 3 trades" appears as a **Hoy** task.

---

## 2. The Trading 5-Whys system (the core idea)

Every trade decision is logged with a chained root-cause analysis — not just the *what*, the *why*.

- **Took a trade** → 5 whys: *¿por qué tomé este trade?*
- **Skipped a trade** → 5 whys: *¿por qué NO lo tomé?* (discipline is tracked, not just action)
- **On close, if winner** → 5 whys: *¿por qué fue ganador?*
- **On close, if loser** → 5 whys: *¿por qué fue perdedor?*

Each trade also captures emotional state at entry, which links to Mente and powers a future "discipline score."

---

## 3. Data model (Supabase / Postgres)

All tables carry `user_id uuid` with Row-Level Security so a user only ever sees their own rows.

**Identity & life**
- `profiles` — id, display_name, locale, timezone, created_at
- `values` — id, user_id, name, description (the "valores")
- `goals` — id, user_id, name, target_date, status
- `tasks` — id, user_id, title, done, due_at, driver_type (`valor`|`meta`), driver_id, metodo (text), sentido (text), date
- `life_areas` — id, user_id, name (Salud, Dinero, Familia, Mente, Amigos, Misión, Espíritu, Trading)
- `area_scores` — id, user_id, area_id, score (0–10), recorded_at  *(history powers the radar over time)*
- `time_entries` — id, user_id, area_id, hours, week_start, declared_priority (`alta`|`media`|`baja`)

**Mente & gente**
- `ghosts` — id, user_id, name, quote, count, linked_module (e.g. `trading`)
- `decisions` — id, user_id, prompt, ai_response, created_at  *(decision filter log)*
- `people` — id, user_id, name, relation, last_contact_at, birthday, cadence_days
- `interactions` — id, user_id, person_id, note, occurred_at

**Enfoque**
- `audio_tracks` — id, title, artist, category (`enfoque`|`motivación`|`ambiente`), duration_s, storage_path
- `focus_sessions` — id, user_id, track_id, minutes, completed, started_at

**Trading**
- `trades` — id, user_id, ticker, direction (`long`|`short`), type (`tomado`|`no_tomado`), status (`abierto`|`cerrado`), outcome (`ganador`|`perdedor`|null), pnl numeric, r_multiple numeric, emotion, opened_at, closed_at, notes
- `trade_whys` — id, trade_id, phase (`entrada`|`no_entrada`|`resultado`), position (1–5), text
- `watchlist` — id, user_id, ticker, note, target_price, alert_price

> `trade_whys` keeps the 5-Whys flexible: 5 rows per phase, ordered by `position`. A skipped trade has only `no_entrada` whys; a closed trade has `entrada` + `resultado`.

**Metrics** (win rate, avg R, P&L, equity curve, discipline score) are derived from `trades` via SQL views — no duplicate storage.

---

## 4. Auth, security & boundaries

- Supabase email/OAuth auth; RLS on every table keyed to `auth.uid()`.
- Secrets in Vercel env vars; service-role key server-side only.
- **No order execution and no financial advice.** Trading is journaling, analytics, and psychology only — read-only market data at most (a later, optional integration). This is a deliberate scope boundary.

---

## 5. Design tokens

- **Colors:** bg `#0c0e13` · panel `#14171e` · ink `#ECEAE2` · muted `#8b909b` · gold `#C9A961` · green `#5fcf8e` · red `#f0736b` · focus purple `#7b5cff→#c04ce0`
- **Type:** Playfair Display (serif display) · Inter (body) · Space Mono (micro-labels)
- Shared as CSS variables / a Tailwind theme so every module stays consistent.

---

## 6. Phased roadmap

1. **Phase 0 — Scaffold:** Next.js + Tailwind repo on GitHub, Supabase project, Vercel deploy, design tokens, app shell + bottom nav. *(Ship a deployed empty shell.)*
2. **Phase 1 — Auth + Hoy:** Supabase auth, profiles, values/goals/tasks with DMS. First real screen end-to-end.
3. **Phase 2 — Trading:** trades + trade_whys, the new-record flow (took/skipped/winner/loser), metrics views, equity curve, watchlist. *(Your priority module.)*
4. **Phase 3 — Estrella + Tiempo:** life areas, radar with history, time audit + gap flags.
5. **Phase 4 — Mente + Gente:** ghosts, people/interactions, and the two AI features (decision filter, apology protocol).
6. **Phase 5 — Enfoque + PWA:** focus timer, audio library (Supabase Storage), installable PWA, offline, polish.

---

## 7. Next steps

1. Open `brujula-prototipo.html` and click through — confirm the merged flow & the Trading 5-Whys feel right.
2. Tell me the tweaks (names, areas, trading fields, colors).
3. On your go-ahead I'll start **Phase 0**: create the GitHub repo, scaffold Next.js, set up the Supabase schema above, and deploy a live shell to Vercel.
