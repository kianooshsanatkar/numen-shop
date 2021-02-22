export const calculateTotalPrice = (cartItems) => {
    if (!cartItems) return null;
    return cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
};

export const FormatPrice = (price) => {
    return FormatNumber(price/10);
}

export const FormatNumber = (number) => {
    let num = String(number);
    // const fn = (str) => (str.length > 3 ? str.slice(str.length - 3, str.length) : str);
    let arr = [];
    do {
        arr.push(num.slice(-3));
        num=num.slice(0, -3);
    } while (num);
    return arr.reverse().join(',')
}