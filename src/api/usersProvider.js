const url = 'https://dummyjson.com/users';

export function getUsers(options = null) {
    const optionsURL = options.value !== '' ? `filter?key=${options.field}&value=${options.value}` : '';
    return _fetch(optionsURL);
}

function _fetch(optionsURL = "") {
    return fetch(`${url}/${optionsURL}`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject(resp.statusText);
    });
}
