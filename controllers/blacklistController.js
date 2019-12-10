const express = require("express")
const router = express.Router()
const BList = require("../models/blacklist")
const BlOrg = require("../models/blacklistOrg")
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

    User.get(id).then((user)=>{
        let userEmail = user.email
        BList.getEmail(userEmail).then((blacklist)=>{
            if(blacklist){
                let bId = blacklist.id
                User.edit({_id:id}, {status: "Whitelisted"})
                BList.remove(bId)
                res.redirect("/manageOfficers")
            }
            else{
                BList.add(id)
                User.edit({_id:id}, {status: "Blacklisted"})
                res.redirect("/manageOfficers")
            }
        }, (error)=>{
            res.sendFile(error)
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.post("/addOrg", function(req,res){
    let org = req.body.org
    console.log(org)

    BlOrg.getOrg(org).then((blacklist)=>{
        if(blacklist){
            let bId = blacklist.id
            BlOrg.remove(bId)
            res.redirect("/manageOfficers")
        }
        else{
            BlOrg.add(org)
            res.redirect("/manageOfficers")
        }
    }, (error)=>{
        res.sendFile(error)
    })
})

module.exports = router