import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // if (!email || !password) return next(errorHandler(404, 'Fill in all fields'));

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) return next(errorHandler(404, 'Invalid password'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
};

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return next(errorHandler(404, 'Fill in all fields'));

    try {
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) return next(errorHandler(404, 'Account already exists'));

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).json({ success: true, statusCode: 200, message: 'Signup successfuly!' });
    } catch (error) {
        next(error);
    }
};
