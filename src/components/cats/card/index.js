import styles from '../cats.module.scss';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/user.context';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import MyDropzone from './myDropzone';
const Card = ({ e, staff, updateData }) => {
    const { user, setUser } = useContext(UserContext);
    const [liked, setLiked] = useState();
    const [confirm, setConfirm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        image: e.image,
        name: e.name,
        age: e.age,
        gender: e.gender,
        breeds: e.breeds,
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

    useEffect(() => {
        if (user) {
            setLiked(
                user?.favourite?.find((item) => {
                    return JSON.stringify(item?._id) == JSON.stringify(e._id);
                })
            );
        }
    }, [user]);
    const fav = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/favourite`, {
            method: 'PUT',
            data: { username: user.username, id: e._id },
        })
            .then((res) => {
                console.log(res);
                setLiked(res.data.data.liked);
            })
            .then(() => {
                axios(`${process.env.NEXT_PUBLIC_BASEURL}/user/getUser`, {
                    method: 'POST',
                    data: {
                        token: window.localStorage.getItem('jwt'),
                    },
                })
                    .then((res) => {
                        console.log(res);
                        setUser((p) => {
                            return { token: window.localStorage.getItem('jwt'), ...res.data.data };
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        router.push('/logout');
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const del = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/delete`, {
            method: 'DELETE',
            data: {
                id: e._id,
            },
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((res) => {
                console.log(res);
            })
            .then(() => {
                updateData();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const save = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/update/${e._id}`, {
            method: 'PUT',
            data: form,
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((res) => {
                console.log(res);
            })
            .then(() => {
                updateData();
            })
            .then(() => {
                setEditing(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={styles.cat}>
            <div className={styles.wrapper}>
                <div
                    style={{ backgroundImage: `url(${e.image})` }}
                    className={styles.image}
                >
                    {editing ? <MyDropzone setForm={setForm} /> : null}
                    {!staff && user.username ? (
                        <div className={styles.fav}>
                            <IconButton
                                type='button'
                                sx={{ p: '10px' }}
                                aria-label='clear'
                                onClick={fav}
                            >
                                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </div>
                    ) : null}
                </div>
                {!editing ? (
                    <>
                        {' '}
                        <div>
                            <div>name:</div>
                            <span>{e.name}</span>
                        </div>
                        <div>
                            <div>breeds:</div>
                            <span>{e.breeds}</span>
                        </div>
                        <div>
                            <div>age:</div>
                            <span>{e.age}</span>
                        </div>
                        <div>
                            <div>gender:</div>
                            <span>{e.gender}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <div>name:</div>
                            <TextField
                                className={styles.input}
                                name='name'
                                value={form.name ? form.name : e.name}
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
                                value={form.breeds ? form.breeds : e.breeds}
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
                                value={form.age ? form.age : e.age}
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
                    </>
                )}
            </div>
            {staff ? (
                <div className={styles.tools}>
                    {!confirm && !editing ? (
                        <>
                            <button
                                onClick={() => {
                                    setEditing(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setConfirm(true);
                                }}
                            >
                                Delete
                            </button>
                        </>
                    ) : null}
                    {confirm ? (
                        <>
                            <button
                                onClick={() => {
                                    del();
                                    setConfirm(true);
                                }}
                            >
                                Confirm
                            </button>{' '}
                            <button
                                onClick={() => {
                                    setConfirm(false);
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : null}
                    {editing ? (
                        <>
                            <button
                                onClick={() => {
                                    save();
                                }}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setForm({
                                        name: e.name,
                                        age: e.age,
                                        gender: e.gender,
                                        breeds: e.breeds,
                                    });
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};
export default Card;
