import {createSlice} from '@reduxjs/toolkit';

const feedSlice = createSlice({
    name:"feedSlice",
    initialState: {feed: []},
    reducers: {
        addToFeed: (state, action) => {
            const exists = state.feed.find(post => post.id === action.payload.id);
            if(!exists)
                state.feed.push(action.payload);
        }
    }
})
export const selectFeed = (state) => state.feed.feed;

export const {addToFeed} = feedSlice.actions;
export default feedSlice.reducer;