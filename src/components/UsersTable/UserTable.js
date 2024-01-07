import React, { useEffect, useState } from 'react';

import { getUsers } from '../../api/usersProvider';
import Header from '../Header';
import Content from '../Content';

import { StyledTable } from './UserTable.styled';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [sorting, setSorting] = useState({ column: 'id', order: 'asc' });
    const columns = ['id', 'firstName', 'lastName', 'age', 'email'];

    useEffect(() => {
        const fetchData = async () => {
            const { users } = await getUsers();

            setUsers(users);
        };

        fetchData();
    }, []);

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
                <Header columns={columns} sorting={sorting} sortTable={sortTable} />
                <Content entries={users} columns={columns} />
            </StyledTable>
        </div>
    );
}

export default UserTable;
