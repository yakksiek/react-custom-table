import React from 'react';

import HeaderCell from '../HeaderCell/HeaderCell';

function Header({ columns, sorting, sortTable }) {
    return (
        <thead>
            <tr>
                {columns.map(column => {
                    const { field } = column;
                    return <HeaderCell columnData={column} sorting={sorting} key={field} sortTable={sortTable} />;
                })}
            </tr>
        </thead>
    );
}

export default Header;
