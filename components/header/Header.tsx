import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.brandName}>Next Meetups</span>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">All Meetups</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/add-meetup">Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
