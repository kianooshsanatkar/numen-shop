import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartDrawerReducer from './cart-drawer.reducer';

import cartReducer from './cart.reducer';
import { userReducer } from './user.reducer';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    cartDrawer: cartDrawerReducer
});

export default persistReducer(persistConfig, rootReducer)