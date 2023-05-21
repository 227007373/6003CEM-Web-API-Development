import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/user.context';
const Logout = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    useEffect(() => {
        new Promise((res, rej) => {
            res();
        })
            .then(() => {
                window.localStorage.setItem('jwt', '');
                setUser({ token: '' });
            })
            .then(() => {
                router.push('/');
            });
    }, []);
    console.log(user);
};
export default Logout;
