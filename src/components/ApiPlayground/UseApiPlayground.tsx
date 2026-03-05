import { useState, useMemo, useEffect } from "react";
import {
  getToken,
  setTokenWithExpiry,
  isTokenExpired,
  clearToken,
} from "../../utils/auth";
import {
  getPrivateKey,
  setPrivateKey as storePrivateKey,
  hasPrivateKey,
  clearPrivateKey,
} from "../../utils/privateKey";

/* ================= TYPES ================= */

export type TokenStatus = "missing" | "expired" | "active";

export type UrlConfig = string | { sandbox: string; prod: string };

export type PlaygroundProps = {
  method: string;
  title?: string;
  url?: UrlConfig;
  body?: string | { type: "json"; example?: string };
  requiresSignature?: boolean;
  requiresAccessToken?: boolean;
  /** Example request body shown in static code snippets */
  exampleRequest?: string; // raw cURL from frontmatter examples.request
};

/* ─── helpers ─────────────────────────────────────────────────────── */

function deriveTokenStatus(): TokenStatus {
  const token = getToken();
  if (!token) return "missing";
  if (isTokenExpired()) return "expired";
  return "active";
}

const sortObject = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = sortObject(obj[key]);
        return acc;
      }, {});
  }
  return obj;
};

/* ================= HOOK ================= */

export function useApiPlayground(props: PlaygroundProps) {
  const requiresSignature = props.requiresSignature ?? true;
  const requiresAccessToken = props.requiresAccessToken ?? true;
  const isOAuth = !requiresSignature && !requiresAccessToken;

  /* ── env ── */
  const hasEnv = typeof props.url !== "string";
  const [env, setEnv] = useState<"sandbox" | "prod">("sandbox");
  const baseUrl =
    typeof props.url === "string" ? props.url : (props.url as any)?.[env] ?? "";

  /* ── sandbox url (used for static snippets) ── */
  const sandboxUrl =
    typeof props.url === "string"
      ? props.url
      : (props.url as any)?.sandbox ?? "";

  /* ── url params ── */
  const paramKeys = useMemo(
    () => Array.from(baseUrl.matchAll(/{([^}]+)}/g)).map((m: any) => m[1]),
    [baseUrl]
  );
  const [params, setParams] = useState<Record<string, string>>({});
  const resolvedUrl = useMemo(
    () =>
      paramKeys.reduce(
        (url: string, key: string) => url.replace(`{${key}}`, params[key] ?? key),
        baseUrl
      ),
    [baseUrl, paramKeys, params]
  );

  /* ── auth ── */
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>(deriveTokenStatus);
  const [keyLoaded, setKeyLoaded] = useState(hasPrivateKey);

  useEffect(() => {
    const check = () => setTokenStatus(deriveTokenStatus());
    window.addEventListener("focus", check);
    return () => window.removeEventListener("focus", check);
  }, []);

  const handleClearToken = () => {
    clearToken();
    setTokenStatus("missing");
  };

  const handleLoadKey = (key: string) => {
    storePrivateKey(key);
    setKeyLoaded(true);
  };

  const handleClearKey = () => {
    clearPrivateKey();
    setKeyLoaded(false);
  };

  /* ── form state ── */
  const initialHeaders = isOAuth
    ? { Authorization: "Basic base64(clientId:clientSecret)" }
    : {};

  const [headers, setHeaders] = useState<Record<string, string>>(initialHeaders);
  const [jsonBody, setJsonBody] = useState(
    typeof props.body === "string"
      ? props.body
      : props.body?.type === "json"
      ? (props.body as any).example ?? "{}"
      : "{}"
  );

  /* ── response state ── */
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [missedSignature, setMissedSignature] = useState(false);

  /* ── signature ── */
  const generateNonce = () => crypto.randomUUID().replace(/-/g, "");
  const generateTimestamp = () => Math.floor(Date.now() / 1000).toString();

  const importPrivateKey = async (pem: string) => {
    const cleaned = pem
      .replace(/-----BEGIN.*?-----/, "")
      .replace(/-----END.*?-----/, "")
      .replace(/\s/g, "");
    const binaryDer = window.atob(cleaned);
    const binaryArray = Uint8Array.from(binaryDer, (c) => c.charCodeAt(0));
    return crypto.subtle.importKey(
      "pkcs8",
      binaryArray.buffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );
  };

  const signRSA = async (
    privateKeyPem: string,
    method: string,
    fullUrl: string,
    body: any
  ) => {
    const nonce = generateNonce();
    const timestamp = generateTimestamp();

    let base64Data = "";
    if (body && Object.keys(body).length > 0) {
      base64Data = btoa(JSON.stringify(sortObject(body)));
    }

    let plainText = "";
    if (base64Data) plainText += `data=${base64Data}&`;
    plainText +=
      `method=${method.toLowerCase()}` +
      `&nonceStr=${nonce}` +
      `&requestUrl=${fullUrl}` +
      `&signType=sha256` +
      `&timestamp=${timestamp}`;

    const key = await importPrivateKey(privateKeyPem);
    const signatureBuffer = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(plainText)
    );
    const signature = btoa(
      String.fromCharCode(...new Uint8Array(signatureBuffer))
    );
    return { signature, nonce, timestamp };
  };

  /* ── send ── */
  const send = async () => {
    if (requiresAccessToken && tokenStatus !== "active") {
      setResponse({
        _error:
          tokenStatus === "expired"
            ? "Access token expired. Re-run Client Credentials to get a new one."
            : "No access token. Run Client Credentials first.",
      });
      setStatus(401);
      return;
    }


    try {
      setLoading(true);
      setResponse(null);
      setStatus(null);

      let requestBody: any;
      if (!["GET", "DELETE"].includes(props.method)) {
        requestBody = JSON.parse(jsonBody || "{}");
      }

      const finalHeaders: Record<string, string> = { ...headers };

      if (requestBody !== undefined) {
        finalHeaders["Content-Type"] = "application/json";
      }

      let sentWithoutSignature = false;

      if (!isOAuth) {
        if (requiresAccessToken) {
          finalHeaders["Authorization"] = `Bearer ${getToken()}`;
        }
        if (requiresSignature) {
          if (hasPrivateKey()) {
            const { signature, nonce, timestamp } = await signRSA(
              getPrivateKey(),
              props.method,
              resolvedUrl,
              requestBody
            );
            finalHeaders["X-Timestamp"] = timestamp;
            finalHeaders["X-Nonce-Str"] = nonce;
            finalHeaders["X-Signature"] = `sha256 ${signature}`;
          } else {
            sentWithoutSignature = true;
          }
        }
      }

      setMissedSignature(sentWithoutSignature);

      const res = await fetch(
        "https://rm-api-proxy.aiman-danish.workers.dev",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: resolvedUrl,
            method: props.method,
            headers: finalHeaders,
            body: requestBody,
          }),
        }
      );

      const text = await res.text();
      setStatus(res.status);

      let parsed: any;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }

      setResponse(parsed);

      // Auto-store token from OAuth response
      if (
        isOAuth &&
        res.ok &&
        parsed?.accessToken &&
        typeof parsed.expiresIn === "number"
      ) {
        setTokenWithExpiry(parsed.accessToken, parsed.expiresIn);
        setTokenStatus("active");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ── derived ── */
  // Token is still a hard block — no point sending without auth
  // Missing private key is now a soft warning, not a block
  const notReady = requiresAccessToken && tokenStatus !== "active";

  return {
    // env
    env, setEnv, hasEnv, baseUrl, sandboxUrl, resolvedUrl,
    // params
    params, setParams, paramKeys,
    // auth
    tokenStatus, keyLoaded,
    handleClearToken, handleLoadKey, handleClearKey,
    // form
    headers, setHeaders, jsonBody, setJsonBody,
    // request flags
    isOAuth, requiresSignature, requiresAccessToken, notReady,
    // response
    response, status, loading, missedSignature,
    // actions
    send,
  };
}