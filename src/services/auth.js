import URLs from '../helper/fetch-url';

export async function login(phone, password) {
    if (phone && password) {
        let response = await fetch(URLs.Login, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
            }),
        });

        let result = await response.json();

        if (response.ok && result && result.login === true) {
            localStorage.setItem('jwt_access', result.access_token);
            localStorage.setItem('jwt_refresh', result.refresh_token);
            return [true, result.data]
        }
        return [false, result.msg];
    }
}

export function logout() {
    localStorage.removeItem('jwt');
}

export function getHeaderAccAuth() {
    return {
        Authorization: `Bearer ${localStorage.getItem('jwt_access')}`,
    }
}

export function getHeaderRefAuth() {
    return {
        Authorization: `Bearer ${localStorage.getItem('jwt_refresh')}`,
    }
}

export async function isLoggedIn() {
    const token = localStorage.getItem('jwt_access');
    if (!token) return [false, null];
    let response = await fetch(URLs.Access, {
        method: "get",
        headers: getHeaderAccAuth()
    });
    let result = await response.json();
    if (response.ok) {
        return [true, result.data];
    } else if (response.status === 401 && result.msg === 'Token is expire') {
        let refreshResponse = await fetch(URLs.Refresh, {
            method: 'get',
            headers: getHeaderRefAuth()
        });
        let refreshResult = await refreshResponse.json()
        if (refreshResponse.ok) {
            localStorage.setItem('jwt_access', refreshResult.access_token)
            return [true, result.data];
        }
        else {
            return [false, result.msg];
        }
    }
    return [false, null];
}

export function tokenFreshness(password) {

}