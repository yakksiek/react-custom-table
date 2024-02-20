import { getUsers } from './usersProvider';
import { validUsers } from '../testData/validUsers';

describe('getUsers()', () => {
    it('should fetch users when send request', async () => {
        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: validUsers };
            },
        } as Response);

        const data = await getUsers();
        expect(data.users).toBe(validUsers);
        expect(mockFetch).toHaveBeenCalledTimes(1);

        mockFetch.mockRestore();
    });

    it('should fetch users with filter options', async () => {
        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ users: [] }),
        } as Response);

        const filterOptions = { field: 'firstName', value: 'Miles' };
        const data = await getUsers(filterOptions);

        expect(data.users).toEqual([]);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            `https://dummyjson.com/users/filter?key=${filterOptions.field}&value=${filterOptions.value}`,
        );

        mockFetch.mockRestore();
    });

    it('should handle fetch errors', async () => {
        const mockFetch = jest.spyOn(window, 'fetch') as jest.MockedFunction<typeof window.fetch>;

        const errorResponse = new Response(null, {
            status: 404,
            statusText: 'Not Found',
        });
        mockFetch.mockResolvedValueOnce(errorResponse);

        await expect(getUsers({ limit: 10, skip: 0, query: 'test' })).rejects.toMatch('Not Found');

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(`https://dummyjson.com/users/search?q=test&limit=10&skip=0`);

        mockFetch.mockRestore();
    });
});
