import React, { useState } from "react";
import { SNIPPET_LANGS, SnippetLang, generateSnippet } from "../../utils/snippets";
import styles from "./styles.module.css";

type Props = {
  /** Raw cURL string from frontmatter examples.request */
  rawCurl: string;
};

export default function CodeSnippets({ rawCurl }: Props) {
  const [activeLang, setActiveLang] = useState<SnippetLang>("cURL");
  const [copied, setCopied] = useState(false);

  const code = generateSnippet(activeLang, rawCurl);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.snippetPanel}>
      <div className={styles.snippetHeader}>
        <span className={styles.snippetTitle}>📋 Code Snippet</span>
        <div className={styles.snippetTabs}>
          {SNIPPET_LANGS.map((lang) => (
            <button
              key={lang}
              className={`${styles.snippetTab} ${
                activeLang === lang ? styles.snippetTabActive : ""
              }`}
              onClick={() => setActiveLang(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
        <button
          className={`${styles.snippetCopy} ${copied ? styles.snippetCopied : ""}`}
          onClick={handleCopy}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className={styles.snippetCode}>{code}</pre>
    </div>
  );
}