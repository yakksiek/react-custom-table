import React from 'react';

import HeaderCell from '../HeaderCell/HeaderCell';

function Header({ columns, sorting, sortTable, handleSearch, searchQuery }) {
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
                            searchQuery={searchQuery}
                        />
                    );
                })}
            </tr>
        </thead>
    );
}

export default Header;
