import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    margin-top: 1rem;
    background: transparent;
    border: 1px solid #fff;
    width: 90%;
    padding: 8px;
    color: #a79a47;
    font-weight: bold;
    font-size: 0.9rem;
`;

function Input({ data, handleSearch, searchQuery }) {
    const { field, title } = data;
    // console.log(title);
    // console.log(searchQuery);

    const { value: searchValue, field: searchField } = searchQuery || {};

    console.log('searchValue');
    console.log(searchValue);
    console.log('searchField');
    console.log(searchField);

    const changeHandler = e => {
        const { value } = e.target;

        handleSearch({ field, value });
    };

    return (
        <StyledInput
            name={field}
            placeholder={`filter ${title}`}
            onChange={changeHandler}
            value={field === searchField ? searchValue : ''}
        />
    );
}

export default Input;
