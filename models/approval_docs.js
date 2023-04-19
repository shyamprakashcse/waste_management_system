const mongoose = require("mongoose")

const approval_docs = new mongoose.Schema({
    code: {type:String,required:true},
    documents: [
        {
            document_name: {type:String,required:true},
            document_stage: {type:String,required:true},
            document_location: {type:String,required:true}
        }
    ]
})

module.exports=Approval_docs=mongoose.model("Approval_docs",approval_docs)