import React from 'react';
import { StyledButton } from './Button.styled';

interface ButtonProps {
    clickHandler: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    classes?: string;
}

const Button = ({ clickHandler, children, disabled = false, classes = '' }: ButtonProps) => {
    return (
        <StyledButton disabled={disabled} onClick={clickHandler} type='button' className={classes}>
            {children}
        </StyledButton>
    );
};

export default Button;
