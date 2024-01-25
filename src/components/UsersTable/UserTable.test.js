import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserTable from './UserTable';

function setup(mockSetPageOptions) {
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

    it('displays a message when query is not found', async () => {
        const invalidFirstName = 'invalid name';
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

        let inputEl = null;
        await waitFor(() => {
            inputEl = screen.getByRole('textbox', { name: 'firstName' });
        });

        userEvent.type(inputEl, invalidFirstName);
        await waitFor(() => {
            expect(screen.getByText(/Could not find entries for the query./i)).toBeInTheDocument();
        });

        fetch.mockRestore();
    });
});

describe('UserTable Client-Side Sorting', () => {
    it('sorts data on the client side when a header cell sort button is clicked', async () => {
        jest.spyOn(window, 'fetch');

        const mockUsersData = {
            users: [
                { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                { id: 2, firstName: 'Alan', lastName: 'Doe', email: 'alan@pope.com' },
            ],
        };

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersData.users };
            },
        });

        setup();

        await waitFor(() => {
            const users = screen.getAllByText(/com/i);

            expect(users[0]).toHaveTextContent('john@example.com');
        });

        const headerCell = screen.getByText('Name');
        userEvent.click(headerCell);

        await waitFor(() => {
            const sortedUsers = screen.getAllByText(/com/i);
            expect(sortedUsers[0]).toHaveTextContent('alan@pope.com');
        });
    });
});
