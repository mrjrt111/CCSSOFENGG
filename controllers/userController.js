const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const Document = require("../models/document")
const bodyparser = require("body-parser")
const Organization = require("../models/organization")
const BList = require("../models/blacklist")
const Officer = require("../models/tempOff")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.post("/register", function(req, res){

    var user = {
        givenname: req.body.givenname,
        lastname: req.body.lastname,
        email : req.body.email,
        number: req.body.number,
        password : req.body.password,
        type: req.body.position,
        org: req.body.org
    }

    Officer.authenticate(user).then((newUser)=>{

        if(newUser){
            user.type = newUser.type;
            User.create(user).then((user)=>{
                Officer.delete(user.email)
                console.log(user)
                req.session.email = user.email
                res.redirect("/dashboard")
                // res.render("dashboard.hbs")
            }, (error)=>{
                res.sendFile(error)
            })
        }
        else{
            Organization.getAll().then((orgs)=>{
                res.render("register.hbs",{orgs,
                    error:1
                })
            })
        }
    }, (error)=>{
        res.sendFile(error)
    })

})


router.post("/login", function(req, res){
  
    var user = {
        email: req.body.email,
        password: req.body.password,
        org: req.body.org
    }

    var blacklist = {
        email: req.body.email,
        org: req.body.org
    }
        
    User.authenticate(user).then((newUser)=>{
        if(newUser){

            BList.authenticate(blacklist).then((newBList)=>{
                if(newBList){
                    Organization.getAll().then((orgs)=>{
                        console.log("LOGGED IN " + orgs)
                        res.render("login.hbs",{orgs,
        
                            error:2
                        })
                    })
                }
                else{
                    req.session.email = user.email
                    console.log(req.session.email)
                    res.redirect("/dashboard")
                    // Document.getAll().then((docus)=>{
                    //     Organization.getOrgExceptCSO().then((orgs)=>{
                    //         res.render("dashboard.hbs",{
                    //             docus, orgs
                    //     })

                    //     })
                    // }, (error)=>{
                    //     res.sendFile(error)
                    // })
                }
            })
        }
        else{
            Organization.getAll().then((orgs)=>{
                console.log("LOGGED IN " + orgs)
                res.render("login.hbs",{orgs,

                    error:1
                })
            })
        }
    }, (error)=>{
        res.sendFile(error)
    })
})

router.post("/deleteOfficer", function(req, res){
    let id = req.body.id
    console.log(id)

    User.delete(id)
    //     .then(()=>{
    //     User.getAll().then((users)=>{
    //         res.render("modifyOfficer.hbs",{
    //             users
    //         })
    //
    //     })
    // }, (error)=>{
    //     res.sendFile(error)
    // })

    // var user = {
    //     email : req.body.email,
    //     org: req.body.org,
    // }
    //
    // User.delete(user).then(()=>{
    //     res.render("dashboard.hbs",{
    //         docus, orgs
    //     })
    // }, (error)=>{
    //     res.sendFile(error)
    // })
})


module.exports = router