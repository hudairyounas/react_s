
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/post.slice';
import authSlice from './slices/authSlices';
export const store = configureStore({
    reducer: {
        auth: authSlice,
        postSlice: postReducer,
    },
})
