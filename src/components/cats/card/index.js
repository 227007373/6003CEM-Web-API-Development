import styles from './card.module.scss';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useContext } from 'react';
import { UserContext } from '@/contexts/user.context';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
const Card = ({ e, staff }) => {
    const { user } = useContext(UserContext);
    const [liked, setLiker] = useState(user?.favourite?.includes(e._id));

    const fav = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/favourite`, {
            method: 'PUT',
            data: { username: user.username, id: e._id },
        })
            .then((res) => {
                setLiker(res.data.data.liked);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={styles.cat}>
            <div className={styles.image}>
                {!staff ? (
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
        </div>
    );
};
export default Card;
