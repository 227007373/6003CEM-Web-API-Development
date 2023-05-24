import styles from './toolBar.module.scss';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
const ToolBar = ({ setData }) => {
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState('');
    const [breedOptions, setBreedOptions] = useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    useEffect(() => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/breeds`, {
            method: 'GET',
        })
            .then((res) => {
                setBreedOptions(res.data.data[0].breeds);
            })
            .catch((err) => {});
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/gender`, {
            method: 'GET',
        })
            .then((res) => {
                setGenderOptions(res.data.data[0].gender);
            })
            .catch((err) => {});
    }, []);
    const searchCats = () => {
        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/search?q=${search}`, {
            method: 'GET',
        })
            .then((res) => {
                setData(res.data.data);
                setSearching(search);
                setGender('none');
                setBreeds('none');
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
    const [breeds, setBreeds] = useState('none');
    const [gender, setGender] = useState('none');

    return (
        <>
            <div className={styles.nav}>
                <Select
                    sx={{ mr: 2 }}
                    defaultValue='none'
                    onChange={(e) => {
                        setBreeds(e.target.value);
                        setGender('none');
                        setSearch('');
                        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/filter`, {
                            method: 'POST',
                            data: {
                                breeds: e.target.value,
                            },
                        })
                            .then((res) => {
                                setData(res.data.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                    value={breeds}
                >
                    <MenuItem
                        value='none'
                        disabled
                    >
                        Select Breeds
                    </MenuItem>
                    {breedOptions.map((e, i) => {
                        return (
                            <MenuItem
                                key={i}
                                value={e}
                            >
                                {e}
                            </MenuItem>
                        );
                    })}
                </Select>
                <Select
                    sx={{ mr: 2 }}
                    defaultValue='none'
                    onChange={(e) => {
                        setGender(e.target.value);
                        setBreeds('none');
                        setSearch('');
                        axios(`${process.env.NEXT_PUBLIC_BASEURL}/cat/filter`, {
                            method: 'POST',
                            data: {
                                gender: e.target.value,
                            },
                        })
                            .then((res) => {
                                setData(res.data.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                    value={gender}
                >
                    <MenuItem
                        value='none'
                        disabled
                    >
                        Select Gender
                    </MenuItem>
                    {genderOptions?.map((e, i) => {
                        return (
                            <MenuItem
                                key={i}
                                value={e}
                            >
                                {e}
                            </MenuItem>
                        );
                    })}
                </Select>
                {breeds != 'none' || gender != 'none' || searching != '' ? (
                    <div
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => {
                            setBreeds('none');
                            setGender('none');
                            setSearch('');
                            setSearching('');
                            axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/cat/list`).then((res) => {
                                setData(res.data);
                            });
                        }}
                    >
                        reset
                    </div>
                ) : null}
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
        </>
    );
};
export default ToolBar;
