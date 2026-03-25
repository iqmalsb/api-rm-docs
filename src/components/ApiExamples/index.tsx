import React, { useState, useEffect, useRef } from "react";
import { useDoc } from "@docusaurus/theme-common/internal";
import { SNIPPET_LANGS, SnippetLang, generateSnippet } from "../../utils/snippets";
import { SharedState } from "../ApiPlayground/UseApiSharedState";
import styles from "./styles.module.css";

function toString(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val.trim();
  if (typeof val === "object") return JSON.stringify(val, null, 2);
  return String(val).trim();
}

function isBlank(val: any): boolean {
  const str = toString(val);
  if (!str) return true;
  return str.toLowerCase().startsWith("there is no");
}

function formatCurl(cmd: string): string {
  return cmd
    .replace(/\\n/g, "\n")
    .replace(/ \\\n/g, "\n")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join(" \\\n  ")
    .trim();
}

type CurlToken = { text: string; color: string };

function tokenizeCurl(cmd: string): CurlToken[] {
  const tokens: CurlToken[] = [];
  const lines = cmd.split("\n");

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    let pos = 0;

    while (pos < line.length) {
      const rest = line.slice(pos);

      // curl keyword
      const curlMatch = rest.match(/^curl\b/);
      if (curlMatch) {
        tokens.push({ text: curlMatch[0], color: "#c792ea" });
        pos += curlMatch[0].length;
        continue;
      }

      // HTTP method after --request
      const methodMatch = rest.match(/^(GET|POST|PUT|PATCH|DELETE)\b/);
      if (methodMatch) {
        tokens.push({ text: methodMatch[0], color: "#ffcb6b" });
        pos += methodMatch[0].length;
        continue;
      }

      // flags --word
      const flagMatch = rest.match(/^--[\w-]+/);
      if (flagMatch) {
        tokens.push({ text: flagMatch[0], color: "#82aaff" });
        pos += flagMatch[0].length;
        continue;
      }

      // quoted string — handle in one shot
      if (rest[0] === '"') {
        const end = rest.indexOf('"', 1);
        if (end !== -1) {
          const full = rest.slice(0, end + 1);
          const inner = rest.slice(1, end);

          // URL
          if (inner.match(/^https?:\/\//)) {
            tokens.push({ text: '"', color: "#e2e8f0" });
            tokens.push({ text: inner, color: "#80cbc4" });
            tokens.push({ text: '"', color: "#e2e8f0" });
          }
          // Bearer token value
          else if (inner.startsWith("Bearer ")) {
            tokens.push({ text: '"Bearer ', color: "#e2e8f0" });
            tokens.push({ text: inner.slice(7), color: "#ffcb6b" });
            tokens.push({ text: '"', color: "#e2e8f0" });
          }
          // Header with sha256
          else if (inner.includes("sha256 ")) {
            const idx = inner.indexOf("sha256 ");
            tokens.push({ text: '"' + inner.slice(0, idx), color: "#e2e8f0" });
            tokens.push({ text: "sha256 ", color: "#c3e88d" });
            tokens.push({ text: inner.slice(idx + 7), color: "#f78c6c" });
            tokens.push({ text: '"', color: "#e2e8f0" });
          }
          // Header key:value
          else if (inner.includes(": ")) {
            const colonIdx = inner.indexOf(": ");
            tokens.push({ text: '"', color: "#e2e8f0" });
            tokens.push({ text: inner.slice(0, colonIdx), color: "#f78c6c" });
            tokens.push({ text: ": ", color: "#e2e8f0" });
            tokens.push({ text: inner.slice(colonIdx + 2), color: "#c3e88d" });
            tokens.push({ text: '"', color: "#e2e8f0" });
          }
          else {
            tokens.push({ text: full, color: "#c3e88d" });
          }
          pos += full.length;
          continue;
        }
      }

      // single quoted string (--data-raw body)
      if (rest[0] === "'") {
        const end = rest.indexOf("'", 1);
        if (end !== -1) {
          const full = rest.slice(0, end + 1);
          tokens.push({ text: full, color: "#c3e88d" });
          pos += full.length;
          continue;
        }
      }

      // line continuation backslash at end
      if (rest === "\\") {
        tokens.push({ text: "\\", color: "#546e7a" });
        pos++;
        continue;
      }

      // default
      tokens.push({ text: rest[0], color: "#e2e8f0" });
      pos++;
    }

    if (li < lines.length - 1) {
      tokens.push({ text: "\n", color: "#e2e8f0" });
    }
  }

  return tokens;
}

type JsonToken = { text: string; color: string };

function tokenizeJson(json: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  let pos = 0;

  while (pos < json.length) {
    const rest = json.slice(pos);

    // quoted key or value
    if (rest[0] === '"') {
      const end = rest.indexOf('"', 1);
      if (end !== -1) {
        const inner = rest.slice(1, end);
        const after = rest.slice(end + 1).trimStart();
        const isKey = after.startsWith(":");

        tokens.push({ text: '"', color: "#e2e8f0" });
        if (isKey) {
          tokens.push({ text: inner, color: "#82aaff" });
        } else {
          tokens.push({ text: inner, color: inner.length > 40 ? "#ffcb6b" : "#c3e88d" });
        }
        tokens.push({ text: '"', color: "#e2e8f0" });
        pos += end + 1;
        continue;
      }
    }

    // numbers
    const numMatch = rest.match(/^-?\d+(\.\d+)?/);
    if (numMatch) {
      tokens.push({ text: numMatch[0], color: "#f78c6c" });
      pos += numMatch[0].length;
      continue;
    }

    // booleans
    const boolMatch = rest.match(/^(true|false)/);
    if (boolMatch) {
      tokens.push({ text: boolMatch[0], color: "#c792ea" });
      pos += boolMatch[0].length;
      continue;
    }

    // null
    const nullMatch = rest.match(/^null/);
    if (nullMatch) {
      tokens.push({ text: nullMatch[0], color: "#546e7a" });
      pos += nullMatch[0].length;
      continue;
    }

    tokens.push({ text: rest[0], color: "#e2e8f0" });
    pos++;
  }

  return tokens;
}

function CurlHighlight({ text }: { text: string }) {
  const tokens = tokenizeCurl(formatCurl(text));
  return (
    <pre className={styles.terminalPre}>
      {tokens.map((t, i) => (
        <span key={i} style={{ color: t.color }}>{t.text}</span>
      ))}
    </pre>
  );
}

function JsonHighlight({ text }: { text: string }) {
  const tokens = tokenizeJson(text);
  return (
    <pre className={styles.terminalPre}>
      {tokens.map((t, i) => (
        <span key={i} style={{ color: t.color }}>{t.text}</span>
      ))}
    </pre>
  );
}

type Props = {
  shared: SharedState;
};

type RequestTerminalProps = {
  rawCurl: string;
  env: "sandbox" | "prod";
  onDone: () => void;
};

function TerminalPrompt({ env }: { env: "sandbox" | "prod" }) {
  return (
    <span className={styles.terminalPrompt}>
      <span className={styles.terminalPromptHost}>
        {env === "sandbox" ? "SB" : "PROD"}
      </span>
      <span className={styles.terminalPromptDollar}>$</span>
    </span>
  );
}

function RequestTerminal({ rawCurl, env, onDone }: RequestTerminalProps) {
  const [lang, setLang] = useState<SnippetLang>("cURL");
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [requestDone, setRequestDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const curlCommand = generateSnippet("cURL", rawCurl);
  const snippet = generateSnippet(lang, rawCurl);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typedText]);

  useEffect(() => {
    if (!curlCommand || hasStarted.current) return;
    hasStarted.current = true;

    const run = async () => {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 200));
      for (let i = 0; i <= curlCommand.length; i++) {
        await new Promise(r => setTimeout(r, 2 + Math.random() * 3));
        setTypedText(curlCommand.slice(0, i));
      }
      setIsTyping(false);
      setRequestDone(true);
      await new Promise(r => setTimeout(r, 300));
      onDone();
    };

    run();
  }, [curlCommand]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <div className={styles.terminalDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.terminalTitle}>Example Request</span>
        <div className={styles.terminalActions}>
          <select
            className={styles.langDropdown}
            value={lang}
            onChange={(e) => setLang(e.target.value as SnippetLang)}
          >
            {SNIPPET_LANGS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ""}`}
            onClick={handleCopy}
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>
      </div>

      <div className={styles.terminalBody} ref={terminalRef}>
        {!isTyping && !requestDone && (
          <div className={styles.terminalLine}>
            <TerminalPrompt env={env} />
            <span className={`${styles.terminalCursor} ${!cursorVisible ? styles.terminalCursorHidden : ""}`} />
          </div>
        )}

        {isTyping && (
          <div className={styles.terminalLine}>
            <TerminalPrompt env={env} />
            <CurlHighlight text={typedText} />
            <span className={`${styles.terminalCursor} ${!cursorVisible ? styles.terminalCursorHidden : ""}`} />
          </div>
        )}

        {requestDone && (
          <>
            <div className={styles.terminalLine}>
              <TerminalPrompt env={env} />
              <CurlHighlight text={curlCommand} />
            </div>
            <div className={styles.terminalLine}>
              <TerminalPrompt env={env} />
              <span className={`${styles.terminalCursor} ${!cursorVisible ? styles.terminalCursorHidden : ""}`} />
            </div>
          </>
        )}
      </div>

      <div className={styles.terminalNotice}>
        Example only — use the playground above to make real calls
      </div>
    </div>
  );
}

type ResponseTerminalProps = {
  response: string;
  env: "sandbox" | "prod";
};

function ResponseTerminal({ response, env }: ResponseTerminalProps) {
  const [copied, setCopied] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <div className={styles.terminalDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.terminalTitle}>Example Response</span>
        <div className={styles.terminalActions}>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ""}`}
            onClick={handleCopy}
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>
      </div>

      <div className={styles.terminalBody}>
        <div className={styles.terminalLine}>
          <span className={styles.terminalSuccess}>HTTP 200 OK</span>
        </div>
        <div className={styles.terminalLine}>
          <JsonHighlight text={response} />
        </div>
        <div className={styles.terminalLine}>
          <TerminalPrompt env={env} />
          <span className={`${styles.terminalCursor} ${!cursorVisible ? styles.terminalCursorHidden : ""}`} />
        </div>
      </div>
    </div>
  );
}

export default function ApiExamples({ shared }: Props) {
  const { frontMatter } = useDoc();
  const examples = (frontMatter as any).examples;
  const rawRequest = toString(examples?.request);
  const exampleResponse = toString(examples?.response);
  const [showResponse, setShowResponse] = useState(false);

  if (isBlank(rawRequest) && isBlank(exampleResponse)) return null;

  return (
    <div className={styles.wrapper}>
      {!isBlank(rawRequest) && (
        <RequestTerminal
          rawCurl={rawRequest!}
          env={shared.env}
          onDone={() => setShowResponse(true)}
        />
      )}
      {!isBlank(exampleResponse) && showResponse && (
        <ResponseTerminal
          response={exampleResponse!}
          env={shared.env}
        />
      )}
    </div>
  );
}