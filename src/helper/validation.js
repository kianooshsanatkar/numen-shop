export function emailValidation(email) {
    const re = /^[a-zA-Z0-9][\w\d_.!#$%&'*+/=?^_`{|}~-]{1,63}@[\w\d\-.]{2,256}\.[\w0-9]{2,64}$/;
    return (re.test(email));
}           

export function phoneValidation(phone) {
    return (/^09[0-9]{9}$/.test(phone));
}