import React, { useEffect, useState } from 'react';

import * as db from '../../data';
import { getUsers } from '../../api/usersProvider';
import Header from '../Header';
import Content from '../Content';
import Pagination from '../Pagination';

import { StyledTable, StyledMessage } from './UserTable.styled';

function UserTable() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [pageOptions, setPageOptions] = useState({ limit: 10, skip: 0, currentPage: 1});
    const [searchQuery, setSearchQuery] = useState({ value: '', field: '' });
    const [sorting, setSorting] = useState({ column: 'id', order: 'asc' });

    useEffect(() => {
        const fetchData = async options => {
            try {
                const data = await getUsers(options);
                setData(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData({ ...pageOptions, ...searchQuery });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageOptions.skip, searchQuery]);

    useEffect(() => {
        if (data && data.users) {
            const sorted = sortUsers(data.users, sorting.column, sorting.order);
            setData(prevData => ({ ...prevData, users: sorted }));
        }
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

    
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) return <h1>loading</h1>;

    return (
        <div>
            <StyledTable>
                <Header
                    columns={db.columns}
                    sorting={sorting}
                    handleSearch={searchTable}
                    sortTable={sortTable}
                    searchQuery={searchQuery}
                />
                <Content entries={data.users} columns={db.columns} />
            </StyledTable>
            <Pagination data={data} setPageOptions={setPageOptions} pageOptions={pageOptions}/>
            {data.total === 0 && data.users.length === 0 && (
                <StyledMessage>Could not find entries for the query.</StyledMessage>
            )}
        </div>
    );
}

export default UserTable;
