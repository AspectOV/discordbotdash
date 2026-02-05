export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve static assets (HTML/CSS/etc.) from /public
    let res = await env.ASSETS.fetch(request);

    // Optional: custom 404 fallback to /index.html (SPAs), NOT recommended for your case.
    // We'll do a simple 404 instead for clarity.
    if (res.status === 404) {
      return new Response("Not Found", { status: 404 });
    }

    // Nice caching for static stuff
    const isHtml = res.headers.get("content-type")?.includes("text/html");
    const headers = new Headers(res.headers);

    if (!isHtml) {
      headers.set("cache-control", "public, max-age=86400");
    } else {
      headers.set("cache-control", "public, max-age=300");
    }

    return new Response(res.body, { status: res.status, headers });
  }
};
