import URLs from "../helper/fetch-url";
import { getHeaderAccAuth } from "./auth";

export async function saveCartItems(cartItems) {
    // if (!cartItems || !cartItems.length) return;
    const result = fetch(URLs.Cart, {
        method: "POST",
        headers: {
            ...getHeaderAccAuth(),
            'Content-Type': "application/json"
        },
        body: JSON.stringify(cartItems)
    });
    return (await result).ok;
}