import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

export const StyledNavigation = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
`;

function Pagination({ data, setPageOptions, pageOptions }) {
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

    return (
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
    );
}

export default Pagination;
