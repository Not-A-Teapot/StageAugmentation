import { configureStore } from '@reduxjs/toolkit';

import { appReducer, initialAppState } from './reducers/app';

const store = configureStore({ 
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialAppState,
});

export default store;
