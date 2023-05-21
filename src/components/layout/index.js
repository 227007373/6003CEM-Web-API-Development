import styles from './layout.module.scss';
import MyHeader from './header';
const Layout = ({ children }) => {
    return (
        <div className={styles.mainWrapper}>
            <MyHeader></MyHeader>
            <main className={styles.main}>{children}</main>
        </div>
    );
};
export default Layout;
