import URLs from '../helper/fetch-url';
import {getHeaderAccAuth} from './auth';

export async function getProduct(productId) {
    const result = await (await fetch(URLs.Product + productId)).json()
    return result;
}

export async function getProducts(labelId) {
    const result = await (await fetch(URLs.Products + labelId)).json();
    return result;
}

export async function getDiscount(couponCode) {
    const response = await fetch(URLs.Discount + couponCode,{
        headers:getHeaderAccAuth()
    })
    if (response.ok)
        return await response.json()
    else
        return null;
}