import URLs from '../helper/fetch-url';
import { getHeaderAccAuth } from "./auth";

export async function getAddress() {
    const response = (await fetch(URLs.Address, {
        headers: getHeaderAccAuth(),
    }));
    if (response.ok)
    {
        const result = await response.json();
        if(result && result.length > 0)
            return result[0]
    }
    return null;
};
/* 
Address{
    city = marsh
    zip_code = marsh
    postal_address = marsh
}
*/

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
    else {
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