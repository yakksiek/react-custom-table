![application presentation](src/assets/react-table-presentation.gif)

# React Custom Table 👉 ([live version](https://yakksiek.github.io/react-custom-table/))

The React Table application is designed to demonstrate the implementation of table features, including custom pagination and basic API data fetching. It serves as an educational tool for practicing the React Testing Library, focusing on writing unit and integration tests.

**Main features**:

1. **Easy to implement custom table component**

2. **Custom pagination implementation**

3. **Unit and integration tests**

    - Includes "spyOn" and "mock" usage.

4. **Styled Components**

5. **TypeScript**

&nbsp;

## 💡 Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

&nbsp;

## 🤔 Solutions provided in the project

**Example of userProvider test**

```javascript
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
```

&nbsp;

-   **Example of UseTable test**

```javascript
function setup() {
    render(<UserTable />);
}

describe('UserTable', () => {
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
});
```

&nbsp;

**Example of Pagination test**

```javascript
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

    it('changes to the respective page when clicking a button', () => {
        setup(mockSetPageOptions);

        const pageNumberButton = screen.getByText('2');
        userEvent.click(pageNumberButton);
        expect(screen.getByText(/page 2/i)).toBeInTheDocument();
    });
});
```

## 🙋‍♂️ Feel free to contact me

Write sth nice ;) Find me on [LinkedIn ](https://www.linkedin.com/in/marcin-kulbicki-426817a4/) or [Instagram](https://www.instagram.com/yakksiek/)

&nbsp;

## 👏 Thanks / Special thanks / Credits

Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.
