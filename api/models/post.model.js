import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
        },
        picturePost: {
            type: String,
        },
    },
    { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export default Post;
