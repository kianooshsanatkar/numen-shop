import URLs from '../helper/fetch-url';

export async function getProduct(productId) {
    const result = await (await fetch(URLs.Product + productId)).json()
    return result;
}

export async function getProducts(labelId) {
    const result = await (await fetch(URLs.Products + labelId)).json();
    return result;
}