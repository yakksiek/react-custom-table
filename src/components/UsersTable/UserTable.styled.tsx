import styled from 'styled-components';

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const StyledMessage = styled.h2`
    text-align: center;
    margin-top: 1rem;
`;

export const StyledSearchInput = styled.input`
    margin: 1rem 0;
    float: right;
    background-color: transparent;
    border: 2px solid rgb(195 154 100);
    padding: 1rem;
    border-radius: 100vh;
    min-width: 250px;
    color: #fff;
    align-self: flex-end;
`;
