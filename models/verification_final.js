const mongoose = require("mongoose")


const verification_final = new mongoose.Schema({
    code: {type:String,required:true},
    status: {type:Boolean,default:false}
})