// Vercel Serverless Function — visitor counter backed by Upstash Redis (Vercel KV).
//
//   GET /api/views          -> reads the current count (no increment)
//   GET /api/views?hit=1     -> increments, then returns the new count
//
// Zero npm dependencies: uses the Upstash REST API over global fetch.
// It reads its credentials from whichever env-var names your store created —
// Vercel KV uses KV_REST_API_*, the Upstash Marketplace integration uses
// UPSTASH_REDIS_REST_*. Until a store is connected, it returns count:null so
// the front-end simply stays hidden (no broken UI).

export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  res.setHeader("Cache-Control", "no-store");

  // Not configured yet — tell the client so it can stay gracefully hidden.
  if (!url || !token) {
    return res.status(200).json({ count: null, configured: false });
  }

  const hit = req.query && (req.query.hit === "1" || req.query.hit === 1);
  const command = hit ? "incr" : "get";

  try {
    const r = await fetch(`${url}/${command}/portfolio:views`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await r.json();
    const count = data.result == null ? 0 : (parseInt(data.result, 10) || 0);
    return res.status(200).json({ count, configured: true });
  } catch (err) {
    return res.status(200).json({ count: null, configured: true, error: true });
  }
}
