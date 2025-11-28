// authorsSlice.js
import {createSlice} from '@reduxjs/toolkit'
import {addToFeed, fetchFeed} from './feedSlice.js'

const authorsSlice = createSlice({
    name: 'authors',
    initialState: { authors: [] },
    reducers: {
        addAuthor: (state, action) => {
            const author = action.payload;
            if (!state.authors.includes(author)) {
                state.authors.push(author);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToFeed, (state, action) => {
            const author = action.payload.author;
            if (!state.authors.includes(author)) {
                state.authors.push(author);
            }
        });

        builder.addCase(fetchFeed.fulfilled, (state, action) => {
            const newAuthors = action.payload.map((post) => post.author);
            newAuthors.forEach((author) => {
                if (!state.authors.includes(author)) {
                    state.authors.push(author);
                }
            });
        });
    }
});

export const selectAuthors = (state) => state.authors.authors;

export const {addAuthor} = authorsSlice.actions;
export default authorsSlice.reducer;
