const TOKEN_COOKIE = "rm_api_token"

function isBrowser() {
  return typeof window !== "undefined"
}

// Read cookie value by name from document.cookie
// Note: HttpOnly cookies are NOT readable here —
// this only works for non-HttpOnly cookies.
// We use this only to check presence via a separate
// /auth/status endpoint on the worker instead.
export function getTokenFromCookie(): string | null {
  if (!isBrowser()) return null
  const match = document.cookie
    .match(new RegExp(`(?:^|;\\s*)${TOKEN_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

// Since the cookie is HttpOnly, JS cannot read it.
// We derive token status from what the worker returns
// on the OAuth response — we store only metadata (expiry),
// not the token itself.
const EXPIRY_KEY = "rm_token_expiry"

export function setTokenExpiry(expiresInSeconds: number) {
  if (!isBrowser()) return
  const expiresAt = Date.now() + expiresInSeconds * 1000
  sessionStorage.setItem(EXPIRY_KEY, expiresAt.toString())
}

export function getTokenExpiry(): number | null {
  if (!isBrowser()) return null
  const raw = sessionStorage.getItem(EXPIRY_KEY)
  return raw ? parseInt(raw, 10) : null
}

export function tokenSecondsRemaining(): number | null {
  const expiry = getTokenExpiry()
  if (expiry === null) return null
  return Math.floor((expiry - Date.now()) / 1000)
}

export function isTokenExpired(): boolean {
  const secs = tokenSecondsRemaining()
  if (secs === null) return false
  return secs <= 0
}

export function tokenExpiryLabel(): string | null {
  const secs = tokenSecondsRemaining()
  if (secs === null) return null
  if (secs <= 0) return "expired"
  if (secs < 3600) return `${Math.floor(secs / 60)} min`
  if (secs < 86400) return `${Math.floor(secs / 3600)} hr`
  return `${Math.floor(secs / 86400)} days`
}

export function deriveTokenStatus(): "missing" | "expired" | "active" {
  const expiry = getTokenExpiry()
  if (expiry === null) return "missing"
  if (isTokenExpired()) return "expired"
  return "active"
}

export function clearTokenExpiry() {
  if (!isBrowser()) return
  sessionStorage.removeItem(EXPIRY_KEY)
}