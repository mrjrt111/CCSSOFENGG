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

router.get("/viewOrgs", function (req,res) {
    Organization.getAllOrgs().then((orgs)=>{
            res.render("viewOrgs.hbs",{
                orgs
            })
    })
})

router.post("/addOrg", (req, res)=>{
    var org = {
        orgName: req.body.orgName, 
        abbrev: req.body.abbrev, 
        description: req.body.description,
        status: "Whitelisted"
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
    // let abbrev = req.body.orgDelete
    // let abbrev = req.body.orgID
    let abbrev = req.body.abbrev
    // console.log(abbrev)
    // Organization.delete(abbrev).then
    // //     .then(()=>{
    // //    res.redirect("/dashboard")
    // // },(error)=>{
    // //     res.sendFile(error)
    // // })
    Organization.delete(abbrev)
    res.redirect("/dashboard")

    //     .then(()=>{
    //     User.getAll().then((users)=>{
    //         Organization.getAll().then((orgs)=>{
    //         res.render("dashboard.hbs",{
    //             orgs, users
    //         })
    //     })
    //     })
    // })
})

router.post("/editOrg", function(req,res){
    let id = req.body.id;
    let orgName = req.body.orgName;
    let orgAbb = req.body.orgAbb;
    
    Organization.edit({_id:id}, {orgName:orgName, abbrev:orgAbb, })
    // .then((user)=>{
    //     res.redirect("/manageOfficers")
    // })
})

module.exports = router