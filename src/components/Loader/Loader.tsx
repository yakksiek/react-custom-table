import React from 'react';

import { StyledSpinnerContainer, StyledSpinner } from './Loader.styled';

const Loader: React.FC = () => (
    <StyledSpinnerContainer>
        <StyledSpinner />
    </StyledSpinnerContainer>
);

export default Loader;
