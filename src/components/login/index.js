import { FormControl, TextField } from '@mui/material';
import styles from './login.module.scss';
const Login = () => {
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
                </FormControl>{' '}
                <div className={styles.submitBtn}>
                    <button>Login</button>
                </div>
            </div>
        </div>
    );
};
export default Login;
