import React from 'react';

import * as h from '../../helpers';
import Button from '../Button';

import { StyledNagivationList, StyledNavigation, StyledSelect } from './Pagination.styled';

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

    const { pageNumbers } = h.generatePaginationData(pageOptions.currentPage, pageOptions.limit, data.total);

    const renderNumbers = numbersArr => {
        return numbersArr.map((item, index) => {
            const classActive = item === pageOptions.currentPage ? 'active' : '';
            const disabled = item === '...' ? 'disabled' : '';
            return (
                <li className={disabled} key={index} onClick={() => handleChangePage(item)}>
                    {disabled ? item : <button className={classActive}>{item}</button>}
                </li>
            );
        });
    };

    const renderPageOptions = () => {
        const totalPages = Math.ceil(data.total / pageOptions.limit);
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
                disabled={data.total === data.skip + pageOptions.limit}
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
