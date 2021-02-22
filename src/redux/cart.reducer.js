const INITIAL_STATE = {
    cartItems: []
}

export const cartActions = {
    UPDATE_CART_ITEM: "UPDATE_CART_ITEM",
    DELETE_CART_ITEM: "DELETE_CART_ITEM",
    REMOVE_CART_ITEM: "REMOVE_CART_ITEM"
}

export function addProductAction(item) {
    return {
        type: cartActions.UPDATE_CART_ITEM,
        payload: item
    }
}

export function deleteProductAction(uid) {
    return {
        type: cartActions.DELETE_CART_ITEM,
        payload: uid
    }
}

export function removeProductAction(uid) {
    return {
        type: cartActions.REMOVE_CART_ITEM,
        payload: uid
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
            let found = currentState.cartItems.find(x => x.uid === action.payload.uid);
            if (found)
                if (found.quantity > 1) {
                    found.quantity -= 1;
                    return {
                        ...currentState,
                        cartItems: [...currentState.cartItems]
                    }
                } else {
                    cartReducer(currentState, deleteProductAction(found.uid))
                }
                return {
                    ...currentState
                }

        }
        case cartActions.DELETE_CART_ITEM: {
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
        default:
            return currentState;
    }

}


export const mapDispatchToProps = dispatch => {
    return {
        setCartItems: items => dispatch(addProductAction(items)),
        removeCartItem: uid => dispatch(deleteProductAction(uid))
    };
}

export const mapStateToProps = state => {
    // console.log(state);
    return {
        cartItems: state.cart.cartItems
    };
}
