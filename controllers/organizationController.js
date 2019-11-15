const express = require("express")
const router = express.Router()
const Organization = require("../models/organization")
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

router.post("/addOrg", (req, res)=>{
    var org = {
        orgName: req.body.orgName, 
        abbrev: req.body.abbrev, 
        description: req.body.description
    }

    Organization.create(org).then((org)=>{
        res.redirect("/dashboard")
    }, (error)=>{
        res.sendFile(error)
    })
})

module.exports = router