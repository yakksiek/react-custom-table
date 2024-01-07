import React, { useState } from 'react';

import Input from '../Input';

import { StyledHeader, StyledTableHeader, StyledSpan } from './HeaderCell.styled';

function HeaderCell({ columnData, sorting, sortTable, handleSearch, searchQuery }) {
    const [showSort, setShowSort] = useState(false);
    const { field, title, filter } = columnData;

    const isDescSorting = sorting.column === field && sorting.order === 'desc';
    const isAscSorting = sorting.column === field && sorting.order === 'asc';

    const futureSortingOrder = isDescSorting ? 'asc' : 'desc';

    const handleMouseOver = () => {
        setShowSort(true);
    };

    const handleMouseOut = () => {
        setShowSort(false);
    };

    return (
        <StyledTableHeader key={field}>
            <StyledHeader
                onClick={() => sortTable({ column: field, order: futureSortingOrder })}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {title}
                <div>
                    {isDescSorting && <StyledSpan>🔽</StyledSpan>}
                    {isAscSorting && <StyledSpan>🔼</StyledSpan>}
                </div>

                {showSort && !isAscSorting && !isDescSorting && <StyledSpan>🔼</StyledSpan>}
            </StyledHeader>
            <hr />
            {filter && <Input data={columnData} handleSearch={handleSearch} searchQuery={searchQuery} />}
        </StyledTableHeader>
    );
}

export default HeaderCell;
