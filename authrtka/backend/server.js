import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./src/config/db.js"
import authRoutes from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"
import bodyParser from "body-parser"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  })
)
app.use(express.json( { limit: "50mb" } )) 
app.use(bodyParser.json( { limit: "50mb" } ))
app.use(cookieParser( ))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message: err.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
})


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})


export default app