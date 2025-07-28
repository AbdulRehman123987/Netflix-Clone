import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { UserRoutes } from './src/routes/userRoutes.js';

const app=express()

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/netflix").then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.error("Connection Error:", err);
});


app.use("/auth/user",UserRoutes)

app.listen(5000,console.log("server started"))