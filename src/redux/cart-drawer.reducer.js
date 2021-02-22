export const CartAction = {
    TOGGLE: "TOGGLE",
    SHOW: "SHOW",
    HIDE: "HIDE"
}

export function showCart() {
    return {
        type: CartAction.SHOW,
        payload: null
    }
}

export function hideCart() {
    return {
        type: CartAction.HIDE,
        payload: null
    }
}

export function toggleCart() {
    return {
        type: CartAction.SHOW,
        payload: null
    }
}

export default function cartDrawerReducer(currentState = false, action) {
    switch (action.type) {
        case CartAction.SHOW:
            return {
                ...currentState,
                cartVisibility: true
            }
        case CartAction.HIDE:
            return {
                ...currentState,
                cartVisibility: false
            }
        case CartAction.TOGGLE:
            return {
                ...currentState,
                cartVisibility: !currentState.cartVisibility
            }
        default:
            return currentState;
    }
}


export function mapStateToProps(state) {
    return {
        cartVisibility: state.cartDrawer.cartVisibility
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        showCartDrawer: () => dispatch(showCart()),
        hideCartDrawer: () => dispatch(hideCart()),
        toggleCartDrawer: () => dispatch(toggleCart())
    }
}