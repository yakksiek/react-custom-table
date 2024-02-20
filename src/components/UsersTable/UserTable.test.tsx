import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserTable from './UserTable';

function setup() {
    render(<UserTable />);
}

describe('UserTable', () => {
    const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

    it('should show an error when failed to fetch data', async () => {
        setup();

        mockFetch.mockRejectedValueOnce(new Error('Failed to fetch data'));

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
        });

        mockFetch.mockRestore();
    });

    it('displays user data correctly after fetching', async () => {
        const mockUsersData = {
            users: [
                { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                { id: 2, firstName: 'Alan', lastName: 'Pope', email: 'alan@pope.com' },
            ],
        };

        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersData.users };
            },
        } as Response);

        setup();

        await waitFor(() => {
            mockUsersData.users.forEach(user => {
                expect(screen.getByText(user.firstName)).toBeInTheDocument();
                expect(screen.getByText(user.email)).toBeInTheDocument();
            });
        });

        mockFetch.mockRestore();
    });

    it('displays a message when query is not found', async () => {
        const invalidAge = '100';
        const mockUsersData = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 32 },
            { id: 2, firstName: 'Alan', lastName: 'Pope', email: 'alan@pope.com', age: 26 },
        ];

        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersData };
            },
        } as Response);

        setup();

        const searchInput = screen.getByPlaceholderText('filter Age');
        userEvent.type(searchInput, invalidAge);
        await waitFor(() => {
            expect(screen.getByText(/Could not find entries for the query./i)).toBeInTheDocument();
        });

        mockFetch.mockRestore();
    });
});

describe('UserTable Client-Side Sorting', () => {
    it('sorts data on the client side when a header cell sort button is clicked', async () => {
        const mockUsersData = {
            users: [
                { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                { id: 2, firstName: 'Alan', lastName: 'Doe', email: 'alan@pope.com' },
            ],
        };

        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: mockUsersData.users };
            },
        } as Response);

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

        mockFetch.mockRestore();
    });
});

describe('UserTable search input', () => {
    it('displays users based on search query', async () => {
        const mockUsersData = {
            users: [
                { id: 1, firstName: 'Alice', lastName: 'Doe', email: 'alice@example.com' },
                { id: 2, firstName: 'Alan', lastName: 'Doe', email: 'alice@example.com' },
            ],
        };
        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsersData,
        } as Response);

        setup();

        const searchInput = screen.getByPlaceholderText('search users');
        userEvent.type(searchInput, 'NonExistentUser');

        await waitFor(() => {
            expect(screen.queryByText('Alan')).not.toBeInTheDocument();
        });

        mockFetch.mockRestore();
    });

    it('displays a message when no users are found for the query', async () => {
        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ users: [] }),
        } as Response);

        setup();

        let searchInput = screen.getByPlaceholderText('search users') as HTMLInputElement;
        userEvent.type(searchInput, 'NonExistentUser');

        await waitFor(() => {
            expect(screen.getByText(/Could not find entries for the query./i)).toBeInTheDocument();
        });

        mockFetch.mockRestore();
    });
});
