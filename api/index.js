import epxress from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import file
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';

// config
dotenv.config();

// connect mongodb
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDb is connected'))
    .catch((err) => console.log(err));

// use midlewares
const app = epxress();
app.use(epxress.json());
app.use(cookieParser());
app.use(cors());

// listen
const PORT = process.env.PORT || 5556;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// route
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

// handle error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
