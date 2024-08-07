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

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
};
