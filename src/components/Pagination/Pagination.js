import React from 'react';
import styled from 'styled-components';

import * as h from '../../helpers';
import Button from '../Button';

import downArrowImage from '../../assets/down-arrow-svgrepo-com.svg';

export const StyledNavigation = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const StyledNagivationList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid transparent;

    li {
        margin: 1rem;
        transition: transform 0.2s ease;

        &.active {
            color: rgb(195 154 100);
            font-weight: bold;
            font-size: 1.25rem;
        }

        &.disabled {
            pointer-events: none;
        }

        &:hover {
            cursor: pointer;
            transform: scale(1.3);
            font-weight: bold;
            letter-spacing: -0.05em;
        }
    }
`;

export const StyledSelect = styled.select`
    background-color: transparent;
    color: #fff;
    padding: 0.5rem 0rem 0.5rem 0.5rem;
    border-radius: 100vh;
    transition: transform 0.2s ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    padding-right: 30px;
    background-image: url(${downArrowImage});
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;
    background-size: 18px;
    filter: brightness(0) invert(1);

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        letter-spacing: -0.01em;
    }
`;

function Pagination({ data, setPageOptions, pageOptions }) {
    const handleChangePage = change => {
        const pageChangeMapping = {
            prev: currentPage => Math.max(1, currentPage - 1),
            next: currentPage => currentPage + 1,
            number: (currentPage, newPage) => newPage,
        };

        setPageOptions(prevPageOptions => {
            let newPage;

            if (typeof change === 'number') {
                newPage = pageChangeMapping['number'](prevPageOptions.currentPage, change);
            } else {
                newPage = pageChangeMapping[change](prevPageOptions.currentPage);
            }

            if (newPage === prevPageOptions.currentPage) return prevPageOptions;

            return {
                ...prevPageOptions,
                currentPage: newPage,
                skip: (newPage - 1) * prevPageOptions.limit,
            };
        });
    };

    const { pageNumbers } = h.generatePaginationData(pageOptions.currentPage, data.limit, data.total);

    const renderNumbers = numbersArr => {
        return numbersArr.map((item, index) => {
            const classActive = item === pageOptions.currentPage ? 'active' : '';
            const disabled = item === '...' ? 'disabled' : '';
            return (
                <li className={`${classActive} ${disabled}`} key={index} onClick={() => handleChangePage(item)}>
                    {item}
                </li>
            );
        });
    };

    const renderPageOptions = () => {
        const totalPages = Math.ceil(data.total / data.limit);
        let options = [];
        for (let i = 1; i <= totalPages; i++) {
            options.push(
                <option key={i} value={i}>
                    Page {i} / {totalPages}
                </option>,
            );
        }
        return options;
    };

    const handleSelectChange = e => {
        const selectedPage = parseInt(e.target.value, 10);
        handleChangePage(selectedPage);
    };

    return (
        <StyledNavigation>
            <Button disabled={data.skip === 0} clickHandler={() => handleChangePage('prev')} classes='nav-pagination'>
                &lt;
            </Button>
            <StyledNagivationList>{renderNumbers(pageNumbers)}</StyledNagivationList>
            <Button
                disabled={data.total === data.skip + data.limit}
                clickHandler={() => handleChangePage('next')}
                classes='nav-pagination'
            >
                &gt;
            </Button>
            <StyledSelect onChange={handleSelectChange} value={pageOptions.currentPage}>
                {renderPageOptions()}
            </StyledSelect>
        </StyledNavigation>
    );
}

export default Pagination;
