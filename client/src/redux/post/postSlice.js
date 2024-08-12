import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
        getPostAccountStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getPostAccountSuccess: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        getPostAccountFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createPostStart: (state) => {
            state.loadingCreate = true;
            state.error = null;
        },
        createPostSucces: (state, action) => {
            state.posts.unshift(action.payload);
            state.loadingCreate = false;
            state.error = null;
        },
        createPostFailure: (state, action) => {
            state.loadingCreate = false;
            state.error = action.payload;
        },
        deletePostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deletePostSuccess: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        deletePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        likeAddedStart: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        likeAddedSuccess: (state, action) => {
            state.loading = false;
            state.error = null;

            const { userId: userIdToToggle, postId } = action.payload;

            state.posts = state.posts.map((post) => {
                if (post._id === postId) {
                    const { likes } = post;

                    const updatedLikes = likes.includes(userIdToToggle)
                        ? likes.filter((like) => like !== userIdToToggle)
                        : [...likes, userIdToToggle];

                    return {
                        ...post,
                        likes: updatedLikes,
                    };
                }
                return post;
            });
        },
        likeAddedFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getPostStart,
    getPostSucces,
    getPostFailure,
    getPostAccountStart,
    getPostAccountSuccess,
    getPostAccountFailure,
    createPostStart,
    createPostSucces,
    createPostFailure,
    deletePostStart,
    deletePostSuccess,
    deletePostFailure,
    likeAddedStart,
    likeAddedSuccess,
    likeAddedFailure,
} = postSlice.actions;

export default postSlice.reducer;
