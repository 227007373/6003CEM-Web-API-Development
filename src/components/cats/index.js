import styles from './cats.module.scss';
import Card from './card';
import ToolBar from './toolBar';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/user.context';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import MyDropzone from './card/myDropzone';
const Cats = ({ data, setData, updateData }) => {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        breeds: '',
    });
    const [error, setError] = useState([]);
    const [gender, setGender] = useState('boy');
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
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <div className='container'>
                <ToolBar setData={setData} />
                <div className={styles.catsWrapper}>
                    {data?.map((e, i) => {
                        return (
                            <Card
                                staff={user.isStaff}
                                e={e}
                                key={e._id}
                                updateData={updateData}
                            />
                        );
                    })}
                    {user.isStaff ? (
                        <div className={styles.cat}>
                            <div className={styles.wrapper}>
                                <div className={styles.image}>
                                    <MyDropzone setForm={setForm} />
                                    <div className={styles.add}>
                                        <IconButton
                                            type='button'
                                            sx={{ p: '10px' }}
                                            aria-label='clear'
                                            onClick={add}
                                        >
                                            <AddBoxIcon sx={{ backgroundColor: 'white' }} />
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
                                        type='number'
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

                                    <div className={`${styles.choice} ${error.includes('gender') ? styles.error : ''}`}>
                                        <div
                                            className={`${form.gender == 'boy' ? styles.active : ''}`}
                                            onClick={() => {
                                                setForm((p) => {
                                                    return { ...p, gender: 'boy' };
                                                });
                                            }}
                                        >
                                            boy
                                        </div>
                                        /
                                        <div
                                            className={`${form.gender == 'girl' ? styles.active : ''}`}
                                            onClick={() => {
                                                setForm((p) => {
                                                    return { ...p, gender: 'girl' };
                                                });
                                            }}
                                        >
                                            girl
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};
export default Cats;
