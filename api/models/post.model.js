import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        picturePost: {
            type: String,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Like',
                default: [],
            },
        ],
    },
    { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export default Post;
