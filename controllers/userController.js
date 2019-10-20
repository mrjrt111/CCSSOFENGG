const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.post("/register", function(req, res){
    var user = {
        name: "Justin Chua",
        email : req.body.email,
        password : req.body.password,
        org: req.body.org,
        type: "Admin"
    }

    User.create(user).then((user)=>{
        console.log(user)
        req.session.email = user.email
        res.redirec("/dashboard")
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
        
    User.authenticate(user).then((newUser)=>{
        if(newUser){
            req.session.email = user.email
            console.log(req.session.email)
            res.redirect("/dashboard")
            // res.render("dashboard.hbs")
        }
    }, (error)=>{
        res.sendFile(error)
    })
})

//router.get('/login', function(req, res){
//  res.render('dashboard.hbs');
//})

module.exports = router