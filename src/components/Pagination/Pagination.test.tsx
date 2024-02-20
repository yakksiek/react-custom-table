/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import * as t from '../../models/interfaces';

type SetPageOptionsFunc = (options: t.PageOptions) => void;

function setup(mockSetPageOptions: SetPageOptionsFunc) {
    render(
        <Pagination
            data={{ skip: 0, limit: 10, total: 100, users: [] }}
            setPageOptions={mockSetPageOptions}
            pageOptions={{ limit: 10, skip: 0, currentPage: 1 }}
        />,
    );
}

describe('Pagination', () => {
    const mockSetPageOptions = jest.fn();

    it('renders pagination component', () => {
        setup(mockSetPageOptions);

        expect(screen.getByText(/page 1 \/ 10/i)).toBeInTheDocument();
    });

    it('renders correct number of page buttons', () => {
        setup(mockSetPageOptions);

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(4);
    });

    it('changes to next page by clicking next button', () => {
        setup(mockSetPageOptions);

        const nextPageButton = screen.getByRole('button', { name: '>' });
        userEvent.click(nextPageButton);
        expect(mockSetPageOptions).toHaveBeenCalledTimes(1);
    });

    it('changes to the respective page when clicking a button', () => {
        setup(mockSetPageOptions);

        const pageNumberButton = screen.getByText('2');
        userEvent.click(pageNumberButton);
        expect(screen.getByText(/page 2/i)).toBeInTheDocument();
    });
});
