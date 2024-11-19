import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import st from './SearchBar.module.css'


const SearchBar = ({ onSearch, text }) => {
    const [searchText, setSearchText] = useState(text);

    //const dispatch = useDispatch();
    //const text_find = useSelection( (state) => state.text_find);

    const debouncedSearch = debounce((value) => {
        onSearch(value);
    }, 500);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        debouncedSearch(value);

    };

    return (
        <Input
            placeholder="Поиск"
            prefix={<SearchOutlined style={{ color: '#1890FF' }} />}
            value={searchText}
            onChange={handleChange}
            onSearch={(value) => onSearch(value)}
            allowClear
            className={st.searchBar}
        />
    );
};

export default SearchBar;
