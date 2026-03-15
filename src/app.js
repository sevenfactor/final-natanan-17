import express from "express"
import "dotenv/config"

import authRoutes from "./routes/auth.routes.js"

const app = express()
const PORT = process.env.PORT
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Health Tracker API Running")
})

app.use("/auth", authRoutes)



app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})