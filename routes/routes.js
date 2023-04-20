const express = require("express")
const register = require("../controller/registration")
const login = require("../controller/login")
const category = require("./category")
const router = express.Router()

router.get("/", async (req,res) => {
    res.json({
        message:"Working"})
})

router.post("/register", register.register)
router.post("/login", login.login)
router.use("/category", category)


module.exports = router