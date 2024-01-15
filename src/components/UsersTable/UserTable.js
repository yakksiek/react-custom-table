import React, { useEffect, useState } from 'react';

import * as db from '../../data';
import { getUsers } from '../../api/usersProvider';
import Header from '../Header';
import Content from '../Content';
import Button from '../Button';

import { StyledTable, StyledNavigation } from './UserTable.styled';

function UserTable() {
    const [data, setData] = useState(null);
    const [pageOptions, setPageOptions] = useState({ limit: 10, skip: 0, total: null });
    const [searchQuery, setSearchQuery] = useState({ value: '', field: '' });
    const [sorting, setSorting] = useState({ column: 'id', order: 'asc' });
    console.log(data);

    useEffect(() => {
        const fetchData = async options => {
            const data = await getUsers(options);
            setData(data);
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

    const handlePrevPage = () => {
        if (pageOptions.skip === 0) return;

        setPageOptions(prevPageOptions => {
            const newSkip = prevPageOptions.skip - prevPageOptions.limit;
            return { ...prevPageOptions, skip: newSkip };
        });
    };

    const handleNextPage = () => {
        setPageOptions(prevPageOptions => {
            return {
                ...prevPageOptions,
                skip: prevPageOptions.skip + prevPageOptions.limit,
            };
        });
    };

    if (!data) return <h1>loading</h1>;

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
                <Content entries={data.users} columns={db.columns} />
            </StyledTable>
            <StyledNavigation>
                <Button disabled={data.skip === 0} clickHandler={handlePrevPage} classes='nav-pagination'>
                    &lt;
                </Button>
                <Button
                    disabled={data.total === data.skip + data.limit}
                    clickHandler={handleNextPage}
                    classes='nav-pagination'
                >
                    &gt;
                </Button>
            </StyledNavigation>
        </div>
    );
}

export default UserTable;
