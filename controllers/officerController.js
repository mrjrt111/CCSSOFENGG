const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const bodyparser = require("body-parser")
const Organization = require("../models/organization")
const Officer = require("../models/tempOff")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.get("/", function(req, res){
    Organization.getAll().then((orgs)=>{
        console.log(orgs)
        res.render("new.hbs", {
            orgs
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.post("/addOfficer", function(req, res){

    var officer = {
        email : req.body.email,
        org: req.body.org,
        type: req.body.type
    }

    Officer.create(officer).then((officer)=>{
        console.log(officer)
        res.redirect("/dashboard")
    }, (error)=>{
        res.sendFile(error)
    })
})






module.exports = router