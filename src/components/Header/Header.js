import React from 'react';

import HeaderCell from '../HeaderCell/HeaderCell';

function Header({ columns, sorting, sortTable }) {
    return (
        <thead>
            <tr>
                {columns.map(column => {
                    return <HeaderCell column={column} sorting={sorting} key={column} sortTable={sortTable} />;
                })}
            </tr>
        </thead>
    );
}

export default Header;
