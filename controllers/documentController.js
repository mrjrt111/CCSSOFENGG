const express = require("express")
const router = express.Router()
const Document = require("../models/document")
const Organization = require("../models/organization")
const User = require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.get("/encode", (req, res)=>{
    User.getCSO().then((users)=>{
        console.log(users)
        Organization.getAll().then((orgs)=>{
            console.log(orgs)
            User.getOfficers().then((officers)=>{
                console.log(officers)
                res.render("encode.hbs", {
                    orgs, users, officers
                })
            },(error)=>{
                res.sendFile(error)
            })
        }, (error)=>{
            res.sendFile(error)
        })
    }, (error)=>{
        res.sendFile(error)
    })
    
})

router.post("/addDocu", (req, res)=>{
    
    console.log(req.body.dateRec)

    if(req.body.tieUp){
        var docu = {
            org: req.body.org,
            term: req.body.term,
            actName: req.body.actName,
            subType: req.body.subType,
            subBy: req.body.subBy,
            recBy: req.body.recBy,
            dateRec: req.body.dateRec,
            firstCheck: req.body.firstCheck,
            firstDate: req.body.firstDate,
            secCheck: req.body.secCheck,
            secDate: req.body.secDate,
            filedBy: req.body.filedBy,
            fileDate: req.body.fileDate,
            remarks: req.body.remarks,
            tieUp: req.body.tieUp,
            docuType: "Post-Acts"
        }    
    }
    else{
        var docu = {
            org: req.body.org,
            term: req.body.term,
            actName: req.body.actName,
            subType: req.body.subType,
            subBy: req.body.subBy,
            recBy: req.body.recBy,
            dateRec: req.body.dateRec,
            firstCheck: req.body.firstCheck,
            firstDate: req.body.firstDate,
            secCheck: req.body.secCheck,
            secDate: req.body.secDate,
            filedBy: req.body.filedBy,
            fileDate: req.body.fileDate,
            remarks: req.body.remarks,
            docuType: "Pre-Acts"
        }
    }

    // var docu = {
    //     org: req.body.org,
    //     term: req.body.term,
    //     actName: req.body.actName,
    //     subType: req.body.subType,
    //     subBy: req.body.subBy,
    //     recBy: req.body.recBy,
    //     dateRec: req.body.dateRec,
    //     firstCheck: req.body.firstCheck,
    //     firstDate: req.body.firstDate,
    //     secCheck: req.body.secCheck,
    //     secDate: req.body.secDate,
    //     filedBy: req.body.filedBy,
    //     fileDate: req.body.fileDate,
    //     remarks: req.body.remarks,
    //     tieIn: req.body.tieIn
    // }

    console.log(docu.dateRec)
    console.log(docu.firstDate)
    console.log(docu.secDate)
    console.log(docu.fileDate)

    if(!docu.dateRec || !docu.firstDate || !docu.secDate || !docu.fileDate){
        console.log(docu)
        User.getCSO().then((users)=>{
            console.log(users)
            Organization.getAll().then((orgs)=>{
                console.log(orgs)
                User.getOfficers().then((officers)=>{
                    console.log(officers)
                    res.render("encode.hbs", {
                        orgs, users, officers, error: 1
                    })
                },(error)=>{
                    res.sendFile(error)
                })
            }, (error)=>{
                res.sendFile(error)
            })
        }, (error)=>{
            res.sendFile(error)
        })
            // res.render("dashboard.hbs")    
    }
    else{
        Document.create(docu).then((docu)=>{
            console.log(docu)
            req.session.actName = docu.actName
            res.redirect("/dashboard")
            // res.render("dashboard.hbs")
        },(error)=>{
            res.sendFile(error)
        })
    }
})

router.post("/delete", (req,res)=>{
    let id = req.body.id
    console.log(id)
    Document.delete(id);
    res.render("dashboard.hbs")
})

module.exports = router