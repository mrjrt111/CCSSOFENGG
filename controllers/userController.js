const express = require("express")
const router = express.Router()
const User =  require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.post("/login", urlencoder, function(req, res){
    console.log("LOGGED IN")
    
    let user = {
        email: req.body.email,
        password: req.body.password,
        org: req.body.org
    }

    User.authenticate(user).then((newUser)=>{
        if(newUser){
            req.session.email = user.email
            console.log(req.session.email)
            res.render('dashboard.hbs')
        }
    }, (error)=>{
        res.sendFile(error)
    })
})


//router.get('/login', function(req, res){
//  res.render('dashboard.hbs');
//})

module.exports = router