import URLs from "../helper/fetch-url";
import { getHeaderAccAuth } from "./auth";

export async function createInvoice() {
    return (await fetch(URLs.Invoice, {
        method: 'POST',
        headers: getHeaderAccAuth()
    })).ok
}