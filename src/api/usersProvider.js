const url = 'https://dummyjson.com/users';

export function getUsers(options = {}) {
    let optionsURL = '';

    if (options.value && options.value !== '') {
        optionsURL = `/filter?key=${options.field}&value=${options.value}`;
    } else {
        optionsURL = `?limit=${options.limit}&skip=${options.skip}`;
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
