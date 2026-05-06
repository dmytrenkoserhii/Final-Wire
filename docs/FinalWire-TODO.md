# Final Wire — TODO List (Execution Order)

> Виконувати строго зверху вниз. Не переходити до наступного кроку, поки поточний не закритий.

## Status Legend

- `[ ]` not started
- `[-]` in progress
- `[x]` done

---

## 1. Repo Bootstrap

- [х] Створити GitHub repo `core-failure`
- [x] Ініціалізувати структуру: `apps/`, `packages/`, `infra/`, `docs/`
- [x] Додати `pnpm-workspace.yaml`
- [x] Додати root `package.json` scripts (`dev/build/test/lint/typecheck`)
- [x] Додати `tsconfig.base.json`, `.editorconfig`, `.gitignore`, `README.md`
- [ ] Налаштувати ESLint + Prettier

Exit criteria:

- [х] `pnpm install` і `pnpm -r build` проходять локально

---

## 2. App Skeletons

- [x] Створити `apps/web` (Vite + React + TS)
- [x] Створити `apps/api` (NestJS + TS)
- [ ] Додати `GET /api/v1/health`
- [ ] Додати Socket gateway skeleton

Exit criteria:

- [x] `web` + `api` запускаються локально
- [ ] `GET /api/v1/health` повертає `200`

---

## 3. Shared Contracts

- [ ] Створити `packages/shared`
- [ ] Винести enums + DTO + socket event names
- [ ] Додати Zod transport schemas
- [ ] Підключити `shared` у `web` та `api`

Exit criteria:

- [ ] Контракти HTTP/WS імпортуються тільки з `shared`

---

## 4. Database Foundation

- [ ] Створити `001_init.sql` по `[[FinalWire-Database]]`
- [ ] Підняти enum types
- [ ] Створити всі таблиці
- [ ] Додати FK/UNIQUE/CHECK
- [ ] Додати індекси
- [ ] Прогнати міграцію на dev DB

Exit criteria:

- [ ] Схема в БД = `FinalWire-Database.md`

---

## 5. Guest Auth + Identity

- [ ] Реалізувати guest token flow
- [ ] Створювати/оновлювати `players`
- [ ] Видавати short-lived `sessionToken`
- [ ] Додати HTTP auth guard
- [ ] Додати socket auth handshake

Exit criteria:

- [ ] Гість стабільно відновлює identity після reload

---

## 6. Lobby End-to-End

- [ ] `POST /rooms`
- [ ] `GET /rooms/:code`
- [ ] `POST /rooms/:code/join`
- [ ] Socket: `room:create`, `room:join`, `room:setReady`
- [ ] Broadcast `room:state`
- [ ] Host permissions + room capacity checks

Exit criteria:

- [ ] 2–4 гравці збираються в lobby і бачать один стан

---

## 7. Session Start + Runtime Shell

- [ ] Socket `room:startGame`
- [ ] Створення `game_sessions`, `session_players`, `session_modules`
- [ ] Role assignment
- [ ] Server timer init (`startedAt`, `endsAt`)
- [ ] `game:started` + role-safe `game:state`

Exit criteria:

- [ ] Всі гравці переходять у правильний role-view

---

## 8. Module 1 — Wires

- [ ] Generator
- [ ] Operator UI
- [ ] Expert manual section
- [ ] Validation + penalties
- [ ] Persist actions/events

Exit criteria:

- [ ] Wires playable end-to-end

---

## 9. Module 2 — Glyph Sequence

- [ ] Generator
- [ ] Operator UI
- [ ] Expert manual table
- [ ] Validation + persistence

Exit criteria:

- [ ] Glyphs playable end-to-end

---

## 10. Module 3 — Pressure Switches

- [ ] Generator
- [ ] Operator UI
- [ ] Expert rules section
- [ ] Validation + persistence

Exit criteria:

- [ ] Switches playable end-to-end

---

## 11. Module 4 — Keypad Code

- [ ] Generator
- [ ] Operator UI
- [ ] Expert rules section
- [ ] Validation + brute-force protection
- [ ] Persistence

Exit criteria:

- [ ] Keypad playable end-to-end

---

## 12. Win/Loss + Results

- [ ] Win/loss evaluator
- [ ] `game:ended` broadcast
- [ ] Запис `session_results`
- [ ] `GET /sessions/:id/result`
- [ ] Result screen UI

Exit criteria:

- [ ] Повний раунд завершується і має валідний result

---

## 13. Reconnect + Resilience

- [ ] Reconnect handling
- [ ] Rebind player to session
- [ ] Restore role-safe state
- [ ] Operator grace-period policy

Exit criteria:

- [ ] Короткий disconnect не ламає матч

---

## 14. Security + Rate Limits

- [ ] Role/membership checks на всі actions
- [ ] Rate limits (create/join/action)
- [ ] Заборонити витік `solution_state`
- [ ] Логувати rejects

Exit criteria:

- [ ] Базові чит-спроби блокуються сервером

---

## 15. Test Layer

- [ ] Unit: generator/validators/penalties/win-loss
- [ ] Integration: room + session + action flows
- [ ] E2E: 2 browser contexts (Operator/Expert)

Exit criteria:

- [ ] `lint + typecheck + test` стабільно зелені

---

## 16. UX Polish

- [ ] Анімації critical feedback
- [ ] Звуки + mute
- [ ] Accessibility (labels/keyboard/contrast/reduced motion)
- [ ] Responsive tuning

Exit criteria:

- [ ] UX стабільний і читабельний

---

## 17. Infra + CI/CD

- [ ] Dockerfiles (`web`, `api`)
- [ ] `docker-compose` local
- [ ] `ci.yml` (lint/typecheck/test/build)
- [ ] k8s manifests (base + staging)
- [ ] Staging deploy

Exit criteria:

- [ ] Збірка і деплой відтворюються одним documented flow

---

## 18. Final Validation Before MVP Release

- [ ] 5 playtests (2 players)
- [ ] 5 playtests (3 players)
- [ ] 5 playtests (4 players)
- [ ] Закрити всі P0/P1
- [ ] Оновити docs/README

Exit criteria:

- [ ] MVP demo-ready

---

## 19. Post-MVP Queue

- [ ] Optional auth providers
- [ ] Leaderboard
- [ ] Achievements
- [ ] Spectator mode
- [ ] Redis scaling
- [ ] Additional module pack
