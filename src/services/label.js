import URLs from '../helper/fetch-url';

export async function getLabels() {
    const result = await (await fetch(URLs.Labels)).json();
    return result;
}
