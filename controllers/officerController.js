const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const bodyparser = require("body-parser")
const Organization = require("../models/organization")
const Officer = require("../models/tempOff")
const Document = require("../models/document")

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
    if(officer.org !== "CSO" && officer.type === "orgOfficer" || officer.org === "CSO" && officer.type === "admin" || officer.org === "CSO" && officer.type === "moderator")
    {
        console.log(officer.org)
        Officer.create(officer).then((officer)=>{
            console.log(officer)
            res.redirect("/dashboard")
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else {
        res.redirect("/dashboard")
        // Document.getAll().then((docus)=>{
        //     Organization.getAll().then((orgs)=>{
        //         res.render("dashboard.hbs",{
        //             docus, orgs,
        //             error:1
        //         })
        //
        //     })
        // }, (error)=>{
        //     res.sendFile(error)
        // })
    }
})

router.post("/deleteOfficer", function(req, res){

    var user = {
        email : req.body.email,
        org: req.body.org,
    }

    User.delete(user).then(()=>{
        res.render("dashboard.hbs",{
            docus, orgs
        })
    }, (error)=>{
        res.sendFile(error)
    })
})



module.exports = router