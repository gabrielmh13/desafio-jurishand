import dotenv from "dotenv";
import "reflect-metadata";
import "./shared/container"
import express from "express";
import { articlesRoutes } from "./routes";
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(articlesRoutes)

const port = process.env.PORT || 3333
app.listen(port, () => {
    console.log("Server is listening on port", port)
})