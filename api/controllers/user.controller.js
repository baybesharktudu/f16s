import User from '../models/user.model.js';

export const account = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
