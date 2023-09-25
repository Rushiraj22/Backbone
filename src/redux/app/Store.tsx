import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
/**
 * Combine all reducers files
 */
const rootReducer = combineReducers({
    authReducerState: authReducer
});

/**
 * Create a sotre and pass rootReducer
 */
export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch