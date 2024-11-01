require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passwordRoutes = require('./routes/password')
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT

app.use(bodyparser.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/passwords', passwordRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
})
.catch((error) => {
    console.log(error);
})
