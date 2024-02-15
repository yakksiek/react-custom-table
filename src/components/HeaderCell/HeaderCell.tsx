import React, { useState } from 'react';
import { UilAngleDoubleUp } from '@iconscout/react-unicons';
import { UilAngleDoubleDown } from '@iconscout/react-unicons';

import * as t from '../../models/interfaces';
import Input from '../Input';

import { StyledHeader, StyledTableHeader, StyledSortButton } from './HeaderCell.styled';

interface HeaderCellProps {
    columnData: t.HeaderCell;
    sorting: t.Sorting;
    sortTable: (newSorting: t.Sorting) => t.Sorting;
    handleSearch: ({ field, value }: { field: string; value: string }) => void;
    filterQuery?: t.FilterQuery;
}

function HeaderCell({ columnData, sorting, sortTable, handleSearch, filterQuery }: HeaderCellProps) {
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
                    {isDescSorting && (
                        <StyledSortButton>
                            <UilAngleDoubleUp color='rgb(195 154 100)' />
                        </StyledSortButton>
                    )}
                    {isAscSorting && (
                        <StyledSortButton>
                            <UilAngleDoubleDown color='rgb(195 154 100)' />
                        </StyledSortButton>
                    )}
                </div>

                {showSort && !isAscSorting && !isDescSorting && (
                    <StyledSortButton>
                        <UilAngleDoubleDown color='white' />
                    </StyledSortButton>
                )}
            </StyledHeader>
            <hr />
            {filter && <Input data={columnData} handleSearch={handleSearch} filterQuery={filterQuery} />}
        </StyledTableHeader>
    );
}

export default HeaderCell;
