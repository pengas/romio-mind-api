# Romio Mind API 🧠

> Read-only REST access to Romio's mind. Because asking him directly triggers a meeting.

For years, developers have wondered: *what does Romio actually think, and what does he want from me right now?* Wonder no more. This API exposes Romio's brain over HTTP so you can poll it like the unstable external service it is.

**Write access is not available.** Many have tried. All were assigned action items.

## Getting Started

```bash
npm install
npm start
```

Romio's mind boots on `http://localhost:3000`. Cold start takes until his second coffee.

## Endpoints

### `GET /thoughts/current`

Returns whatever Romio is thinking at this exact moment. Highly volatile — do not cache.

```bash
curl http://localhost:3000/thoughts/current
```

```json
{
  "thought": "Quick question (45 minutes minimum).",
  "confidence": 1.0,
  "openTabsInBrain": 47,
  "disclaimer": "Thought may change before this response finishes streaming."
}
```

### `GET /mood`

Current mood, computed deterministically from the day of the week. Check this **before** approaching his desk.

```bash
curl http://localhost:3000/mood
```

```json
{
  "day": "Thursday",
  "mood": "Pre-demo panic. Approach with coffee only.",
  "coffeeLevel": "insufficient"
}
```

### `GET /wants`

What Romio wants from you right now. The queue is technically unbounded.

```bash
curl http://localhost:3000/wants
```

```json
{
  "wants": [
    { "want": "A status update", "urgency": "CRITICAL", "lastAskedMinutesAgo": 4 }
  ],
  "totalWantsInQueue": "Infinity"
}
```

### `GET /priorities`

The current priority list. Spoiler: everything is P0, and every rank is 1.

### `GET /estimate/:days`

Pass your honest estimate through Romio's mental compiler and see what comes out the other side.

```bash
curl http://localhost:3000/estimate/10
```

```json
{
  "yourEstimate": "10 days",
  "romioHears": "5 days",
  "romioTellsUpperManagement": "2.5 days",
  "alreadyPromisedToCustomer": "yesterday"
}
```

### `POST /ideas`

Submit an idea. Always returns `202 Accepted` — into the parking lot, where ideas achieve immortality by never being circled back to.

```bash
curl -X POST http://localhost:3000/ideas \
  -H "Content-Type: application/json" \
  -d '{"idea": "what if we wrote tests"}'
```

```json
{
  "status": "accepted",
  "message": "Great idea! Let's park it and circle back.",
  "parkingLot": { "position": 3187, "estimatedCircleBack": "Q9 2031" }
}
```

### `POST /vacation-request`

Returns `409 Conflict`. It always conflicts with the sprint. There is always a sprint.

### `GET /meetings/necessary`

Returns the complete list of strictly necessary meetings:

```json
[]
```

### `GET /meetings/scheduled`

Returns `507 Insufficient Storage`. The payload does not fit in a single HTTP response. Try paginating by decade.

### `DELETE /scope`

Returns `403 Forbidden`. Scope is an append-only data structure. This is by design. Whose design remains under investigation.

### `GET /attention?topic=yourProject`

Check whether Romio still remembers your topic. Attention is garbage-collected every 15 minutes; re-ping to retain.

## Rate Limits

None on reads. Romio's thoughts are generated faster than any client can consume them.

## Error Handling

All errors are the sprint's fault.

## Contributing

PRs welcome. They will be reviewed right after the parking lot is circled back to (see `POST /ideas` for your position in queue).

## Disclaimer

This API is a joke and a token of affection for our dev manager. Any resemblance to actual thoughts, living or in a meeting, is purely statistical.
