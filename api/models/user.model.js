import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
