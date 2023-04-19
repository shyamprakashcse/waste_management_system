const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.options("*",cors())

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`The server is listening on ${port}`)
})
mongoose.set("strictQuery",true)
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        dbName: 'sirc',
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("DB Connection Established")
}).catch((err) => {
    throw err
})

app.use("/",require("./routes/routes"))