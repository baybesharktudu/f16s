import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Like from '../models/like.model.js';
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

            validUser.posts.push(savedPost._id);
            await validUser.save();

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
export const deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);

        if (!post) {
            return next(errorHandler(404, 'Post not found'));
        }

        if (post.userId.toString() !== req.user.id) {
            return next(errorHandler(403, 'You cannot delete this post.'));
        }

        await Post.findByIdAndDelete(id);

        const user = await User.findById(req.user.id);
        user.posts = user.posts.filter((postId) => postId.toString() !== id);
        await user.save();

        res.status(200).json('Post deleted successfully');
    } catch (error) {
        next(error);
    }
};

export const likePost = async (req, res, next) => {
    const { userId, postId } = req.body;

    try {
        let like = await Like.findOne({ userId, postId });

        if (like) {
            await Like.deleteOne({ userId, postId });
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
            return res.status(200).json({ message: 'Like removed' });
        } else {
            like = new Like({ userId, postId });
            await like.save();
            await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
            return res.status(200).json({ message: 'Like added' });
        }
    } catch (error) {
        next(error);
    }
};
