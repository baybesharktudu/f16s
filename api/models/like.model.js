import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true },
);

const Like = mongoose.model('Like', likeSchema);
export default Like;
