const express = require("express")
const router = express.Router()
const Organization = require("../models/organization")


const app = express()

router.use("/", require("./userController"))
router.use("/act", require("./activityController"))
router.use("/docu", require("./documentController"))
router.use("/org", require("./organizationController"))

router.get("/", function(req,res){
    console.log("GET /")

    Organization.getAll().then((orgs)=>{
        console.log(orgs)
        res.render("login.hbs",{
            orgs
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/dashboard", function(req,res){
    res.render("dashboard.hbs")
})

router.get("/logout", function(req,res){
    res.redirect("/")
    // res.redirect("/")
})

module.exports = router