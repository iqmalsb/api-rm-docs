import React from "react";
import { lookupError, extractErrorCodes } from "../../utils/errorCodes";
import TokenBanner from "./TokenBanner";
import PrivateKeyBanner from "./PrivateKeyBanner";
import CodeSnippets from "./CodeSnippet";
import { useApiPlayground, PlaygroundProps } from "./UseApiPlayground";
import styles from "./styles.module.css";

/* ================= JSON HIGHLIGHT ================= */

const highlightJson = (json: string) =>
  json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")\s*:/g,
      `<span class="${styles.jsonKey}">$1</span>:`
    )
    .replace(
      /:\s*("(\\u[a-zA-Z0-9]{4}|\\[^\\"])*")/g,
      `: <span class="${styles.jsonValue}">$1</span>`
    )
    .replace(
      /:\s*(\d+|true|false|null)/g,
      `: <span class="${styles.jsonValue}">$1</span>`
    );

/* ================= COMPONENT ================= */

export default function ApiPlayground(props: PlaygroundProps) {
  if (!props.url) return null;

  const {
    env, setEnv, hasEnv, baseUrl,
    params, setParams,
    tokenStatus, keyLoaded,
    handleClearToken, handleLoadKey, handleClearKey,
    headers, setHeaders, jsonBody, setJsonBody,
    requiresSignature, requiresAccessToken, notReady,
    response, status, loading, missedSignature,
    send,
  } = useApiPlayground(props);

  return (
    <div className={styles.wrapper}>

      {/* ENV SWITCH */}
      {hasEnv && (
        <div className={styles.envSwitch}>
          <button
            onClick={() => setEnv("sandbox")}
            className={env === "sandbox" ? styles.activeEnv : ""}
          >
            SANDBOX
          </button>
          <button
            onClick={() => setEnv("prod")}
            className={env === "prod" ? styles.activeEnv : ""}
          >
            PROD
          </button>
        </div>
      )}

      {/* URL */}
      <div className={styles.header}>
        <span className={`${styles.method} ${styles[props.method.toLowerCase()]}`}>
          {props.method}
        </span>
        <span className={styles.url}>
          {baseUrl.split(/({[^}]+})/g).map((part, i) => {
            const match = part.match(/{([^}]+)}/);
            if (!match) return <span key={i}>{part}</span>;
            const key = match[1];
            return (
              <span
                key={i}
                contentEditable
                suppressContentEditableWarning
                className={styles.urlParam}
                onBlur={(e) =>
                  setParams({ ...params, [key]: e.currentTarget.innerText.trim() })
                }
              >
                {params[key] ?? key}
              </span>
            );
          })}
        </span>
      </div>

      {/* AUTH BANNERS */}
      {requiresAccessToken && (
        <TokenBanner status={tokenStatus} env={env} onClear={handleClearToken} />
      )}
      {requiresSignature && (
        <PrivateKeyBanner
          loaded={keyLoaded}
          onLoad={handleLoadKey}
          onClear={handleClearKey}
        />
      )}

      {/* HEADERS */}
      <div className={styles.blockHeader}>
        <label className={styles.label}>Headers</label>
      </div>
      <pre
        className={styles.editor}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          try { setHeaders(JSON.parse(e.currentTarget.innerText)); } catch { }
        }}
        dangerouslySetInnerHTML={{
          __html: highlightJson(JSON.stringify(headers, null, 2)),
        }}
      />

      {/* BODY */}
      {props.method !== "GET" && (
        <>
          <div className={styles.blockHeader}>
            <label className={styles.label}>Body</label>
          </div>
          <pre
            className={styles.editor}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setJsonBody(e.currentTarget.innerText)}
            dangerouslySetInnerHTML={{ __html: highlightJson(jsonBody) }}
          />
        </>
      )}

      {/* STATIC CODE SNIPPETS — from frontmatter examples.request */}
      {props.exampleRequest && (
        <CodeSnippets rawCurl={props.exampleRequest} />
      )}

      {/* SEND */}
      <button
        className={`${styles.send} ${notReady ? styles.sendBlocked : ""}`}
        onClick={send}
        disabled={loading}
        title={notReady ? "Resolve the warnings above before sending" : undefined}
      >
        {loading ? "Sending…" : "▶ Send Request"}
      </button>

      {/* NO SIGNATURE WARNING — shown after a request sent without a key */}
      {missedSignature && (
        <div className={`${styles.banner} ${styles.bannerWarning}`} style={{ marginTop: 12 }}>
          <span className={styles.bannerDot} />
          <span>
            Request sent <strong>without a signature</strong> — the server will likely reject it.
            Paste your private key above and send again to include <code>X-Signature</code> headers.
          </span>
        </div>
      )}

      {/* RESPONSE */}
      {status !== null && (
        <div>

          {/* Status badge */}
          <div className={styles.statusLine}>
            <span className={status >= 200 && status < 300 ? styles.statusOk : styles.statusErr}>
              {status}
            </span>
            {response?._error && (
              <span className={styles.statusHint}>{response._error}</span>
            )}
          </div>

          {/* Raw JSON */}
          {!response?._error && (
            <pre className={styles.response}>
              {JSON.stringify(response, null, 2)}
            </pre>
          )}

          {/* Error lookup panel */}
          {status >= 300 && !response?._error && (() => {
            const codes = extractErrorCodes(response);
            if (codes.length === 0) return null;
            return (
              <div className={styles.errorLookup}>
                <div className={styles.errorLookupHeader}>
                  <span className={styles.errorLookupIcon}>⚑</span>
                  <span>Error Code Reference</span>
                </div>
                {codes.map((code) => {
                  const entry = lookupError(code);
                  return (
                    <div key={code} className={styles.errorLookupEntry}>
                      <div className={styles.errorLookupCode}>{code}</div>
                      {entry ? (
                        <>
                          <div className={styles.errorLookupDesc}>{entry.description}</div>
                          {entry.solution && (
                            <div className={styles.errorLookupSolution}>
                              <span className={styles.errorLookupSolutionLabel}>💡 Fix</span>
                              {entry.solution}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className={styles.errorLookupDesc}>
                          No description found.{" "}
                          <a href="/docs/error-codes" target="_blank" rel="noopener noreferrer" className={styles.errorLookupLink}>
                            View all error codes →
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className={styles.errorLookupFooter}>
                  <a href="/docs/error-codes" target="_blank" rel="noopener noreferrer" className={styles.errorLookupLink}>
                    View full error code reference →
                  </a>
                </div>
              </div>
            );
          })()}

        </div>
      )}
    </div>
  );
}