import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserTable from './UserTable';

function setup() {
    render(<UserTable />);
}

describe('UserTable', () => {
    jest.spyOn(window, 'fetch');

    it('should show an error when failed to fetch data', async () => {
        setup();

        window.fetch.mockRejectedValueOnce(new Error('Failed to fetch data'));

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
        });

        fetch.mockRestore();
    });

    it('displays user data correctly after fetching', async () => {
        const mockUsersData = {
            users: [
                { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                { id: 2, firstName: 'Alan', lastName: 'Pope', email: 'alan@pope.com' },
            ],
        };

        jest.spyOn(window, 'fetch');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersData.users };
            },
        });

        setup();

        await waitFor(() => {
            mockUsersData.users.forEach(user => {
                expect(screen.getByText(user.firstName)).toBeInTheDocument();
                expect(screen.getByText(user.email)).toBeInTheDocument();
            });
        });

        fetch.mockRestore();
    });
});

describe('UserTable pagination', () => {
    it('loads more items when the Next button is clicked', async () => {
        jest.spyOn(window, 'fetch');

        const mockUsersDataPage1 = {
            users: [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }],
        };

        const mockUsersDataPage2 = {
            users: [{ id: 2, firstName: 'Alan', lastName: 'Pope', email: 'alan@pope.com' }],
        };

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersDataPage1.users };
            },
        });

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersDataPage2.users };
            },
        });

        setup();

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
        });

        const nextPageButton = screen.getByRole('button', { name: '>' });
        userEvent.click(nextPageButton);

        await waitFor(() => {
            expect(screen.getByText('Alan')).toBeInTheDocument();
        });

        fetch.mockRestore();
    });

    it('should hide the Previous button on the first page', async () => {
        jest.spyOn(window, 'fetch');

        const mockUsersDataPage1 = {
            users: [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }],
        };

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersDataPage1.users };
            },
        });

        setup();

        const prevPageButton = screen.queryByRole('button', { name: '<' });
        expect(prevPageButton).toBeNull();
    });
});
