const url = 'https://dummyjson.com/users';

// interface UserFetchOptions {
//     query?: string;
//     value?: string;
//     field?: string;
//     limit?: number;
//     skip?: number;
// }

export function getUsers(options = {}) {
    let optionsURL = '';
    const query = options.query || '';

    if (options.value && options.value !== '') {
        optionsURL = `/filter?key=${options.field}&value=${options.value}`;
    } else {
        optionsURL = `/search?q=${query}&limit=${options.limit}&skip=${options.skip}`;
    }

    return _fetch(optionsURL);
}

function _fetch(optionsURL = '') {
    return fetch(`${url}${optionsURL}`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject(resp.statusText);
    });
}
