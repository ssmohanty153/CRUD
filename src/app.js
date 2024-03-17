import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json({
    limit: "100kb"
}))

app.on("error", (error) => {
    console.error("Error", error);
    throw error;
})

//routes


import userRouter from './routers/policy.routers.js'

//routees declarton

app.use("/api", userRouter)

export { app }