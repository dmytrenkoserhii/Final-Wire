# Final Wire — Design Doc (MVP)

> Кооперативна браузерна puzzle-гра, де **Operator** бачить панель реактора, а **Experts** — мануал.

## TL;DR

- Жанр: кооперативна асиметрична multiplayer puzzle game.
- Гравці: 2–4.
- Тривалість сесії: 5–15 хв.
- Платформа: браузер (desktop-first, mobile-friendly пізніше).
- Фокус MVP: стабільний real-time loop, 4 модулі, зрозумілий мануал, реплейабельність.

## Навігація по документах

- Продукт/геймдизайн (цей документ): `[[FinalWire]]`
- База даних: `[[FinalWire-Database]]`
- Архітектура репозиторію та деплой-контур: `[[FinalWire-Architecture]]`

---

## 1. Концепт

### 1.1. Суть гри

Команда намагається стабілізувати аварійний sci-fi реактор до завершення таймера.

- **Operator**: бачить інтерактивну панель (дроти, тумблери, кнопки, коди, індикатори).
- **Experts**: бачать правила у мануалі, але не бачать панель.
- Перемога залежить від швидкої та точної комунікації.

### 1.2. Чому це працює

- Неповна інформація створює напругу.
- Ролі змушують говорити “по суті”.
- Випадкова генерація модулів дає високу повторюваність.

---

## 2. Дизайн-напрям

### 2.1. Тема

Не “бомба”, а **нестабільний реактор / аварійний пристрій**.

### 2.2. Візуальна мова

- dark sci-fi control panel;
- метал/скло/неон-індикатори;
- SVG-елементи, лампи, дрібний noise;
- warning/critical стани через світло, анімацію й звук.

### 2.3. Чого **немає** в MVP

- 3D/Three.js/Phaser;
- складної фізики;
- вбудованого voice chat;
- “action” механік.

---

## 3. Player Experience Goals

- “ми команда, без синхрону програємо”;
- “я не бачу всього, треба питати”;
- “кожна дія важлива”;
- “на межі провалу, але витягнули”;
- “хочу ще раунд, бо панель буде іншою”.

---

## 4. Core Gameplay Loop

1. Host створює кімнату.
2. Гравці приєднуються за кодом/лінком.
3. Host обирає складність і стартує.
4. Сервер генерує run: seed, таймер, модулі, ролі, рішення.
5. Призначення ролей: 1 Operator, інші Experts.
6. Команда комунікує й виконує дії.
7. Сервер валідує кожну дію.
8. Правильні дії рухають до перемоги; помилки зменшують stability/час.
9. Кінець гри: Win (всі required modules solved) або Loss (timer/stability = 0).
10. Показ summary/result screen.

---

## 5. Ролі

### 5.1. Operator

- бачить панель реактора;
- взаємодіє з модулями;
- не бачить правил і правильних відповідей.

### 5.2. Expert

- бачить мануал;
- інструктує Operator;
- не бачить live-панель.

### 5.3. Розподіл

- 2 гравці: 1 Operator + 1 Expert.
- 3–4 гравці: 1 Operator + 2–3 Experts.

---

## 6. Правила й системи

### 6.1. Win/Loss

- Win: всі required modules solved до завершення таймера.
- Loss: timer = 0 або stability = 0.

### 6.2. Помилки й штрафи

- `stability -X`
- `time -Y`
- lock/noise/warning

Базово:

- easy: `-5 stability`
- normal: `-10 stability`
- hard: `-15 stability` + `-10s`

### 6.3. Таймер

- easy: 8 хв
- normal: 6 хв
- hard: 4 хв
- custom: host-configurable

### 6.4. Stability

- старт: `100%`
- максимум: `100%`

---

## 7. Модулі MVP

- Coolant Wires
- Glyph Sequence
- Pressure Switches
- Keypad Code

Принцип: короткі, читабельні правила мануалу + достатня варіативність.

---

## 8. Backlog (Product)

### Must-have

- rooms/lobby
- start game + role assignment
- timer + stability
- 4 модулі
- authoritative validation
- win/loss + result screen

### Should-have

- reconnect flow
- базові анімації/звук
- guest identity persistence
- difficulty tuning

### Won’t-have (MVP)

- voice chat
- matchmaking
- 3D
- mobile-first UX
- monetization

---

## 9. Product Vision

**Final Wire** — компактна, стильна, реплейабельна кооперативна real-time браузерна гра для портфоліо.

> One-liner: “A cooperative real-time browser puzzle game where one player sees the failing reactor, while the others hold the manual.”
