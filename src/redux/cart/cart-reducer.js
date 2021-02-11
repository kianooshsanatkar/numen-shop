const INITIAL_STATE = {
    cartItems: null,
    setCartVisibility: false
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
export function setCartVisibilityAction(visible){
    return{
        type: cartActions.SHOW_CART,
        payload: null
    }
}

export default function cartReducer(currentState = INITIAL_STATE, action) {
    // console.log("this is cart Reducer, currentState: ", currentState, " action: ", action);
    switch (action.type) {
        case cartActions.UPDATE_CART_ITEM:
            return {
                ...currentState,
                cartItems: action.payload
            };
        case cartActions.SHOW_CART:
            return{
                cartVisibility: !currentState.cartVisibility 
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
    return { 
        cartItems: state.cart.cartItems,
        cartVisibility: state.cart.cartVisibility
     };
}
