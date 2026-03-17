interface PlaygroundRequest {
  method: string
  body?: any
  url: string
  headers?: Record<string, string>
}

const allowedHosts = [
  "sb-open.revenuemonster.my",
  "open.revenuemonster.my",
  "sb-oauth.revenuemonster.my",
  "oauth.revenuemonster.my"
]

const TOKEN_COOKIE = "rm_api_token"
const OAUTH_PATHS = ["/v1/token"]

function isOAuthEndpoint(url: string): boolean {
  try {
    const parsed = new URL(url)
    return (
      allowedHosts.includes(parsed.hostname) &&
      OAUTH_PATHS.some((p) => parsed.pathname === p)
    )
  } catch {
    return false
  }
}

function buildCorsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Signature, X-Nonce-Str, X-Timestamp",
    "Access-Control-Allow-Credentials": "true",
  }
}

function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith(`${name}=`))
  return match ? match.slice(name.length + 1) : null
}

function isLocalhost(origin: string): boolean {
  return origin.includes("localhost") || origin.includes("127.0.0.1")
}

export default {
  async fetch(request: Request): Promise<Response> {
    const origin = request.headers.get("Origin") || "*"
    const corsHeaders = buildCorsHeaders(origin)
    const local = isLocalhost(origin)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method === "GET") {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders
      })
    }

    try {
      const { method, body, url, headers } =
        await request.json() as PlaygroundRequest

      if (!url || !method) {
        return new Response(
          JSON.stringify({ error: "Missing url or method" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        )
      }

      const urlObj = new URL(url)
      if (!allowedHosts.includes(urlObj.hostname)) {
        return new Response(
          JSON.stringify({ error: "Host not allowed" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        )
      }

      const finalHeaders: Record<string, string> = { ...headers }

      // Read HttpOnly cookie and inject as Authorization header
      // Token never touches frontend JS
      const cookieHeader = request.headers.get("Cookie")
      const tokenFromCookie = getCookieValue(cookieHeader, TOKEN_COOKIE)

      if (tokenFromCookie && !isOAuthEndpoint(url)) {
        if (!finalHeaders["Authorization"]) {
          finalHeaders["Authorization"] = `Bearer ${tokenFromCookie}`
        }
      }

      const requestBody =
        body && typeof body !== "string"
          ? JSON.stringify(body)
          : body

      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: requestBody
      })

      const responseText = await response.text()

      // Intercept OAuth token endpoint — set cookie, hide raw token
      if (isOAuthEndpoint(url) && response.ok) {
        try {
          const parsed = JSON.parse(responseText)
          const token = parsed?.accessToken
          const expiresIn = parsed?.expiresIn ?? 2591999

          if (token) {
            // On localhost: omit Secure and SameSite=None
            // because HTTP doesn't support Secure cookies
            const cookieParts = [
              `${TOKEN_COOKIE}=${token}`,
              "HttpOnly",
              `Max-Age=${expiresIn}`,
              "Path=/",
            ]

            if (!local) {
              cookieParts.push("Secure")
              cookieParts.push("SameSite=None")
            }

            const cookie = cookieParts.join("; ")

            return new Response(
              JSON.stringify({
                success: true,
                tokenType: parsed.tokenType,
                expiresIn: parsed.expiresIn,
              }),
              {
                status: 200,
                headers: {
                  ...corsHeaders,
                  "Content-Type": "application/json",
                  "Set-Cookie": cookie,
                }
              }
            )
          }
        } catch {
          // parsing failed, fall through
        }
      }

      return new Response(responseText, {
        status: response.status,
        headers: {
          ...corsHeaders,
          "Content-Type":
            response.headers.get("Content-Type") || "application/json"
        }
      })

    } catch (err: any) {
      return new Response(
        JSON.stringify({
          error: "Worker crashed",
          message: err?.message || "Unknown error"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }
  }
}