import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/contexts/user.context';
import { useRouter } from 'next/router';
import axios from 'axios';
const Auth = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (window.localStorage.getItem('jwt')) {
            axios(`${process.env.NEXT_PUBLIC_BASEURL}/user/getUser`, {
                method: 'POST',
                data: {
                    token: window.localStorage.getItem('jwt'),
                },
            })
                .then((res) => {
                    setUser((p) => {
                        return { token: window.localStorage.getItem('jwt'), ...res.data.data };
                    });
                })
                .catch((err) => {
                    router.push('/logout');
                });
            router.pathname == '/login' || router.pathname == '/register' ? router.push('/') : null;
        }
    }, []);
    return <>{children}</>;
};
export default Auth;
