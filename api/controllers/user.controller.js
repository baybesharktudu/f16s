import User from '../models/user.model.js';
import Post from '../models/post.model.js';

export const account = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('posts');

        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const post = async (req, res, next) => {
    try {
        const listPost = await Post.find();
        res.status(200).json(listPost);
    } catch (error) {}
};
