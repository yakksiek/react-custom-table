import React from 'react';
import styled from 'styled-components';

import * as h from '../../helpers';
import Button from '../Button';
import { isCompositeComponent } from 'react-dom/test-utils';

export const StyledNavigation = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;

export const StyledNagivationList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;

    li {
        padding: 0 1rem;

        &.active {
            color: rgb(195 154 100);
            font-weight: bold;
            font-size: 1.25rem;
        }
    }
`;

function Pagination({ data, setPageOptions, pageOptions }) {
    const handlePrevPage = () => {
        if (pageOptions.skip === 0) return;

        setPageOptions(prevPageOptions => {
            const currentPage = prevPageOptions.currentPage - 1;
            const newSkip = prevPageOptions.skip - prevPageOptions.limit;
            return { ...prevPageOptions, skip: newSkip, currentPage };
        });
    };

    const handleNextPage = () => {
        setPageOptions(prevPageOptions => {
            const currentPage = prevPageOptions.currentPage + 1;
            return {
                ...prevPageOptions,
                skip: prevPageOptions.skip + prevPageOptions.limit,
                currentPage,
            };
        });
    };

    const { pageNumbers, pages, begin, end } = h.generatePaginationData(
        pageOptions.currentPage,
        data.limit,
        data.total,
    );

    console.log(pageNumbers);

    const renderNumbers = numbersArr => {
        return numbersArr.map((item, index) => {
            const classActive = item === pageOptions.currentPage ? 'active' : '';
            return (
                <li className={classActive} key={index}>
                    {item}
                </li>
            );
        });
    };

    return (
        <StyledNavigation>
            <Button disabled={data.skip === 0} clickHandler={handlePrevPage} classes='nav-pagination'>
                &lt;
            </Button>
            <StyledNagivationList>{renderNumbers(pageNumbers)}</StyledNagivationList>
            <Button
                disabled={data.total === data.skip + data.limit}
                clickHandler={handleNextPage}
                classes='nav-pagination'
            >
                &gt;
            </Button>
        </StyledNavigation>
    );
}

export default Pagination;
