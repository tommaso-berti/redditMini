import {configureStore} from '@reduxjs/toolkit';
import feedSlice from './feedSlice.js';
import authorsSlice from './authorsSlice.js';

export default configureStore({
    reducer: {
        feed: feedSlice,
        authors: authorsSlice
    }
});