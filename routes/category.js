const express = require("express")
const category = require("../controller/category")

const categoryRouter = express.Router()

categoryRouter.get("/", async (req,res) => {
    res.json({message:"Working"})
})

categoryRouter.post("/add", category.add)

module.exports = categoryRouter

