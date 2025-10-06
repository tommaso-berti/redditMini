import {configureStore} from '@reduxjs/toolkit';

import feedSlice from './feedSlice.js';

export default configureStore({
    reducer: {
        feed: feedSlice
    }
});