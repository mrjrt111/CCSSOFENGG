const express = require("express")
const router = express.Router()

const app = express()

router.use("/", require("./userController"))
router.use("/act", require("./activityController"))

router.get("/", function(req,res){
    console.log("GET /")
    res.render("login.hbs")
})

module.exports = router