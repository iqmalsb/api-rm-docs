import React from "react";
import { tokenExpiryLabel } from "../../utils/auth";
import styles from "./styles.module.css";

export type TokenStatus = "missing" | "expired" | "active";

type Props = {
  status: TokenStatus;
  env: "sandbox" | "prod";
  onClear: () => void;
};

export default function TokenBanner({ status, env, onClear }: Props) {
  const isProd = env === "prod";

  const ProdWarning = () => (
    <div className={`${styles.banner} ${styles.bannerError}`}>
      <span className={styles.bannerDot} />
      <span>
        <strong>Production mode</strong> — you are making real API calls.
        Token is session-only and will be cleared when you close this tab.
      </span>
    </div>
  );

  if (status === "active") {
    const label = tokenExpiryLabel();
    return (
      <>
        {isProd && <ProdWarning />}
        <div className={`${styles.banner} ${styles.bannerSuccess}`}>
          <span className={styles.bannerDot} />
          <span>
            Access token active{label ? ` · expires in ${label}` : ""}
          </span>
          <button className={styles.bannerAction} onClick={onClear}>
            Clear
          </button>
        </div>
      </>
    );
  }

  if (status === "expired") {
    return (
      <>
        {isProd && <ProdWarning />}
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <span className={styles.bannerDot} />
          <span>
            Access token <strong>expired</strong> — re-run the{" "}
            <em>Client Credentials</em> endpoint to refresh it
          </span>
          <button className={styles.bannerAction} onClick={onClear}>
            Clear
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {isProd && <ProdWarning />}
      <div className={`${styles.banner} ${styles.bannerWarning}`}>
        <span className={styles.bannerDot} />
        <span>
          No access token — run the <em>Client Credentials</em> endpoint first
        </span>
      </div>
    </>
  );
}