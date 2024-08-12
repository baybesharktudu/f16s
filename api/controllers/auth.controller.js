import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(errorHandler(404, 'Fill in all fields'));

    try {
        setTimeout(async () => {
            const validUser = await User.findOne({ email });

            if (!validUser) return next(errorHandler(404, 'User not found'));

            const validPassword = bcryptjs.compareSync(password, validUser.password);

            if (!validPassword) return next(errorHandler(404, 'Invalid password'));

            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

            const { password: pass, ...rest } = validUser._doc;

            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }, 1000);
    } catch (error) {
        next(error);
    }
};

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return next(errorHandler(404, 'Fill in all fields'));

    try {
        setTimeout(async () => {
            const user = await User.findOne({ $or: [{ email }, { username }] });

            if (user) return next(errorHandler(404, 'Account already exists'));

            const hashedPassword = bcryptjs.hashSync(password, 10);

            const newUser = await new User({
                username,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Signup successfuly!',
            });
        }, 1000);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, username } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
