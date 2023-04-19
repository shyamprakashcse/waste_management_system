const mongoose = require("mongoose")

const buyer = new mongoose.Schema({
    code: {type:String,required:true},
    company_name: {type:String,required:true},
    address_line_1: {type:String,required:true},
    address_line_2: {type:String,required:true},
    city: {type:String,required:true},
    country: {type:String,required:true},
    zip_code: {type:Number,required:true},
    category: {type:String,required:true},
    vat_number: {type:Number,require:true},
    cr_number: {type:Number,required:true},
    contact_first_name: {type:String,required:true},
    contact_second_name: {type:String,required:true},
    primary_mobile_number: {type:Number,required:true},
    secondary_mobile_number: {type:Number,required:true},
    business_email: {type:String,required:true},
    alternative_email: {type:String,required:true},
    password: {type:String,required:true},
    l1_status: {type:Boolean,default:false},
    l2_status: {type:Boolean,default:false}
})


module.exports=Buyer=mongoose.model("buyer",buyer)