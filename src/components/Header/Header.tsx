import React from 'react';

import HeaderCell from '../HeaderCell';
import * as t from '../../models/interfaces';

interface HeaderProps {
    columns: t.HeaderCell[];
    sorting: t.Sorting;
    sortTable: (newSorting: t.Sorting) => t.Sorting;
    handleSearch: ({ field, value }: { field: string; value: string }) => void;
    filterQuery?: t.FilterQuery
}

function Header({ columns, sorting, sortTable, handleSearch, filterQuery }: HeaderProps) {
    return (
        <thead>
            <tr>
                {columns.map(column => {
                    const { field } = column;
                    return (
                        <HeaderCell
                            columnData={column}
                            sorting={sorting}
                            key={field}
                            sortTable={sortTable}
                            handleSearch={handleSearch}
                            filterQuery={filterQuery}
                        />
                    );
                })}
            </tr>
        </thead>
    );
}

export default Header;
