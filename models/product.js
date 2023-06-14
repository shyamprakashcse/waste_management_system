const mongoose = require("mongoose")

const product = new mongoose.Schema({
    seller_id: {type:String,required:true},
    product_name: {type:String,required:true},
    unit: {type:String,required:true},
    condition: {type:String,required:true},
    quantity: {type:String,required:true},
    description: {type:String,required:true},
    category: {type:String,required:true},
    currency: {type:String,required:true},
    price: {type:Number,required:true},
    pricing_term: {type:String,required:true},
    location: {type:String,required:true},
    available_date: {type:Date,required:true},
    address_line_1: {type:String,required:true},
    address_line_2: {type:String,required:true},
    city: {type:String,required:true},
    zip_code: {type:Number,required:true},
    country: {type:String,required:true},
    product_files: [{
        file_name: {type:String,required:true}, 
        file_type: {type:String,required:true}
    }],
    product_status : {type:String,required:true}
    // auction_id: {type:mongoose.Schema.Types.ObjectId}
})


module.exports= Product=mongoose.model("Product",product)