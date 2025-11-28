import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (subreddit = 'pics') => {
        const res = await fetch(`/reddit-api/r/${subreddit}.json`);
        if (!res.ok) throw new Error('Errore nel recupero del feed');

        const json = await res.json();

        return json.data.children.map((child) => {
            const d = child.data;

            let imageUrl = null;
            if (d.preview?.images?.[0]?.source?.url) {
                imageUrl = d.preview.images[0].source.url.replace(/&amp;/g, '&');
            } else if (d.thumbnail && d.thumbnail.startsWith('http')) {
                imageUrl = d.thumbnail;
            }

            return {
                id: d.id,
                title: d.title,
                score: d.score,
                author: d.author,
                created_utc: d.created_utc,
                num_comments: d.num_comments,
                imageUrl,
                permalink: d.permalink
            };
        });
    }
);


export const fetchComments = createAsyncThunk(
    'feed/fetchComments',
    async ({ postId, permalink }) => {
        const res = await fetch(`/reddit-api${permalink}.json`);

        if (!res.ok) throw new Error('Errore nel recupero dei commenti');

        const json = await res.json();

        const commentsListing = json[1]?.data?.children || [];
        const comments = commentsListing
            .filter((c) => c.kind === 't1')
            .map((c) => {
                const d = c.data;
                return {
                    id: d.id,
                    author: d.author,
                    body: d.body
                };
            });

        return { postId, comments };
    }
);


const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feed: [],
        isLoading: false,
        hasError: false,
        comments: {} // { [postId]: { isLoading, hasError, items: [] } }
    },
    reducers: {
        addToFeed: (state, action) => {
            const exists = state.feed.find((post) => post.id === action.payload.id);
            if (!exists) state.feed.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeed.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.feed = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(fetchFeed.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })

            .addCase(fetchComments.pending, (state, action) => {
                const { postId } = action.meta.arg;
                if (!state.comments[postId]) {
                    state.comments[postId] = { items: [], isLoading: true, hasError: false };
                } else {
                    state.comments[postId].isLoading = true;
                    state.comments[postId].hasError = false;
                }
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                state.comments[postId] = {
                    items: comments,
                    isLoading: false,
                    hasError: false
                };
            })
            .addCase(fetchComments.rejected, (state, action) => {
                const { postId } = action.meta.arg;
                if (!state.comments[postId]) {
                    state.comments[postId] = {
                        items: [],
                        isLoading: false,
                        hasError: true
                    };
                } else {
                    state.comments[postId].isLoading = false;
                    state.comments[postId].hasError = true;
                }
            });
    }
});

export const selectFeed = (state) => state.feed.feed;
export const selectFeedStatus = (state) => ({
    isLoading: state.feed.isLoading,
    hasError: state.feed.hasError
});
export const selectCommentsForPost = (state, postId) =>
    state.feed.comments[postId] || { items: [], isLoading: false, hasError: false };

export const { addToFeed } = feedSlice.actions;
export default feedSlice.reducer;
