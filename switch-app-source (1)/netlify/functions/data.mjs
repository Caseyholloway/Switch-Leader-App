import { getStore } from "@netlify/blobs";

// Only these keys can be read or written through this endpoint.
const ALLOWED_KEYS = new Set([
  "roster",
  "students",
  "posts",
  "prayerRequests",
  "celebrations",
  "announcements",
]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!key || !ALLOWED_KEYS.has(key)) {
    return new Response(JSON.stringify({ error: "Unknown or missing key" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  const store = getStore("switch-app-data");

  if (req.method === "GET") {
    try {
      const value = await store.get(key, { type: "json" });
      return new Response(JSON.stringify(value ?? null), {
        status: 200,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Read failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.setJSON(key, body);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Write failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }
  }

  return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
};

export const config = {
  path: "/api/data",
};
