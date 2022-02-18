const express = require('express')
const cors = require('cors')
require('dotenv').config()

const dbConnect = require('./server/dbConnect/connect')

const app = express()
app.use(express.json());
app.use(cors());

//routes
const userRouter = require('./server/routes/user')
const postRouter = require('./server/routes/post')
const authRouter = require('./server/routes/auth')
const profileRouter = require('./server/routes/profile')

app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', postRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/profile', profileRouter);

//connecting database
(async function () {
    try {
        await dbConnect(process.env.mongoUri)
        console.log("db Connected")
        app.listen(80, () => console.log("server Started"))
    } catch (error) {
        console.log("error in db connection")
    }
})();