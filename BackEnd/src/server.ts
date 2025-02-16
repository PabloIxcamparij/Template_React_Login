import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { corsConfig } from "./config/cors"
import { connectDB } from "./db"
import userRoutes from "./routes/userRoutes"
import homeRoutes from "./routes/homeRoutes"


dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/home", homeRoutes)


export default app;
