import styles from './cats.module.scss';
import Card from './card';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/user.context';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
const Favs = ({ data, setData, updateData }) => {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        breeds: '',
    });
    const [error, setError] = useState([]);
    const onChange = (e) => {
        setForm((p) => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
    };

    const add = () => {
        let temp = [];
        if (form.name.replace(' ', '') == '') {
            temp.push('name');
        }
        if (form.age.replace(' ', '') == '') {
            temp.push('age');
        }
        if (form.gender.replace(' ', '') == '') {
            temp.push('gender');
        }
        if (form.breeds.replace(' ', '') == '') {
            temp.push('breeds');
        }
        if (temp.length > 0) {
            setError(temp);
        } else {
            setError([]);

            axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/insert`, {
                method: 'POST',
                data: form,
                headers: { Authorization: `Bearer ${user.token}` },
            })
                .then((res) => {
                    updateData();
                })
                .catch((err) => {});
        }
    };

    return (
        <>
            <div className='container'>
                <div className={styles.catsWrapper}>
                    {data?.map((e, i) => {
                        return (
                            <Card
                                staff={user.isStaff}
                                e={e}
                                key={e?._id}
                            />
                        );
                    })}
                    {user.isStaff ? (
                        <div className={styles.cat}>
                            <div className={styles.image}>
                                <div className={styles.add}>
                                    <IconButton
                                        type='button'
                                        sx={{ p: '10px' }}
                                        aria-label='clear'
                                        onClick={add}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div>
                                <div>name:</div>
                                <TextField
                                    className={styles.input}
                                    name='name'
                                    value={form.name}
                                    onChange={onChange}
                                    error={error.includes('name')}
                                    errormsg={error.includes('ename') ? 'this field is required' : ''}
                                />
                            </div>
                            <div>
                                <div>breeds:</div>

                                <TextField
                                    className={styles.input}
                                    name='breeds'
                                    value={form.breeds}
                                    onChange={onChange}
                                    error={error.includes('breeds')}
                                    errormsg={error.includes('empbreeds') ? 'this field is required' : ''}
                                />
                            </div>
                            <div>
                                <div>age:</div>

                                <TextField
                                    className={styles.input}
                                    name='age'
                                    value={form.age}
                                    onChange={onChange}
                                    error={error.includes('age')}
                                    errormsg={error.includes('age') ? 'this field is required' : ''}
                                />
                            </div>
                            <div>
                                <div>gender:</div>

                                <TextField
                                    className={styles.input}
                                    name='gender'
                                    value={form.gender}
                                    onChange={onChange}
                                    error={error.includes('gender')}
                                    errormsg={error.includes('empgender') ? 'this field is required' : ''}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};
export default Favs;
