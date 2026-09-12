export default {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);
    if (incomingUrl.protocol === "http:") {
      incomingUrl.protocol = "https:";
      return Response.redirect(incomingUrl, 301);
    }

    const originUrl = new URL(request.url);
    originUrl.protocol = "http:";
    originUrl.hostname = "127.0.0.1";
    originUrl.port = "8001";

    const headers = new Headers(request.headers);
    const connectingIp = request.headers.get("CF-Connecting-IP");
    headers.set("X-Forwarded-Host", incomingUrl.host);
    headers.set("X-Forwarded-Proto", "https");
    if (connectingIp) {
      headers.set("X-Forwarded-For", connectingIp);
      headers.set("X-Real-IP", connectingIp);
    }

    const originRequest = new Request(originUrl, {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });
    const originResponse = await env.AMANDA_ORIGIN.fetch(originRequest);
    if (originResponse.webSocket) {
      return originResponse;
    }

    const responseHeaders = new Headers(originResponse.headers);
    responseHeaders.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
    const sessionCookie = responseHeaders.get("Set-Cookie");
    if (sessionCookie && !/(?:^|;\s*)Secure(?:;|$)/i.test(sessionCookie)) {
      responseHeaders.set("Set-Cookie", `${sessionCookie}; Secure`);
    }

    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: responseHeaders,
    });
  },
};
