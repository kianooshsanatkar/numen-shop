import URLs from '../helper/fetch-url';
import { getHeaderAccAuth } from './auth';

export async function createUser(user) {
    try {
        const response = await fetch(URLs.User, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            ,
            body: JSON.stringify(user)
        });
    
        return response;
    } catch (e) {
    return {ok:false}
    }
}

export async function updateUser(user) {
    const response = await fetch(URLs.User, {
        method: "PATCH",
        headers: {
            ...getHeaderAccAuth(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    return response.ok
}

export async function getUser() {
    return await (await fetch(URLs.User, {
        headers: getHeaderAccAuth()
    })).json();
}