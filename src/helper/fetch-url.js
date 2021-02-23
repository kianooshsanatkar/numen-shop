// Todo: set { prefix = '' } for production
const prefix = "http://localhost";

const URLs = {
    Login: prefix + "/auth/login",
    Logout: prefix + "/auth/logout",
    Access: prefix + "/auth/token/access/",
    Refresh: prefix + "/auth/token/refresh/",
    Fresh: prefix + "/auth/fresh/",
    User: prefix + "/api/user/",
    Label: prefix + "/api/label/",
    Labels: prefix + "/api/labels/",
    Product: prefix + "/api/product/",
    Products: prefix + "/api/label/products/",
    Cart: prefix + "/api/cart/",
    Discount: prefix + '/api/discount/'
}

export default URLs;