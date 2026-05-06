# Final Wire — API Contract (MVP)

> Джерело істини для transport-контрактів між `apps/web` і `apps/api`.

## 1. Scope

Покриває:

- HTTP (health, rooms, join, result);
- WebSocket room/game events;
- базовий error model;
- мінімальні валідаційні правила payload.

Пов’язані документи:

- `[[FinalWire]]`
- `[[FinalWire-Database]]`
- `[[FinalWire-Architecture]]`

---

## 2. Conventions

- Формат часу: ISO-8601 UTC (`timestamptz`).
- Ідентифікатори: `uuid`.
- `roomCode`: `^[A-Z0-9]{6,8}$`.
- `difficulty`: `EASY | NORMAL | HARD | CUSTOM`.
- API version prefix (рекомендовано): `/api/v1`.

---

## 3. Auth Model (MVP)

Guest-first:

- клієнт надсилає `guestToken` (з localStorage) або отримує новий;
- сервер повертає `playerId` і `sessionToken` (short-lived).

Header для HTTP:

- `Authorization: Bearer <sessionToken>`

Для Socket:

- `auth: { sessionToken }` під час handshake.

---

## 4. HTTP Endpoints

## 4.1 `GET /api/v1/health`

Призначення: liveness/readiness check.

Response `200`:

```json
{
  "status": "ok",
  "time": "2026-05-06T12:00:00Z",
  "version": "1.0.0"
}
```

## 4.2 `POST /api/v1/rooms`

Створити кімнату.

Request:

```json
{
  "displayName": "Arsen",
  "difficulty": "NORMAL",
  "maxPlayers": 4
}
```

Response `201`:

```json
{
  "roomId": "uuid",
  "roomCode": "A7K2QZ",
  "inviteLink": "https://app/room/A7K2QZ",
  "playerId": "uuid",
  "isHost": true,
  "difficulty": "NORMAL",
  "maxPlayers": 4
}
```

Errors: `400`, `409`, `429`.

## 4.3 `GET /api/v1/rooms/:code`

Отримати lobby snapshot.

Response `200`:

```json
{
  "roomCode": "A7K2QZ",
  "status": "LOBBY",
  "difficulty": "NORMAL",
  "maxPlayers": 4,
  "hostPlayerId": "uuid",
  "players": [
    {
      "playerId": "uuid",
      "displayName": "Arsen",
      "isHost": true,
      "isReady": true
    }
  ]
}
```

Errors: `404`, `410`.

## 4.4 `POST /api/v1/rooms/:code/join`

Приєднатись до кімнати.

Request:

```json
{
  "displayName": "Max"
}
```

Response `200`:

```json
{
  "roomId": "uuid",
  "roomCode": "A7K2QZ",
  "playerId": "uuid",
  "isHost": false,
  "status": "LOBBY"
}
```

Errors: `400`, `404`, `409`, `423`.

## 4.5 `GET /api/v1/sessions/:id/result`

Фінальний результат сесії.

Response `200`:

```json
{
  "sessionId": "uuid",
  "won": true,
  "score": 2480,
  "timeRemainingSec": 41,
  "finalStability": 62,
  "mistakes": 3,
  "modules": [
    { "moduleKey": "WIRES", "state": "SOLVED", "mistakes": 1 },
    { "moduleKey": "GLYPHS", "state": "SOLVED", "mistakes": 0 }
  ],
  "endedAt": "2026-05-06T12:12:10Z"
}
```

Errors: `403`, `404`.

---

## 5. WebSocket Contract

Namespace: `/game` (рекомендовано).

## 5.1 Client -> Server Events

### `room:create`

```json
{
  "displayName": "Arsen",
  "difficulty": "NORMAL",
  "maxPlayers": 4,
  "clientEventId": "uuid"
}
```

### `room:join`

```json
{
  "roomCode": "A7K2QZ",
  "displayName": "Max",
  "clientEventId": "uuid"
}
```

### `room:setReady`

```json
{
  "roomCode": "A7K2QZ",
  "isReady": true,
  "clientEventId": "uuid"
}
```

### `room:startGame`

```json
{
  "roomCode": "A7K2QZ",
  "clientEventId": "uuid"
}
```

### `game:action`

```json
{
  "sessionId": "uuid",
  "moduleId": "uuid",
  "actionType": "CUT_WIRE",
  "payload": { "wireId": "wire_2" },
  "clientActionId": "uuid"
}
```

### `game:ping`

```json
{
  "sessionId": "uuid",
  "clientTs": 1715000000000
}
```

## 5.2 Server -> Client Events

### `room:created`

```json
{
  "roomId": "uuid",
  "roomCode": "A7K2QZ",
  "playerId": "uuid",
  "isHost": true,
  "difficulty": "NORMAL",
  "maxPlayers": 4
}
```

### `room:state`

Broadcast snapshot після будь-якої lobby-зміни.

```json
{
  "roomCode": "A7K2QZ",
  "status": "LOBBY",
  "difficulty": "NORMAL",
  "maxPlayers": 4,
  "players": [
    {
      "playerId": "uuid",
      "displayName": "Arsen",
      "isHost": true,
      "isReady": true,
      "role": null
    }
  ],
  "updatedAt": "2026-05-06T12:01:10Z"
}
```

### `game:started`

```json
{
  "sessionId": "uuid",
  "role": "OPERATOR",
  "timer": {
    "startedAt": "2026-05-06T12:02:00Z",
    "endsAt": "2026-05-06T12:08:00Z",
    "serverNow": "2026-05-06T12:02:00Z"
  },
  "stability": 100,
  "difficulty": "NORMAL"
}
```

### `game:state`

Role-safe runtime state.

Operator view:

```json
{
  "sessionId": "uuid",
  "role": "OPERATOR",
  "status": "ACTIVE",
  "timer": { "endsAt": "2026-05-06T12:08:00Z", "serverNow": "2026-05-06T12:03:00Z" },
  "stability": 90,
  "modules": [{ "moduleId": "uuid", "moduleKey": "WIRES", "state": "PENDING", "publicState": {} }]
}
```

Expert view:

```json
{
  "sessionId": "uuid",
  "role": "EXPERT",
  "status": "ACTIVE",
  "timer": { "endsAt": "2026-05-06T12:08:00Z", "serverNow": "2026-05-06T12:03:00Z" },
  "stability": 90,
  "manual": {
    "version": "mvp-1",
    "sections": []
  }
}
```

### `game:actionResult`

```json
{
  "clientActionId": "uuid",
  "accepted": false,
  "moduleId": "uuid",
  "moduleState": "PENDING",
  "penalty": {
    "stabilityDelta": -10,
    "timeDeltaSec": -5,
    "penaltyType": "STABILITY_AND_TIME"
  },
  "stability": 80,
  "serverNow": "2026-05-06T12:03:12Z"
}
```

### `game:ended`

```json
{
  "sessionId": "uuid",
  "status": "WON",
  "endReason": "ALL_MODULES_SOLVED",
  "result": {
    "score": 2480,
    "timeRemainingSec": 41,
    "finalStability": 62,
    "mistakes": 3
  }
}
```

### `game:pong`

```json
{
  "sessionId": "uuid",
  "serverTs": 1715000000042
}
```

---

## 6. Socket Ack/Error Envelope

Кожен client->server event може отримати ack:

Success:

```json
{
  "ok": true,
  "event": "game:action",
  "requestId": "uuid",
  "data": {}
}
```

Error:

```json
{
  "ok": false,
  "event": "game:action",
  "requestId": "uuid",
  "error": {
    "code": "ACTION_INVALID",
    "message": "Action payload is invalid for module state",
    "details": { "moduleId": "uuid" }
  }
}
```

---

## 7. Error Codes

## 7.1 HTTP Status

- `400` bad request / validation failed
- `401` unauthorized
- `403` forbidden
- `404` not found
- `409` conflict
- `410` gone (expired room/session)
- `423` locked (room already in game)
- `429` rate limit
- `500` internal error

## 7.2 Domain Error Codes

- `AUTH_REQUIRED`
- `AUTH_INVALID_TOKEN`
- `PLAYER_NOT_FOUND`
- `ROOM_NOT_FOUND`
- `ROOM_EXPIRED`
- `ROOM_FULL`
- `ROOM_NOT_JOINABLE`
- `ROOM_NOT_HOST`
- `ROOM_NOT_READY`
- `SESSION_NOT_FOUND`
- `SESSION_NOT_ACTIVE`
- `ROLE_FORBIDDEN`
- `ACTION_INVALID`
- `ACTION_RATE_LIMITED`
- `MODULE_NOT_FOUND`
- `MODULE_ALREADY_SOLVED`
- `STATE_OUT_OF_SYNC`
- `INTERNAL_ERROR`

---

## 8. Validation Rules (MVP)

- `displayName`: 2..24 chars, trim, no control chars.
- `maxPlayers`: integer `2..4`.
- `difficulty`: enum only.
- `clientActionId/clientEventId`: uuid v4.
- `moduleId/sessionId/playerId`: uuid format.
- payload fields залежать від `actionType` + `moduleKey`.

---

## 9. Idempotency and Ordering

- Усі mutating socket events мають `clientEventId` або `clientActionId`.
- Сервер дедуплікує повторні події в межах сесії.
- Обробка дій — послідовна на рівні `sessionId`.
- Відповідь містить `serverNow` для корекції локального таймера.

---

## 10. Versioning Strategy

- Поточна версія: `v1`.
- Будь-який breaking change:
  - або новий endpoint/event name;
  - або нова версія namespace `/api/v2`, `/game-v2`.
- Додаткові поля можна додавати non-breaking, якщо клієнт толерантний.
