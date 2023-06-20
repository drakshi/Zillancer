import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import './SearchBar.css';

export default function SearchBar({onSearch}) {
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
        onSearch(event.target.value);
    }
    console.log(searchInput);
    return (
        <div className='search-bar'>
            <div className='search-items'>
                <input type='text'
                    placeholder='Search Here'
                    onChange={handleSearch}
                    value={searchInput}
                >
                </input>
                <SearchIcon className='search-icon'/>
            </div>

        </div>
    )
}
