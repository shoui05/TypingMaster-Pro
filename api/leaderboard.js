// Global leaderboard — Vercel serverless function backed by Upstash Redis (REST).
// Env: KV_REST_API_URL + KV_REST_API_TOKEN  (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'typewarrior:lb';
const MAX_ENTRIES = 500;

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error('redis ' + r.status);
  return (await r.json()).result;
}

export function validate(b) {
  const name = String(b?.name ?? '').replace(/[^\p{L}\p{N} _.-]/gu, '').trim().slice(0, 16);
  const wpm = Math.round(Number(b?.wpm)), acc = Math.round(Number(b?.acc)), secs = Number(b?.secs);
  if (name.length < 2) return { error: 'Name must be 2-16 characters' };
  if (!(wpm >= 1 && wpm <= 250)) return { error: 'Invalid WPM' };
  if (!(acc >= 60 && acc <= 100)) return { error: 'Accuracy must be 60-100' };
  if (!(secs >= 30)) return { error: 'Test too short (min 30s)' };
  return { name, wpm, acc };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!URL_ || !TOKEN) return res.status(503).json({ error: 'Leaderboard not configured' });
  try {
    if (req.method === 'GET') {
      const raw = (await redis(['ZREVRANGE', KEY, 0, 19, 'WITHSCORES'])) || [];
      const rows = [];
      for (let i = 0; i < raw.length; i += 2) {
        const [name, wpm, acc, ts] = raw[i].split('|');
        rows.push({ name, wpm: +wpm, acc: +acc, ts: +ts });
      }
      return res.status(200).json({ rows });
    }
    if (req.method === 'POST') {
      const v = validate(typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
      if (v.error) return res.status(400).json({ error: v.error });
      const score = v.wpm + v.acc / 1000;
      await redis(['ZADD', KEY, score, `${v.name}|${v.wpm}|${v.acc}|${Date.now()}`]);
      await redis(['ZREMRANGEBYRANK', KEY, 0, -(MAX_ENTRIES + 1)]);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
