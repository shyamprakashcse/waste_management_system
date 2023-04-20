const password = require("../models/password")


module.exports = {
    login: async (req,res) => {
        try{
            console.log(req.body)
            res.status(200).json({message:"Working"})
        }catch (err) {
            console.log(err)
            res.status(500).json({error:err})
        }
    }
}