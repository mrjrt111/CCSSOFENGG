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

router.post("/add", function(req, res){
    let id = req.body.id
    console.log(id)
    BList.add(id)
    res.redirect("/blacklist")
})

module.exports = router