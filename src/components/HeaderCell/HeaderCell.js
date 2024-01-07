import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../Input';

const StyledTableHeader = styled.th`
    border: 1px solid #ddd;
    text-align: left;
    padding: 1rem 8px;
`;

const StyledSpan = styled.span`
    font-size: 1.5rem;
`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

function HeaderCell({ columnData, sorting, sortTable }) {
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
        <StyledTableHeader key={field} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <StyledHeader onClick={() => sortTable({ column: field, order: futureSortingOrder })}>
                {title}
                <div>
                    {isDescSorting && <StyledSpan>🔽</StyledSpan>}
                    {isAscSorting && <StyledSpan>🔼</StyledSpan>}
                </div>

                {showSort && !isAscSorting && !isDescSorting && <StyledSpan>🔼</StyledSpan>}
            </StyledHeader>

            {/* {filter && <Input name={field} />} */}
        </StyledTableHeader>
    );
}

export default HeaderCell;
