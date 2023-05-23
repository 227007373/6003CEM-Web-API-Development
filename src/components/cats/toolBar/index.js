import styles from './toolBar.module.scss';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
const ToolBar = ({ setData }) => {
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState('');
    const searchCats = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/search?q=${search}`, {
            method: 'GET',
        })
            .then((res) => {
                setData(res.data.data);
                setSearching(search);
            })
            .catch((err) => {});
    };
    const clearCats = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/list`, {
            method: 'GET',
        })
            .then((res) => {
                setData(res.data);
                setSearch('');
                setSearching('');
            })
            .catch((err) => {});
    };
    return (
        <div className={styles.nav}>
            <div className={styles.searchBar}>
                <InputBase
                    sx={{ pl: 1, pr: 1, flex: 1 }}
                    placeholder='Search...'
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    value={search}
                />{' '}
                {searching && (
                    <IconButton
                        type='button'
                        sx={{ p: '10px' }}
                        aria-label='clear'
                        onClick={clearCats}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                <IconButton
                    type='button'
                    sx={{ p: '10px' }}
                    aria-label='search'
                    onClick={searchCats}
                >
                    <SearchIcon />
                </IconButton>
            </div>
        </div>
    );
};
export default ToolBar;
