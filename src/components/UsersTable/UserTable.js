import React, { useEffect, useState } from 'react';

import * as db from '../../data';
import { getUsers } from '../../api/usersProvider';
import Header from '../Header';
import Content from '../Content';
import Pagination from '../Pagination';
import Loader from '../Loader';

import { StyledTable, StyledMessage, StyledSearchInput } from './UserTable.styled';

function UserTable() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [pageOptions, setPageOptions] = useState({ limit: 10, skip: 0, currentPage: 1 });
    const [filterQuery, setFilterQuery] = useState({ value: '', field: '', query: '' });
    const [sorting, setSorting] = useState({ column: 'id', order: 'asc' });

    console.log(data);

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

        fetchData({ ...pageOptions, ...filterQuery });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageOptions.skip, filterQuery]);

    useEffect(() => {
        if (data && data.users) {
            const sorted = sortUsers(data.users, sorting.column, sorting.order);
            setData(prevData => ({ ...prevData, users: sorted }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting]);

    const searchTable = newQuery => {
        setFilterQuery(newQuery);
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

    const onChangeHandler = e => {
        setFilterQuery(prevQuery => ({ ...prevQuery, query: e.target.value, skip: 0, currentPage: 1 }));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data)
        return (
            <div>
                <Loader />
            </div>
        );

    return (
        <div>
            <StyledSearchInput
                aria-label='query-search'
                name='query-search'
                placeholder='search users'
                onChange={onChangeHandler}
                value={filterQuery.query}
            />
            <StyledTable>
                <Header
                    columns={db.columns}
                    sorting={sorting}
                    handleSearch={searchTable}
                    sortTable={sortTable}
                    filterQuery={filterQuery}
                />
                <Content entries={data.users} columns={db.columns} />
            </StyledTable>
            {data.total > 0 && <Pagination data={data} setPageOptions={setPageOptions} pageOptions={pageOptions} />}
            {data.total === 0 && data.users.length === 0 && (
                <StyledMessage>Could not find entries for the query.</StyledMessage>
            )}
        </div>
    );
}

export default UserTable;
