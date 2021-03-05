import URLs from "../helper/fetch-url";
import { getHeaderAccAuth } from "./auth";

export async function createInvoice() {
    return (await fetch(URLs.Invoice, {
        method: 'POST',
        headers: getHeaderAccAuth()
    })).ok
}

export async function getInvoices() {
    return await (await fetch(URLs.Invoices, {
        method: 'GET',
        headers: getHeaderAccAuth()
    })).json()
}
export async function getInvoice(invoiceId) {
    return await (await fetch(URLs.Invoice + invoiceId, {
        method: 'GET',
        headers: getHeaderAccAuth()
    })).json()
}