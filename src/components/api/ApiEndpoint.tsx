import React from "react";
import clsx from "clsx";
import styles from "./api.module.css";

type Props = {
  method: string;
  sandbox?: string;
  prod?: string;
};

export default function ApiEndpoint({ method, sandbox, prod }: Props) {
  const path = sandbox || prod;

  return (
    <div className={styles.wrapper}>
      <span className={clsx(styles.badge, styles[method.toLowerCase()])}>
        {method}
      </span>
      {path && <code className={styles.path}>{path}</code>}
    </div>
  );
}