const express = require("express")
const router = express.Router()
const BList = require("../models/blacklist")
const User = require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.get("/", function(req, res){
    User.getAll().then((users)=>{
        console.log(users)
        res.render("blacklist.hbs", {
            users
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.post("/addBlacklist", function(req, res){
    var blacklist = {
        email: req.body.email,
        org: req.body.org
    }

    BList.add(blacklist).then((blacklist)=>{
        console.log(blacklist)
        
        res.redirect("/dashboard")
    }, (error)=>{
        res.sendFile(error)
    })
})

module.exports = router