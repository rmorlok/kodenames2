import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;