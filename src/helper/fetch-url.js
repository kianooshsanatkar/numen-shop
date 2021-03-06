// Todo: set { prefix = '' } for production
const prefix = "http://localhost";

const URLs = {
    // Authentication and Authorization
    Login: prefix + "/auth/login",
    Logout: prefix + "/auth/logout",
    Access: prefix + "/auth/token/access/",
    Fresh: prefix + "/auth/token/fresh/",
    Refresh: prefix + "/auth/token/refresh/",
    
    // User
    User: prefix + "/api/user/",
    Address: prefix + "/api/address/",
    
    // Product
    Label: prefix + "/api/label/",
    Labels: prefix + "/api/labels/",
    Product: prefix + "/api/product/",
    Products: prefix + "/api/label/products/",
    Cart: prefix + "/api/cart/",
    Discount: prefix + '/api/discount/',

    // Bills
    Invoice: prefix + '/api/invoice/',
    Invoices: prefix + '/api/invoices/'
}

export default URLs;