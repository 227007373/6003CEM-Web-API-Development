import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cats from '@/components/cats';
const CatsPage = () => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/list`, {
            method: 'GET',
        })
            .then((res) => {
                setCats(res.data);
            })
            .catch((err) => {});
    }, []);
    return (
        <Layout>
            <Cats
                data={cats}
                setData={(e) => {
                    console.log(e);
                    setCats(e);
                }}
            />
        </Layout>
    );
};
export default CatsPage;
