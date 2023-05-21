import MyHeader from './header';
const Layout = ({ children }) => {
    return (
        <>
            <MyHeader></MyHeader>
            {children}
        </>
    );
};
export default Layout;
