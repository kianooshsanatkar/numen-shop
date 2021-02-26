import URLs from '../helper/fetch-url';
import { getHeaderAccAuth } from "./auth";

export async function getAddress() {
    return (await (await fetch(URLs.Address, {
        headers: getHeaderAccAuth(),
    })).json())[0];
};

export async function updateAddress(address) {
    if (address.uid) {
        const response = await fetch(URLs.Address + address.uid, {
            method: 'PUT',
            headers: {
                ...getHeaderAccAuth(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        });
        return response.ok;
    }
    else{
        const response = await fetch(URLs.Address, {
            method: 'POST',
            headers: {
                ...getHeaderAccAuth(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        });
        return response.ok;
    }
}