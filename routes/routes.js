const express = require("express")
const register = require("../controller/registration")
const router = express.Router()


router.get("/", async (req,res) => {
    res.json({
        message:"Working"})
})

router.post("/register", register.register)


module.exports = router