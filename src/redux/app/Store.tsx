import { configureStore, combineReducers } from "@reduxjs/toolkit";
/**
 * Combine all reducers files
 */
const rootReducer = combineReducers({
});

/**
 * Create a sotre and pass rootReducer
 */
export const store = configureStore({
    reducer: rootReducer
});