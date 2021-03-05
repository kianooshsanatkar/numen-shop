const INITIAL_STATE = {
    cartItems: [],
    discount: null
}
/* 
cartItem:{
    image: String,
    price: Number,
    quantity: Number,
    title: String,
    uid: Number
}
*/

export const cartActions = {
    ADD_CART_ITEM: "ADD_CART_ITEM",
    REMOVE_CART_ITEM: "REMOVE_CART_ITEM", // if product exist reduce the quantity by 1
    DELETE_CART_ITEM: "DELETE_CART_ITEM",
    DISCOUNT: "DISCOUNT",
    DELETE_ALL: "DELETE_ALL"
}

export function addDiscount(discount) {
    return {
        type: cartActions.DISCOUNT,
        payload: discount
    }
}

export function addProductAction(item) {
    return {
        type: cartActions.ADD_CART_ITEM,
        payload: item
    }
}

export function deleteProductAction(uid) {
    return {
        type: cartActions.DELETE_CART_ITEM,
        payload: uid
    }
}

export function deleteAll(){
    return{
        type: cartActions.DELETE_ALL,
        payload: null
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
        case cartActions.DISCOUNT: {
            return {
                ...currentState,
                discount: action.payload
            }
        }
        case cartActions.ADD_CART_ITEM: {
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
                    return cartReducer(currentState, deleteProductAction(found.uid))
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
        case cartActions.DELETE_ALL:{
            return{
                ...currentState,
                cartItems: [],
                discount: null
            }
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
    return {
        cartItems: state.cart.cartItems
    };
}
