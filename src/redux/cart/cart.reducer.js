const INITIAL_STATE = {
    cartItems: [],
    cartVisibility: false
}

export const cartActions = {
    UPDATE_CART_ITEM: "UPDATE_CART",
    SHOW_CART: "SHOW_CART",
    REMOVE_CART_ITEM: "REMOVE_CART_ITEM"
}

export function setCartItemsAction(item) {
    return {
        type: cartActions.UPDATE_CART_ITEM,
        payload: item
    }
}

export function removeCartItemAction(uid) {
    return {
        type: cartActions.REMOVE_CART_ITEM,
        payload: uid
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
        case cartActions.UPDATE_CART_ITEM: {
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
        }
        case cartActions.REMOVE_CART_ITEM: {
            let foundIndex = currentState.cartItems.findIndex(x => x.uid === action.payload);
            if (foundIndex >= 0) {
                currentState.cartItems.splice(foundIndex, 1);
                return {
                    ...currentState,
                    cartItems: [...currentState.cartItems]
                }
            }
            return currentState;
        }
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
        removeCartItem: uid => dispatch(removeCartItemAction(uid)),
        setCartVisibility: visible => dispatch(setCartVisibilityAction(visible))
    };
}

export const mapStateToProps = state => {
    // console.log(state);
    return {
        cartItems: state.cart.cartItems,
        cartVisibility: state.cart.cartVisibility
    };
}
