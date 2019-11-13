const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const Document = require("../models/document")
const bodyparser = require("body-parser")
const Organization = require("../models/organization")
const BList = require("../models/blacklist")

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
        password : req.body.password,
        org: req.body.org,
        type: "Admin"
    }

    User.create(user).then((user)=>{
        console.log(user)
        req.session.email = user.email

        res.redirect("/dashboard")
        // res.render("dashboard.hbs")
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
                    Document.getAll().then((docus)=>{
                        Organization.getOrgExceptCSO().then((orgs)=>{
                            res.render("dashboard.hbs",{
                                docus, orgs
                        })
        
                        })
                    }, (error)=>{
                        res.sendFile(error)
                    })
                    // res.redirect("/dashboard")
                    // res.render("dashboard.hbs")
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
            // console.log(user.email, "is not found")
            // res.render("login.hbs",{
            //     orgs,
            //     name: 'INVALID EMAIL OR PASSWORD PLEASE TRY AGAIN!'
            // })
            // res.json({success: true})
            //look for way to send alert
            // res.redirect("/")
        }
    }, (error)=>{
        res.sendFile(error)
    })
})

//router.get('/login', function(req, res){
//  res.render('dashboard.hbs');
//})

module.exports = router