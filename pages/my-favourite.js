import Layout from '@/components/layout';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/contexts/user.context';
import axios from 'axios';
import Favs from '@/components/fav';
const MyFavouritePage = () => {
    const [cats, setCats] = useState([]);
    const { user, setUser } = useContext(UserContext);
    let render = () => {
        setCats(user.favourite);
    };
    useEffect(() => {
        render();
    }, [user]);

    return (
        <Layout>
            <Favs
                data={cats}
                setData={(e) => {
                    setCats(e);
                }}
                updateData={render}
            />
        </Layout>
    );
};
export default MyFavouritePage;
