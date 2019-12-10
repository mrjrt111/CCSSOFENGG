const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const Document = require("../models/document")
const bodyparser = require("body-parser")
const Organization = require("../models/organization")
const BList = require("../models/blacklist")
const BlOrg = require("../models/blacklistOrg")
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
        type: "",
        position: req.body.position,
        org: req.body.org,
        status: "Whitelisted"
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

    var bOrg = {
        orgAbb: req.body.org
    }
        
    User.authenticate(user).then((newUser)=>{
        if(newUser){
            BList.authenticate(blacklist).then((newBList)=>{
                BlOrg.authenticate(bOrg).then((newBOrg)=>{
                    if(newBList || newBOrg){
                        Organization.getAll().then((orgs)=>{
                            console.log("LOGGED IN " + orgs)
                            res.render("login.hbs",{orgs,
            
                                error:2
                            })
                        })
                    }
                    else{
                        req.session.email = user.email
                        req.session.org = user.org
                        // res.redirect("/dashboard")
                        User.getByEmail(user.email).then((user)=>{
                            req.session.givenname = user.givenname
                            Document.getPre().then((pres)=>{
                                Document.getPost().then((posts)=>{
                                    Organization.getAll().then((orgs)=>{
                                        res.render("dashboard.hbs",{
                                            orgs, pres, posts,
                                            org:req.session.org,
                                            name: req.session.givenname
                                        })
                                        // res.redirect("/dashboard")
                                    }, (error)=>{
                                        res.sendFile(error)
                                    })
                                }, (error)=>{
                                    res.sendFile(error)
                                })
                            }, (error)=>{
                                res.sendFile(error)
                            })
                        })
    
                    }
                }, (error)=>{
                    res.sendFile(error)
                })
            },(error)=>{
                res.sendFile(error)
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
    res.redirect("/dashboard")
})

router.post("/editUser", function(req,res){
    let id = req.body.id;
    let lName = req.body.lName;
    let fName = req.body.fName;
    let eMail = req.body.eMail;
    let cellNum = req.body.cellNum;
    

    User.edit({_id:id}, {givenname:fName, lastname:lName, email:eMail, number:cellNum})
    // .then((user)=>{
    //     res.redirect("/manageOfficers")
    // })
})

module.exports = router