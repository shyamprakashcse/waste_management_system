const mongoose = require("mongoose")


const auction = new mongoose.Schema({
    start_date: {type:Date,required:true},
    start_time: {type:Date,required:true},
    end_date: {type:Date,required:true},
    end_time: {type:Date,required:true},
    bidders: [
        {
            buyer_code: {type:String,required:true},
            bid_price: {type:String,required:true},
            bid_currency: {type:String,required:true}
        }
    ],
    current_bidder: {
        buyer_code: {type:String,required:true},
        bid_price: {type:String,required:true},
        bid_currency: {type:String,required:true}
    },
    winner: {type:String,required:true},
    final_price: {type:Number,required:true},
    status: {type:String,required:true}
})

module.exports=Auction=mongoose.model("Auction",auction)