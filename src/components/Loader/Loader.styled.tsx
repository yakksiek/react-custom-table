import styled from 'styled-components';

export const StyledSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledSpinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #fff;
    animation: spin 1s ease infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
