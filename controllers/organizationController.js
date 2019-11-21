const express = require("express")
const router = express.Router()
const Organization = require("../models/organization")
const User = require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.get("/dashboard", function(req,res){
    console.log("GET under OrgController /")
    Organization.getAll().then((orgs)=>{
        console.log(orgs)
        res.render("dashboard.hbs",{ orgs})
    })
})

router.get("/modify", function (req,res) {
    Organization.getAll().then((orgs)=>{
        User.getAll().then((users)=>{
            res.render("modifyOfficer.hbs",{
                orgs, users
            })
        })
    })
})

router.post("/addOrg", (req, res)=>{
    var org = {
        orgName: req.body.orgName, 
        abbrev: req.body.abbrev, 
        description: req.body.description
    }
    if(!(req.body.orgName === "" || req.body.abbrev === ""))
    {
        console.log(org.orgName)
        Organization.create(org).then((org)=>{
            res.redirect("/dashboard")
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else{
        res.redirect("/dashboard")
    }
})

router.post("/deleteOrg", function(req, res) {
    let abbrev = req.body.orgDelete
    console.log(abbrev)
    Organization.delete(abbrev)
    //     .then(()=>{
    //    res.redirect("/dashboard")
    // },(error)=>{
    //     res.sendFile(error)
    // })
})

module.exports = router