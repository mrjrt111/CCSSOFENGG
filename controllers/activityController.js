const express = require("express")
const router = express.Router()
const Activity =  require("../models/activity")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use(urlencoder)

router.post("/addAct", (req,res) =>{
    var act = {
        org: req.body.org,
        docuType: req.body.nameDoc,
        actType: req.body.type,
        actName: req.body.actName,
        nature: req.body.nature,
        venue: req.body.venue,
        date: req.body.date,
        time: req.body.time,
        enp: req.body.ENPnum,
        enmp: req.body.ENMPnum,
        isOnline: req.body.online,
        inGOSM: req.body.GOSM,
        oic: req.body.oic
    }

    Activity.create(act).then((act)=>{
        console.log(act)
        req.session.actName = act.actName
        res.render("encode.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})

module.exports = router