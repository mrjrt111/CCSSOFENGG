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
    var type = req.session.type
    var org = req.session.org
    if(type === "orgOfficer"){
    User.getCSO().then((users)=>{
        console.log(users)
        Organization.getOrg(org).then((org)=>{
            console.log(org)
            User.getOfficers().then((officers)=>{
                console.log(officers)
                Document.getAll().then((docus)=>{
                    res.render("encodePreOfficer.hbs", {
                        org, users, officers, docus
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
    }
    else {
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
    }
})

router.get("/encodePost", (req, res)=>{
    var type = req.session.type
    var org = req.session.org

    if(type === "orgOfficer"){
        User.getCSO().then((users)=>{
            console.log(users)
            Organization.getOrg(org).then((org)=>{
                console.log(org)
                User.getOfficers().then((officers)=>{
                    console.log(officers)
                    Document.getAll().then((docus)=>{
                        res.render("encodePostOfficer.hbs", {
                            org, users, officers, docus
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
    }
    else{
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
    }
})

router.post("/addDocu", (req, res)=>{
    
    console.log(req.body.dateRec)

    // if(req.body.tieUp){
    if(req.body.ENMP && req.body.ENP){
        var docu = {
            actName: req.body.actName,
            org: req.body.org,
            actType: req.body.actType,
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
            ENP: req.body.ENP,
            ENMP: req.body.ENMP,
            filedBy: req.body.filedBy,
            fileDate: req.body.fileDate,
            remarks: req.body.remarks,
            tieUp: req.body.tieUp,
            docuType: req.body.docuType,
            status: req.body.status
        }    
    }
    else{
        var docu = {
            actName: req.body.actName,
            org: req.body.org,
            actType: req.body.actType,
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
            ENP: "N/A",
            ENMP: "N/A",
            filedBy: req.body.filedBy,
            fileDate: req.body.fileDate,
            remarks: req.body.remarks,
            tieUp: req.body.tieUp,
            docuType: req.body.docuType,
            status: req.body.status
        }
    }
    // }
    // else{
    //     var docu = {
    //         actName: req.body.actName,
    //         org: req.body.org,
    //         actType: req.body.type,
    //         nature: req.body.nature,
    //         venue: req.body.venue,
    //         isOnline: req.body.online,
    //         inGOSM: req.body.GOSM,
    //         term: req.body.term,
    //         subType: req.body.subType,
    //         subBy: req.body.subBy,
    //         recBy: req.body.recBy,
    //         dateRec: req.body.dateRec,
    //         firstCheck: req.body.firstCheck,
    //         firstDate: req.body.firstDate,
    //         date: req.body.date,
    //         startTime: req.body.startTime,
    //         endTime: req.body.endTime,
    //         ENP: req.body.enp,
    //         ENMP: req.body.enmp,
    //         filedBy: req.body.filedBy,
    //         fileDate: req.body.fileDate,
    //         remarks: req.body.remarks,
    //         docuType: "Pre-Acts"
    //     }
    // }

    console.log(docu.dateRec)
    console.log(docu.firstDate)
    console.log(docu.secDate)
    console.log(docu.fileDate)

    // if(!docu.dateRec || !docu.firstDate || !docu.fileDate){
    //     console.log(docu)
    //     User.getCSO().then((users)=>{
    //         console.log(users)
    //         Organization.getAll().then((orgs)=>{
    //             console.log(orgs)
    //             User.getOfficers().then((officers)=>{
    //                 console.log(officers)
    //                 res.render("encode.hbs", {
    //                     orgs, users, officers, error: 1
    //                 })
    //             },(error)=>{
    //                 res.sendFile(error)
    //             })
    //         }, (error)=>{
    //             res.sendFile(error)
    //         })
    //     }, (error)=>{
    //         res.sendFile(error)
    //     })
    //         // res.render("dashboard.hbs")    
    // }
    // else{

        Document.create(docu).then((docu)=>{
            console.log(docu)
            req.session.actName = docu.actName
            res.redirect("/dashboard")
            // res.render("dashboard.hbs")
        },(error)=>{
            res.sendFile(error)
        })
    // }
})

router.post("/delete", (req,res)=>{
    let id = req.body.id
    console.log(id)
    Document.delete(id);
    res.redirect("/dashboard")
})

router.post("/editDocs", (req,res)=>{
    let id = req.body.id;
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

router.post("/encodeAPS", (req, res)=>{
    let id = req.body.id
    let recBy = req.body.recBy
    let dateRec = req.body.dateRec
    let firstCheck = req.body.firstCheck
    let firstDate = req.body.firstDate
    let secondCheck = req.body.secondCheck
    let secondDate = req.body.secondDate
    let filedBy = req.body.filedBy
    let fileDate = req.body.fileDate
    let status = req.body.status
    let remarks = req.body.remarks

    Document.edit({_id:id}, {recBy:recBy, dateRec:dateRec, firstCheck:firstCheck, firstDate:firstDate, secondCheck:secondCheck, secondDate:secondDate, filedBy:filedBy, fileDate:fileDate, status:status,remarks:remarks})
    res.redirect("/viewPreActs")
})

router.post("/encodeADM", (req, res)=>{
    let id = req.body.id
    let recBy = req.body.recBy
    let dateRec = req.body.dateRec
    let firstCheck = req.body.firstCheck
    let firstDate = req.body.firstDate
    let secondCheck = req.body.secondCheck
    let secondDate = req.body.secondDate
    let filedBy = req.body.filedBy
    let fileDate = req.body.fileDate
    let status = req.body.status
    let remarks = req.body.remarks

    Document.edit({_id:id}, {recBy:recBy, dateRec:dateRec, firstCheck:firstCheck, firstDate:firstDate, secondCheck:secondCheck, secondDate:secondDate, filedBy:filedBy, fileDate:fileDate, status:status,remarks:remarks})
    res.redirect("/viewPostActs")
})

// router.post("/encodeAPS", (req,res)=>{
//     let id = req.body.id

//     Document.get(id).then((docu)=>{
//         console.log(docu)
//         res.render("encodeAPS.hbs", {docu})
//     },(error)=>{
//         res.sendFile(error)
//     })
// })

router.get("/viewEncodeAPS", (req,res)=>{
    User.getCSO().then((users)=>{
        Document.getPre().then((docus)=>{
            console.log(docus)
            res.render("encodeAPS.hbs", {docus, users})
        }, (error)=>{
            res.sendFile(error)
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/viewEncodeADM", (req,res)=>{
    User.getCSO().then((users)=>{
        Document.getPost().then((docus)=>{
            console.log(docus)
            res.render("encodeADM.hbs", {docus, users})
        }, (error)=>{
            res.sendFile(error)
        })
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/viewDocs", (req,res)=>{
    var type = req.session.type
    var org = req.session.org

    if(type === "orgOfficer"){
        Document.getOrgDocu(org).then((docus)=>{
            Organization.getAll().then((orgs)=>{
                res.render("viewDocsOfficer.hbs", {
                    docus, orgs
                })
            }, (error)=>{
                res.sendFile(error)
            })
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else{
        Document.getAll().then((docus)=>{
            Organization.getAll().then((orgs)=>{
                res.render("viewDocs.hbs", {
                    docus, orgs
                })
            }, (error)=>{
                res.sendFile(error)
            })
        }, (error)=>{
            res.sendFile(error)
        })

    }

})

router.get("/viewPreActs", (req,res)=>{
    Document.getPre().then((pres)=>{
        Organization.getAll().then((orgs)=>{
            User.getCSO().then((cso)=>{
                res.render("viewPreActs.hbs", {
                    pres, orgs, cso
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

router.get("/viewPostActs", (req,res)=>{
    Document.getPost().then((posts)=>{
        Organization.getAll().then((orgs)=>{
            User.getCSO().then((cso)=>{
                res.render("viewPostActs.hbs", {
                    posts, orgs, cso
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