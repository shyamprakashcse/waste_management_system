const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
dotenv.config()

const app = express();
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use('/files',express.static("uploads"));
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.options("*",cors())

app.use((req, res, next) => {
    res.header("Access-control-allow-Origin", "*");
    res.header("Access-control-allow-Headers", "*");
    next();
}); 

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