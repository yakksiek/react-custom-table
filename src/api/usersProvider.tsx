import * as t from '../models/interfaces';

const url = 'https://dummyjson.com/users';

export function getUsers(options: t.UserFetchOptions = {}) {
    let optionsURL = '';
    const query = options.query || '';

    if (options.value && options.value !== '') {
        optionsURL = `/filter?key=${options.field}&value=${options.value}`;
    } else {
        optionsURL = `/search?q=${query}&limit=${options.limit}&skip=${options.skip}`;
    }

    return _fetch(optionsURL);
}

function _fetch(optionsURL: string = ''): Promise<t.FetchedUsersData> {
    return fetch(`${url}${optionsURL}`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject(resp.statusText);
    });
}
