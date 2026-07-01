const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const THOUGHTS = [
  'Why is the build red? It was green when I looked away for 4 seconds.',
  'This could have been a meeting. Wait, no. This SHOULD be a meeting.',
  'If I add one more person to the project, it will go faster. That is how math works.',
  'The demo is Thursday. Everything is fine. The demo is Thursday. Everything is fine.',
  'Quick question (45 minutes minimum).',
  'What if we just... rewrote it in the new framework?',
  'I trust the team completely. Anyway, any updates? Any updates? Updates?',
  'Two-week task? Sounds like a two-day task with extra steps.',
];

const WANTS = [
  { want: 'A status update', urgency: 'CRITICAL', lastAskedMinutesAgo: 4 },
  { want: 'The feature done yesterday', urgency: 'CRITICAL', note: 'Was only requested today' },
  { want: 'A "quick sync"', urgency: 'HIGH', estimatedDuration: '1h+' },
  { want: 'The Jira board updated', urgency: 'CRITICAL', note: 'The board IS the work' },
  { want: 'One tiny change before release', urgency: 'HIGH', actualSize: 'complete redesign' },
];

const MOODS = {
  Monday: 'Optimistic. Dangerous amounts of new ideas over the weekend.',
  Tuesday: 'Focused. Do not approach without a Jira ticket.',
  Wednesday: 'Asking why the sprint is only 50% done at 50% of the sprint.',
  Thursday: 'Pre-demo panic. Approach with coffee only.',
  Friday: 'Suspiciously relaxed. Will remember everything on Monday.',
  Saturday: 'Sending Slack messages "not to be read until Monday" (read them now).',
  Sunday: 'Planning. Be afraid.',
};

// GET /thoughts/current — what Romio is thinking RIGHT NOW
app.get('/thoughts/current', (req, res) => {
  res.json({
    thought: pick(THOUGHTS),
    confidence: 1.0,
    openTabsInBrain: 47,
    disclaimer: 'Thought may change before this response finishes streaming.',
  });
});

// GET /mood — current mood, derived from day of week
app.get('/mood', (req, res) => {
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  res.json({ day, mood: MOODS[day], coffeeLevel: 'insufficient' });
});

// GET /wants — what Romio wants from you right now
app.get('/wants', (req, res) => {
  res.json({ wants: [pick(WANTS)], totalWantsInQueue: Infinity.toString() });
});

// GET /priorities — the current priority list
app.get('/priorities', (req, res) => {
  res.json({
    priorities: [
      { rank: 1, item: 'Everything', level: 'P0' },
      { rank: 1, item: 'Also everything else', level: 'P0' },
      { rank: 1, item: 'The thing from the hallway conversation', level: 'P0' },
    ],
    note: 'All priorities are top priority. That is what makes them priorities.',
  });
});

// GET /estimate/:days — feed your estimate into Romio's mental compiler
app.get('/estimate/:days', (req, res) => {
  const days = parseFloat(req.params.days);
  if (isNaN(days)) {
    return res.status(400).json({ error: 'Estimates must be numbers. Nice try though.' });
  }
  res.json({
    yourEstimate: `${days} days`,
    romioHears: `${Math.max(days / 2, 0.5)} days`,
    romioTellsUpperManagement: `${Math.max(days / 4, 0.5)} days`,
    alreadyPromisedToCustomer: 'yesterday',
  });
});

// POST /ideas — submit an idea to Romio's mind
app.post('/ideas', (req, res) => {
  res.status(202).json({
    status: 'accepted',
    message: 'Great idea! Let\'s park it and circle back.',
    parkingLot: { position: 3187, estimatedCircleBack: 'Q9 2031' },
  });
});

// POST /vacation-request — good luck
app.post('/vacation-request', (req, res) => {
  res.status(409).json({
    error: 'VacationConflictError',
    message: 'Request conflicts with the sprint. There is always a sprint.',
    suggestion: 'Have you considered vacationing during the retro?',
  });
});

// GET /meetings/necessary — list of strictly necessary meetings
app.get('/meetings/necessary', (req, res) => {
  res.json([]);
});

// GET /meetings/scheduled — list of scheduled meetings
app.get('/meetings/scheduled', (req, res) => {
  res.status(507).json({
    error: 'InsufficientStorage',
    message: 'Response exceeds maximum payload size. Try paginating by decade.',
  });
});

// DELETE /scope — attempt to remove scope from the sprint
app.delete('/scope', (req, res) => {
  res.status(403).json({
    error: 'ScopeViolation',
    message: 'Scope is append-only. This is a write-once, remove-never data structure.',
  });
});

// GET /attention?topic=... — check if Romio remembers your topic
app.get('/attention', (req, res) => {
  const topic = req.query.topic || 'your project';
  res.json({
    topic,
    remembered: Math.random() > 0.7,
    note: 'Attention is garbage-collected every 15 minutes. Re-ping to retain.',
  });
});

app.listen(PORT, () => {
  console.log(`Romio's mind is now readable at http://localhost:${PORT}`);
  console.log('Warning: contents may be under-caffeinated.');
});
