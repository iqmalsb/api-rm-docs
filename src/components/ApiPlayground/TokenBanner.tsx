import React from "react";
import { tokenExpiryLabel } from "../../utils/auth";
import styles from "./styles.module.css";

export type TokenStatus = "missing" | "expired" | "active";

type Props = {
  status: TokenStatus;
  onClear: () => void;
};

export default function TokenBanner({ status, onClear }: Props) {
  if (status === "active") {
    const label = tokenExpiryLabel();
    return (
      <div className={`${styles.banner} ${styles.bannerSuccess}`}>
        <span className={styles.bannerDot} />
        <span>
          Access token active{label ? ` · expires in ${label}` : ""}
        </span>
        <button className={styles.bannerAction} onClick={onClear}>
          Clear
        </button>
      </div>
    );
  }

  if (status === "expired") {
    return (
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
    );
  }

  return (
    <div className={`${styles.banner} ${styles.bannerWarning}`}>
      <span className={styles.bannerDot} />
      <span>
        No access token — run the <em>Client Credentials</em> endpoint first
      </span>
    </div>
  );
}