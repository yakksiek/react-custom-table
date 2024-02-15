const url = 'https://dummyjson.com/users';

interface UserFetchOptions {
    query?: string;
    value?: string;
    field?: string;
    limit?: number;
    skip?: number;
}

interface FetchStatus {
    ok: boolean;
    status: number;
}

export function getUsers(options: UserFetchOptions = {}) {
    let optionsURL = '';
    const query = options.query || '';

    if (options.value && options.value !== '') {
        optionsURL = `/filter?key=${options.field}&value=${options.value}`;
    } else {
        optionsURL = `/search?q=${query}&limit=${options.limit}&skip=${options.skip}`;
    }

    return _fetch(optionsURL);
}

function _fetch(optionsURL: string = ''): Promise<FetchStatus> {
    return fetch(`${url}${optionsURL}`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject(resp.statusText);
    });
}
