const url = 'https://dummyjson.com/users';

export function getUsers() {
    return _fetch();
}

function _fetch(options = null) {
    return fetch(url, options).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject(resp.statusText);
    });
}
