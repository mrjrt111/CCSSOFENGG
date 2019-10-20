const express = require("express")
const router = express.Router()
const Organization = require("../models/organization")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.post("/addOrg", (req, res)=>{
    var org = {
        orgName: req.body.orgName, 
        abbrev: req.body.abbrev, 
        description: req.body.desc
    }

    Organization.create(org).then((org)=>{
        console.log(org)
        req.session.orgName = org.orgName
    }, (error)=>{
        res.sendFile(error)
    })
})

module.exports = router