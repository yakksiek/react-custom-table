import React from 'react';

import HeaderCell from '../HeaderCell';

function Header({ columns, sorting, sortTable, handleSearch, filterQuery }) {
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
