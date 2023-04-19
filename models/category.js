const mongoose = require("mongoose")

const category = new mongoose.Schema({
    category_code: {type:String,required:true},
    category_name: {type:String,required:true}
})


module.exports=Category=mongoose.model("Category",category)