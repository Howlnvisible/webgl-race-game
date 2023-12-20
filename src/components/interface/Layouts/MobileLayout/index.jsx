import styles from "./MobileLayout.module.scss";

export default function MobileLayout({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
