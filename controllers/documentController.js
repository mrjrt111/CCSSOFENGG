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
                Document.getAll().then((docus)=>{
                    res.render("encode.hbs", {
                        orgs, users, officers, docus
                    })
                }, (error)=>{
                    res.sendFile(error)
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

router.get("/encodePost", (req, res)=>{
    User.getCSO().then((users)=>{
        console.log(users)
        Organization.getAll().then((orgs)=>{
            console.log(orgs)
            User.getOfficers().then((officers)=>{
                console.log(officers)
                Document.getAll().then((docus)=>{
                    res.render("encodePost.hbs", {
                        orgs, users, officers, docus
                    })
                }, (error)=>{
                    res.sendFile(error)
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
            actName: req.body.actName,
            org: req.body.org,
            actType: req.body.type,
            nature: req.body.nature,
            venue: req.body.venue,
            isOnline: req.body.online,
            inGOSM: req.body.GOSM,
            term: req.body.term,
            subType: req.body.subType,
            subBy: req.body.subBy,
            recBy: req.body.recBy,
            dateRec: req.body.dateRec,
            firstCheck: req.body.firstCheck,
            firstDate: req.body.firstDate,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            ENP: req.body.enp,
            ENMP: req.body.enmp,
            filedBy: req.body.filedBy,
            fileDate: req.body.fileDate,
            remarks: req.body.remarks,
            tieUp: req.body.tieUp,
            docuType: "Post-Acts"
        }    
    }
    else{
        var docu = {
            actName: req.body.actName,
            org: req.body.org,
            actType: req.body.type,
            nature: req.body.nature,
            venue: req.body.venue,
            // isOnline: req.body.online,
            // inGOSM: req.body.GOSM,
            term: req.body.term,
            subType: req.body.subType,
            subBy: req.body.subBy,
            recBy: req.body.recBy,
            dateRec: req.body.dateRec,
            firstCheck: req.body.firstCheck,
            firstDate: req.body.firstDate,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            ENP: req.body.enp,
            ENMP: req.body.enmp,
            filedBy: req.body.filedBy,
            fileDate: req.body.fileDate,
            remarks: req.body.remarks,
            docuType: "Pre-Acts"
        }
    }

    console.log(docu.dateRec)
    console.log(docu.firstDate)
    console.log(docu.secDate)
    console.log(docu.fileDate)

    if(!docu.dateRec || !docu.firstDate || !docu.fileDate){
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
    res.redirect("/dashboard")
})

router.post("/editDocs", (req,res)=>{
    let org = req.body.org;
    let actName = req.body.actName;
    let actType = req.body.actType;
    let nature = req.body.nature;
    let venue = req.body.venue;
    let isOnline = req.body.isOnline;
    let inGOSM = req.body.inGOSM;

    Document.edit({_id:id}, {org:org, actName:actName, actType:actType, nature:nature, venue:venue, isOnline:isOnline, inGOSM:inGOSM}).then((docu)=>{
        res.redirect("/viewDocs")
    })
})

router.get("/viewDocs", (req,res)=>{
    var org = req.session.org
    Document.getAll().then((docus)=>{
        res.render("viewDocs.hbs", {
            docus, org
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/deleteView", (req,res)=>{
    Document.getAll().then((docus)=>{
        res.render("delete.hbs", {
            docus
        })
    }, (error)=>{
        res.sendFile(error)
    })
})



module.exports = router