import styles from './header.module.scss';
import Link from 'next/link';
const MyHeader = () => {
    return (
        <header>
            <div className={`${styles.wrapper} container`}>
                <div className={styles.logo}>
                    <div
                        style={{ backgroundImage: 'url("/images/logo.svg")' }}
                        className={styles.image}
                    ></div>
                </div>
                <nav className={styles.nav}>
                    <div className={styles.btn}>
                        <Link href={'/'}>My Favourite</Link>
                    </div>
                    <div className={styles.btn}>
                        <Link href={'/'}>Contact Us</Link>
                    </div>
                    <div className={styles.btn}>
                        <Link href={'/'}>Browse</Link>
                    </div>
                    <div className={styles.btn}>
                        <Link href={'/login'}>Login</Link>
                    </div>
                    <div className={styles.btn}>
                        <Link href={'/register'}>Register</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};
export default MyHeader;
