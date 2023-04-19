const buyer = require("../models/buyer")
const seller = require("../models/seller")
const approval_docs = require("../models/approval_docs")
const password = require("../models/password")

module.exports = {
    register: async (req,res) => {
        try{ 
            console.log(req.body)
            res.json({message:"Working"})
        }catch (err) {
            console.log(err)
            res.json({error:err})
        }
    }
}