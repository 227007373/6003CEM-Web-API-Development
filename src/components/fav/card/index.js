import styles from '../cats.module.scss';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/user.context';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
const Card = ({ e, staff }) => {
    const { user, setUser } = useContext(UserContext);
    const [liked, setLiked] = useState();
    useEffect(() => {
        if (user) {
            setLiked(
                user?.favourite?.find((item) => {
                    return JSON.stringify(item?._id) == JSON.stringify(e?._id);
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
                        setUser((p) => {
                            return { token: window.localStorage.getItem('jwt'), ...res.data.data };
                        });
                    })
                    .catch((err) => {});
            })
            .catch((err) => {});
    };

    return (
        <div className={styles.cat}>
            <div className={styles.image}>
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
            <div>
                <div>name:</div>
                <span>{e?.name}</span>
            </div>
            <div>
                <div>breeds:</div>
                <span>{e?.breeds}</span>
            </div>
            <div>
                <div>age:</div>
                <span>{e?.age}</span>
            </div>
            <div>
                <div>gender:</div>
                <span>{e?.gender}</span>
            </div>
        </div>
    );
};
export default Card;
