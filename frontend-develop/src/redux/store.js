import {createStore, applyMiddleware, combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';


import authReducer from "./reducers/AuthReducer/AuthReducer";
import FindReducer from "./reducers/FindReduser/FindReducer";

const rootReducer = combineReducers({
    //auth: authReducer,
    find: FindReducer,
});

/*const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);*/
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;