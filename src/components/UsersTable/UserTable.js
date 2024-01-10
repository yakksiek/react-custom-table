import React, { useEffect, useState } from 'react';

import * as db from '../../data';
import { getUsers } from '../../api/usersProvider';
import Header from '../Header';
import Content from '../Content';

import { StyledTable } from './UserTable.styled';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState({ value: '', field: '' });
    const [sorting, setSorting] = useState({ column: 'id', order: 'asc' });

    useEffect(() => {
        const fetchData = async options => {
            const { users } = await getUsers(options);

            setUsers(users);
        };

        fetchData(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        console.log(sorting.column, sorting.order);
        const sorted = sortUsers(users, sorting.column, sorting.order);
        setUsers(sorted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting]);

    const searchTable = newQuery => {
        setSearchQuery(newQuery);
    };

    const sortTable = newSorting => {
        const { column: newColumn } = newSorting;
        setSorting(prevSorting => {
            if (newColumn === prevSorting.column) {
                return newSorting;
            }

            return { column: newColumn, order: 'asc' };
        });
    };

    const sortUsers = (users, key, order = 'asc') => {
        const newUsersArr = [...users];
        return newUsersArr.sort((a, b) => {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    return (
        <div>
            SEARCH BAR
            <StyledTable>
                <Header
                    columns={db.columns}
                    sorting={sorting}
                    handleSearch={searchTable}
                    sortTable={sortTable}
                    searchQuery={searchQuery}
                />
                <Content entries={users} columns={db.columns} />
            </StyledTable>
        </div>
    );
}

export default UserTable;
