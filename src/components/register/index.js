import { FormControl, TextField } from '@mui/material';
import styles from './register.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CusTextField from '../cusTextField';
import { useRouter } from 'next/router';
const Register = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const router = useRouter();
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);
    const checkString = (str) => {
        let hasUpperCase = /[A-Z]/.test(str);
        let hasLowerCase = /[a-z]/.test(str);
        return hasUpperCase && hasLowerCase;
    };
    const onChange = (e) => {
        setForm((p) => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
    };
    const register = () => {
        let temp = [];
        if (form.password.replaceAll(' ', '') == '') {
            temp.push('emptyPassword');
        } else if (!checkString(form.password) || form.password.length <= 7) {
            temp.push('passwordNotSecured');
        }
        if (form.username.replaceAll(' ', '') == '') {
            temp.push('emptyUsername');
        } else if (form.username.length <= 7) {
            temp.push('usernameTooShort');
        }

        if (form.confirmPassword.replaceAll(' ', '') == '') {
            temp.push('emptyConfirmPassword');
        }
        if (form.password.replaceAll(' ', '') != '' && form.confirmPassword.replaceAll(' ', '') != '') {
            if (form.password != form.confirmPassword) {
                temp.push('wrongConfirm');
            }
        }
        if (temp.length > 0) {
            setError(temp);
        } else {
            setError(temp);
            axios(`${process.env.NEXT_PUBLIC_BASEURL}/user/register`, {
                method: 'POST',
                data: {
                    username: form.username,
                    password: form.password,
                },
            })
                .then((res) => {
                    setForm({ username: '', password: '', confirmPassword: '' });
                    setSuccess(true);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.data.message == 'Username already exists.') {
                        setError(['usernameExists']);
                    }
                });
        }
    };
    return (
        <div className='container'>
            <div className={styles.form}>
                {!success ? (
                    <FormControl sx={{ width: '100%' }}>
                        <CusTextField
                            label='Username'
                            name='username'
                            value={form.username}
                            onChange={onChange}
                            error={
                                error.includes('emptyUsername') ||
                                error.includes('usernameTooShort') ||
                                error.includes('usernameExists')
                            }
                            errorMsg={
                                error.includes('emptyUsername')
                                    ? 'this field is required'
                                    : error.includes('usernameTooShort')
                                    ? 'Username must includes more than 7 charactors'
                                    : error.includes('usernameExists')
                                    ? 'Username already exists'
                                    : ''
                            }
                        />
                        <CusTextField
                            label='Password'
                            name='password'
                            value={form.password}
                            onChange={onChange}
                            error={error.includes('emptyPassword') || error.includes('passwordNotSecured')}
                            errorMsg={
                                error.includes('emptyPassword')
                                    ? 'this field is required'
                                    : error.includes('passwordNotSecured')
                                    ? 'Password is not secured, need to be more than 7 charactors and includes atlease one uppercase and one lowercase'
                                    : ''
                            }
                        />

                        <CusTextField
                            label='Confirm Password'
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={onChange}
                            error={error.includes('emptyConfirmPassword') || error.includes('wrongConfirm')}
                            errorMsg={
                                error.includes('emptyConfirmPassword')
                                    ? 'this field is required'
                                    : error.includes('wrongConfirm')
                                    ? 'This must be same as password'
                                    : ''
                            }
                        />
                    </FormControl>
                ) : null}
                {!success ? (
                    <div className={styles.submitBtn}>
                        <button onClick={register}>Register</button>
                    </div>
                ) : (
                    <div className={styles.submitBtn}>
                        <button
                            onClick={() => {
                                router.push('/login');
                            }}
                        >
                            Login
                        </button>
                    </div>
                )}
                {success ? <div>Register successful!</div> : null}
            </div>
        </div>
    );
};
export default Register;
