import epxress from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import file
import authRoute from './routes/auth.route.js';

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

// listen
const PORT = process.env.PORT || 5556;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// route
app.use('/api/auth', authRoute);

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
