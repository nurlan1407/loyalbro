// store.ts
import { configureStore } from '@reduxjs/toolkit';
import FactsReducer from '~/entities/user/slice';
import EstablishmentsReducer from '~/entities/establishment/slice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        userReducer: FactsReducer,
        establishments:EstablishmentsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;