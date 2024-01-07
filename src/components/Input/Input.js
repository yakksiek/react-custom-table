import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    margin-top: 1rem;
`;

function Input({ name }) {
    return <StyledInput name={name} />;
}

export default Input;
