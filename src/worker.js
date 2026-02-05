export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      return new Response("Not Found", { status: 404 });
    }

    const headers = new Headers(response.headers);
    const contentType = headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      headers.set("cache-control", "public, max-age=600");
      headers.set("x-content-type-options", "nosniff");
      headers.set("x-frame-options", "DENY");
      headers.set("referrer-policy", "strict-origin-when-cross-origin");
    } else {
      headers.set("cache-control", "public, max-age=86400");
    }

    return new Response(response.body, {
      status: response.status,
      headers
    });
  }
};
