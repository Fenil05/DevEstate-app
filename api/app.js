import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use("/api/auth",authRoute)

app.listen(8000,()=>{
    console.log("Backend server is running!");
})