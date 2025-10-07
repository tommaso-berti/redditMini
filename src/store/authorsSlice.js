import {createSlice} from '@reduxjs/toolkit'
import {addToFeed} from './feedSlice.js'

const authorsSlice = createSlice({
    name: 'authors',
    initialState: {authors: []},
    reducers: {
        addAuthor: (state, action) => {
            state.authors.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToFeed, (state, action) => {
            state.authors.push(action.payload.author);
        })
    }
})

export const selectAuthors = (state) => state.authors

export const {addAuthor} = authorsSlice.actions;
export default authorsSlice.reducer;