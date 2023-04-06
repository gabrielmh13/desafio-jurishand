import dotenv from "dotenv";
import "reflect-metadata";
import "./shared/container"
import express from "express";
import { articlesRoutes } from "./routes";
import cors from 'cors'

dotenv.config()

function createServer() {
    const app = express()
    app.use(express.json())
    app.use(cors({
        origin: '*'
    }))

    app.use(articlesRoutes)

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