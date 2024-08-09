import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    const { title, picturePost } = req.body;

    if (!title || !picturePost) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const validUser = await User.findOne({ _id: req.user.id });

    const newPost = new Post({
        userId: req.user.id,
        username: validUser.username,
        title,
        picturePost,
    });

    try {
        setTimeout(async () => {
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        }, 1000);
    } catch (error) {
        next(error);
    }
};

export const getposts = async (req, res, next) => {
    try {
        setTimeout(async () => {
            const posts = await Post.find().sort({ createdAt: -1 });
            res.status(201).json(posts);
        }, 1000);
    } catch (error) {
        next(error);
    }
};

export const getpostAccount = async (req, res, next) => {
    try {
        setTimeout(async () => {
            const posts = await Post.find({ userId: req.params.id }).sort({ createdAt: -1 });

            res.status(201).json(posts);
        }, 1000);
    } catch (error) {
        next(error);
    }
};
