const express = require("express")
const router = express.Router()

const app = express()

router.use("/", require("./userController.js"))

router.get("/", function(req,res){
    console.log("GET /")
    res.render("login.hbs")
})

module.exports = router