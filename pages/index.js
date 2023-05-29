import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cats from '@/components/cats';
const Home = () => {
    const [cats, setCats] = useState([]);
    let render = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/list`, {
            method: 'GET',
        })
            .then((res) => {
                setCats(res.data);
            })
            .catch((err) => {});
    };
    useEffect(() => {
        render();
    }, []);

    return (
        <Layout>
            <Cats
                data={cats}
                setData={(e) => {
                    setCats(e);
                }}
                updateData={render}
            />
        </Layout>
    );
};
export default Home;
