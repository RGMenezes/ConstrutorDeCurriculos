import styles from "./NavPage.module.css";
import Link from "../base/Link";

export default function NavPage({ row, curriculum }: { row?: boolean, curriculum?: boolean }) {
  return (
    <nav>
      <ul className={`${styles.list} ${row && styles.row}`}>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
