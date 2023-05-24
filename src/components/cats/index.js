import styles from './cats.module.scss';
import Card from './card';
import ToolBar from './toolBar';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/user.context';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
const Cats = ({ data, setData }) => {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        breeds: '',
    });
    const onChange = (e) => {
        setForm((p) => {
            return {
                ...p,
                [e.target.name]: e.target.value,
            };
        });
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
                                key={i}
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
                                    // error={error.includes('emptyUsername') || error.includes('worngInformation')}
                                    // errorMsg={error.includes('emptyUsername') ? 'this field is required' : ''}
                                />
                            </div>
                            <div>
                                <div>breeds:</div>

                                <TextField
                                    className={styles.input}
                                    name='breeds'
                                    value={form.breeds}
                                    onChange={onChange}
                                    // error={error.includes('emptyUsername') || error.includes('worngInformation')}
                                    // errorMsg={error.includes('emptyUsername') ? 'this field is required' : ''}
                                />
                            </div>
                            <div>
                                <div>age:</div>

                                <TextField
                                    className={styles.input}
                                    name='age'
                                    value={form.age}
                                    onChange={onChange}
                                    // error={error.includes('emptyUsername') || error.includes('worngInformation')}
                                    // errorMsg={error.includes('emptyUsername') ? 'this field is required' : ''}
                                />
                            </div>
                            <div>
                                <div>gender:</div>

                                <TextField
                                    className={styles.input}
                                    name='gender'
                                    value={form.gender}
                                    onChange={onChange}
                                    // error={error.includes('emptyUsername') || error.includes('worngInformation')}
                                    // errorMsg={error.includes('emptyUsername') ? 'this field is required' : ''}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};
export default Cats;
