const INITIAL_STATE = {
    cartItems: [],
    cartVisibility: false
}

export const cartActions = {
    UPDATE_CART_ITEM: "UPDATE_CART",
    SHOW_CART: "SHOW_CART"
}

export function setCartItemsAction(items) {
    return {
        type: cartActions.UPDATE_CART_ITEM,
        payload: items
    }
}
export function setCartVisibilityAction(visible) {
    return {
        type: cartActions.SHOW_CART,
        payload: visible
    }
}

export default function cartReducer(currentState = INITIAL_STATE, action) {
    switch (action.type) {
        case cartActions.UPDATE_CART_ITEM:
            let found = currentState.cartItems.find(x => x.uid === action.payload.uid);
            if (found) {
                found.quantity += 1;
                return {
                    ...currentState,
                    cartItems: [...currentState.cartItems]
                }
            }
            return {
                ...currentState,
                cartItems: currentState.cartItems.concat(action.payload)
            };
        case cartActions.SHOW_CART:
            return {
                ...currentState,
                cartVisibility: action.payload === null || action.payload === undefined ? !currentState.cartVisibility : action.payload
            }
        default:
            return currentState;
    }

}


export const mapDispatchToProps = dispatch => {
    return {
        setCartItems: items => dispatch(setCartItemsAction(items)),
        setCartVisibility: visible => dispatch(setCartVisibilityAction(visible))
    };
}

// state is rootReducer object
export const mapStateToProps = state => {
    // console.log(state);
    return {
        cartItems: state.cart.cartItems,
        cartVisibility: state.cart.cartVisibility
    };
}
