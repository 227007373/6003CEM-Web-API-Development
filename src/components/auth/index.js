import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/contexts/user.context';
import { useRouter } from 'next/router';
const Auth = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (window.localStorage.getItem('jwt')) {
            setUser({ token: window.localStorage.getItem('jwt') });
            router.pathname == '/login' || router.pathname == '/register' ? router.push('/') : null;
        }
    }, []);
    return <>{children}</>;
};
export default Auth;
