import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPost: null,
    posts: [],
    error: null,
    loading: false,
    loadingCreate: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getPostSucces: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        getPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createPostStart: (state) => {
            state.loadingCreate = true;
            state.error = null;
        },
        createPostSucces: (state, action) => {
            state.posts.push(action.payload);
            state.loadingCreate = false;
            state.error = null;
        },
        createPostFailure: (state, action) => {
            state.loadingCreate = false;
            state.error = action.payload;
        },
    },
});

export const {
    getPostStart,
    getPostSucces,
    getPostFailure,
    createPostStart,
    createPostSucces,
    createPostFailure,
} = postSlice.actions;

export default postSlice.reducer;
