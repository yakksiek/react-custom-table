import styled from 'styled-components';
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
