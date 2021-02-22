import URLs from '../helper/fetch-url';

export async function getLabels() {
    const result = await (await fetch(URLs.Labels)).json();
    return result;
}

export async function getLabel(labelId) {
    return await (await fetch(URLs.Label + labelId)).json()
}
