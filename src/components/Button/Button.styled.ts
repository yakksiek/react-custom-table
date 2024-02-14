import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    color: rgb(195 154 100);
    cursor: pointer;

    ${({ className }) =>
        className === 'nav-pagination' &&
        css`
            font-size: 1.5rem;
            border: 1px solid rgb(195 154 100);
            border-radius: 50%;
            aspect-ratio: 1;
            width: 2rem;
            height: 2rem;

            &:hover {
                border: 2px solid rgb(195 154 100);
            }
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            visibility: hidden;
        `}
`;
