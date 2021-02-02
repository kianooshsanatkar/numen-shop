import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// const log = () => (
//     console.log("this is middleware")
// );

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;
