import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

export const StyledNavigation = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
`;

function Pagination({ data, prevPageHandler, nextPageHandler }) {
    return (
        <StyledNavigation>
            <Button disabled={data.skip === 0} clickHandler={prevPageHandler} classes='nav-pagination'>
                &lt;
            </Button>
            <Button
                disabled={data.total === data.skip + data.limit}
                clickHandler={nextPageHandler}
                classes='nav-pagination'
            >
                &gt;
            </Button>
        </StyledNavigation>
    );
}

export default Pagination;
