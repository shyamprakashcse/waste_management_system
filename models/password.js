const mongoose = require("mongoose")


const password  = new mongoose.Schema({
    code: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true}
})

module.exports=Password=mongoose.model('password',password)