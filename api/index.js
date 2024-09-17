import epxress from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
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

const __dirname = path.resolve();

// use midlewares
const app = epxress();
app.use(epxress.json());
app.use(cookieParser());

// listen
const PORT = process.env.PORT || 5556;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// route
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.use(epxress.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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
