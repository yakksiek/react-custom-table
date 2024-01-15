const url = 'https://dummyjson.com/users';

export function getUsers(options = {}) {
    // console.log(options);

    let optionsURL = '';

    if (options.value && options.value !== '') {
        optionsURL = `/filter?key=${options.field}&value=${options.value}`;
    } else {
        // console.log('limit & skip');
        optionsURL = `?limit=${options.limit}&skip=${options.skip}`;
    }

    return _fetch(optionsURL);
}

function _fetch(optionsURL = '') {
    // console.log(optionsURL);
    return fetch(`${url}${optionsURL}`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject(resp.statusText);
    });
}
