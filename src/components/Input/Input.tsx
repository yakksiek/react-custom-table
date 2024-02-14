import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    margin-top: 1rem;
    background: transparent;
    border: 1px solid #fff;
    width: 100%;
    padding: 8px;
    color: #a79a47;
    font-weight: bold;
    font-size: 0.9rem;
`;

interface InputProps {
    data: {
        title: string;
        field: string;
        filter?: boolean;
    };
    handleSearch: ({ field, value }: { field: string; value: string }) => void;
    filterQuery?: {
        value: string;
        field: string;
    };
}

function Input({ data, handleSearch, filterQuery }: InputProps) {
    const { field, title } = data;

    const { value: searchValue, field: searchField } = filterQuery || {};

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        handleSearch({ field, value });
    };

    return (
        <StyledInput
            aria-label={field}
            name={field}
            placeholder={`filter ${title}`}
            onChange={changeHandler}
            value={field === searchField ? searchValue : ''}
        />
    );
}

export default Input;
