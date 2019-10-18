const express = require("express")
const router = express.Router()

const app = express()

router.use("/user", require("./userController"))

router.get("/", function(req,res){
    console.log("GET /")
    res.render("login.hbs")
})

module.exports = router