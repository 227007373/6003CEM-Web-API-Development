import { FormControl, TextField } from '@mui/material';
import axios from 'axios';
import CusTextField from '../cusTextField';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/user.context';
import styles from './login.module.scss';
const Login = () => {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState([]);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const onChange = (e) => {
        setForm((p) => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
    };
    const login = () => {
        let temp = [];
        if (form.password.replaceAll(' ', '') == '') {
            temp.push('emptyPassword');
        }
        if (form.username.replaceAll(' ', '') == '') {
            temp.push('emptyUsername');
        }
        if (temp.length > 0) {
            setError(temp);
        } else {
            setError(temp);
            axios(`${process.env.NEXT_PUBLIC_BASEURL}/user/login`, {
                method: 'POST',
                data: {
                    username: form.username,
                    password: form.password,
                },
            })
                .then((res) => {
                    localStorage.setItem('jwt', res.data.data.token);
                    setUser({ token: res.data.data.token });
                })
                .then(() => {
                    router.push('/');
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.data.message == 'Username or password is incorrect') {
                        setError(['worngInformation']);
                    }
                });
        }
    };
    return (
        <div className='container'>
            <div className={styles.form}>
                <FormControl sx={{ width: '100%' }}>
                    <CusTextField
                        label='Username'
                        name='username'
                        value={form.username}
                        onChange={onChange}
                        error={error.includes('emptyUsername') || error.includes('worngInformation')}
                        errorMsg={error.includes('emptyUsername') ? 'this field is required' : ''}
                    />
                    <CusTextField
                        label='Password'
                        name='password'
                        value={form.password}
                        onChange={onChange}
                        error={error.includes('emptyPassword') || error.includes('worngInformation')}
                        errorMsg={
                            error.includes('emptyPassword')
                                ? 'this field is required'
                                : error.includes('worngInformation')
                                ? 'Username or password is incorrect, Please check again'
                                : ''
                        }
                    />
                </FormControl>{' '}
                <div className={styles.submitBtn}>
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
};
export default Login;
