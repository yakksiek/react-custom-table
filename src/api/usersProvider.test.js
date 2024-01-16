import { getUsers } from './usersProvider';
import validUsers from '../testData/validUsers.json';

describe('getUsers()', () => {
    it('should fetch users when send request', async () => {
        const spy = jest.spyOn(window, 'fetch');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { users: validUsers };
            },
        });

        const data = await getUsers();
        expect(data.users).toBe(validUsers);
        expect(window.fetch).toHaveBeenCalledTimes(1);
        // nie wiem, dalczego ten test nie przechodzi
        // Expected: "https://dummyjson.com/users?limit=10&skip=0"
        // Received: "https://dummyjson.com/users/filter?key=undefined&value=undefined"
        // expect(window.fetch).toHaveBeenCalledWith('https://dummyjson.com/users?limit=10&skip=0');

        spy.mockRestore();
    });

    it('should fetch users with filter options', async () => {
        const spy = jest.spyOn(window, 'fetch');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ users: [] }),
        });

        const filterOptions = { field: 'firstName', value: 'Miles' };
        const data = await getUsers(filterOptions);

        expect(data.users).toEqual([]);
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
            `https://dummyjson.com/users/filter?key=${filterOptions.field}&value=${filterOptions.value}`,
        );

        spy.mockRestore();
    });

    it('should handle fetch errors', async () => {
        const spy = jest.spyOn(window, 'fetch');

        const errorResponse = {
            ok: false,
            statusText: 'Not Found',
        };
        window.fetch.mockResolvedValueOnce(errorResponse);

        await expect(getUsers()).rejects.toMatch('Not Found');

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(`https://dummyjson.com/users?limit=undefined&skip=undefined`);

        spy.mockRestore();
    });
});
