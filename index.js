const express = require('express')
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.options("*",cors())

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`The server is listening on ${port}`)
})

app.use("/",require("./routes/routes"))