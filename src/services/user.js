import URLs from '../helper/fetch-url';
import { getHeaderAccAuth } from './auth';

export function createUser() {

}

export async function updateUser(user) {
    const response = await fetch(URLs.User,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_access')}`
        },
        body:JSON.stringify(user)
    })
    return response.ok
}

export async function getUser() {
    return await(await fetch(URLs.User, {
        headers: getHeaderAccAuth()
    })).json();
}