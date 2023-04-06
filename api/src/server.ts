import dotenv from "dotenv";
import "reflect-metadata";
import "./shared/container"
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express";
import { articlesRoutes } from "./routes";
import cors from 'cors'
import { AppError } from "./shared/errors/AppError";

dotenv.config()

function createServer() {
    const app = express()
    app.use(express.json())
    app.use(cors({
        origin: '*'
    }))

    app.use(articlesRoutes)

    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            })
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`
        })
    })

    const port = process.env.PORT || '3333'
    process.env.PORT = port
    return app.listen(port, () => {
        console.log("Server is listening on port", port)
    })
}

if (process.env.NODE_ENV != "test") {
    createServer()
}

export { createServer }