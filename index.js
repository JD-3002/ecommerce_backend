const express = require('express')
const cors = require('cors')
require('dotenv').config();
const cookieParser = require("cookie-parser")
const helmet = require('helmet')
const morgan = require('morgan');
const connectDB = require('./config/connectDB.js');
const userRouter = require('./routes/user.routes.js');

const PORT = process.env.PORT
const app = express()
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))


app.get("/",(req,res)=>{
    res.json({
        message:"welcome to my app"
    })
})

app.use("/api",userRouter)


connectDB().then(()=>{
app.listen(PORT || 5002,()=>{
    console.log(`Server started successfully on port ${PORT}`);
})
})


