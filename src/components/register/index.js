import { FormControl, TextField } from '@mui/material';
import styles from './register.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Register = () => {
    return (
        <div className='container'>
            <div className={styles.form}>
                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        className={styles.field}
                        id='username'
                        label='Username'
                    />
                    <TextField
                        className={styles.field}
                        id='password'
                        label='Password'
                    />
                    <TextField
                        className={styles.field}
                        id='password'
                        label='Confirm Password'
                    />
                </FormControl>
                <div className={styles.submitBtn}>
                    <button>Register</button>
                </div>
            </div>
        </div>
    );
};
export default Register;
