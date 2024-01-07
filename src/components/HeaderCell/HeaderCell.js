import React from 'react';
import styled from 'styled-components';

const StyledTableHeader = styled.th`
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
`;

function HeaderCell({ column, sorting, sortTable }) {
    const isDescSorting = sorting.column === column && sorting.order === 'desc';
    const isAscSorting = sorting.column === column && sorting.order === 'asc';

    const futureSortingOrder = isDescSorting ? 'asc' : 'desc';

    return (
        <StyledTableHeader key={column} onClick={() => sortTable({ column, order: futureSortingOrder })}>
            <div>
                {column}
                {isDescSorting && <span>🔽</span>}
                {isAscSorting && <span>🔼</span>}
            </div>
        </StyledTableHeader>
    );
}

export default HeaderCell;
