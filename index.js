import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';


const app = express();
const port = process.env.PORT || 8000
dotenv.config();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:4200',
    credentials: true
}))
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//response handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === statusCode) ? true : false,
        status: statusCode,
        message: message,
        obj: err.data
    });
});


//db connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database...")
    } catch (error) {
        throw error;
    }
}


app.listen(port, () => {
    connectMongoDB();
    console.log("Connected to backend!");
})