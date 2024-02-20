import React, { useEffect, useState, ChangeEvent } from 'react';

import * as db from '../../data';
import * as t from '../../models/interfaces';
import { getUsers } from '../../api/usersProvider';
import Header from '../Header';
import Content from '../Content';
import Pagination from '../Pagination';
import Loader from '../Loader';

import { StyledTable, StyledMessage, StyledSearchInput } from './UserTable.styled';

function UserTable() {
    const [data, setData] = useState<t.FetchedUsersData>({ users: [], total: 0, skip: 0, limit: 0 });
    const [error, setError] = useState('');
    const [pageOptions, setPageOptions] = useState({ limit: 10, skip: 0, currentPage: 1 });
    const [filterQuery, setFilterQuery] = useState({ value: '', field: '', query: '' });
    const [sorting, setSorting] = useState<t.Sorting>({ column: 'id', order: 'asc' });

    useEffect(() => {
        const fetchData = async (options: t.UserFetchOptions) => {
            try {
                const data = await getUsers(options);
                setData(data);
                setError('');
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData({ ...pageOptions, ...filterQuery });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageOptions.skip, filterQuery]);

    useEffect(() => {
        if (data && data.users) {
            setData(prevData => {
                const sortedUsers = sortUsers(prevData.users, sorting.column, sorting.order);
                return { ...prevData, users: sortedUsers };
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting]);

    const searchTable = (newQuery: t.HandleSearchFunctionParams) => {
        setFilterQuery(prevQuery => ({ ...prevQuery, ...newQuery }));
    };

    const sortTable = (newSorting: t.Sorting) => {
        const { column: newColumn } = newSorting;
        setSorting(prevSorting => {
            if (newColumn === prevSorting.column) {
                return newSorting;
            }

            return { column: newColumn, order: 'asc' };
        });
    };

    const sortUsers = (users: t.User[], key: string, order: 'asc' | 'desc' = 'asc'): t.User[] => {
        const newUsersArr: t.User[] = [...users];
        return newUsersArr.sort((a, b) => {
            const keyA = a[key as keyof t.User];
            const keyB = b[key as keyof t.User];

            if (keyA < keyB) {
                return order === 'asc' ? -1 : 1;
            }
            if (keyA > keyB) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterQuery(prevQuery => ({ ...prevQuery, query: e.target.value }));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (Object.keys(data).length === 0)
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
