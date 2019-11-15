const express = require("express")
const router = express.Router()
const Organization = require("../models/organization")
const User = require("../models/user")
const Document = require("../models/document")


const app = express()

router.use("/", require("./userController"))
router.use("/docu", require("./documentController"))
router.use("/org", require("./organizationController"))
router.use("/blacklist", require("./blacklistController"))

router.get("/", function(req,res){
    console.log("GET /")

    Organization.getAll().then((orgs)=>{
        console.log(orgs)
        User.getAll().then((users)=>{
            console.log(users)
            res.render("login.hbs",{
                orgs, users
            })
        }, (error)=>{
            res.sendFile(error)
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/dashboard", function(req,res){
    Document.getAll().then((docus)=>{
        Organization.getOrgExceptCSO().then((orgs)=>{
            res.render("dashboard.hbs",{
                docus, orgs
        })

        })
    }, (error)=>{
        res.sendFile(error)
    })
    // res.render("dashboard.hbs")
})

router.get("/regis", function(req, res){
    Organization.getAll().then((orgs)=>{
        res.render("register.hbs",{
             orgs
        })
    })
    //res.render("register.hbs")
})

router.get("/logout", function(req,res){
    res.redirect("/")
    // res.redirect("/")
})

module.exports = router