const express = require("express")
const router = express.Router()
const Organization = require("../models/organization")
const User = require("../models/user")
const Document = require("../models/document")


const app = express()

router.use("/user", require("./userController"))
router.use("/docu", require("./documentController"))
router.use("/org", require("./organizationController"))
router.use("/blacklist", require("./blacklistController"))
router.use("/officer", require("./officerController"))


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


router.get("/dashboard", function(req,res) {
    var name = req.session.givenname
    var org = req.session.org
    Document.getAll().then((docus) => {
        User.getAll().then((users) => {
            Organization.getAll().then((orgs) => {
                res.render("dashboard.hbs", {
                    users,
                    orgs,
                    docus,
                    org,
                    name
                })
            })
        }, (error) => {
            res.sendFile(error)
        })
    })


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

router.get("/manageOfficers", function(req, res){

    User.getAll().then((users)=>{
        Organization.getAll().then((orgs)=>{
            var org = req.session.org;
            res.render("modifyOfficer.hbs",{
                users,
                orgs,
                org
            })
        })
    }, (error)=>{
        res.sendFile(error)
    })
})


module.exports = router