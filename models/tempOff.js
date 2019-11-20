const mongoose = require("mongoose")
const crypto = require("crypto")

var officerSchema = mongoose.Schema({
    email: String,
    org: String,
    type: String
})



var Officer = mongoose.model("officer", officerSchema)

exports.create = function(officer){
    return new Promise(function(resolve, reject){
        console.log(officer)
        var u = new Officer(officer)

        u.save().then((newOfficer)=>{
            console.log(newOfficer)
            resolve(newOfficer)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.authenticate = function(officer){
    return new Promise(function(resolve, reject){
        console.log("in promise: " + officer.email)
        Officer.findOne({
            email: officer.email,
            org: officer.org,
            type: officer.type
        }).then((officer)=>{
            console.log("callback user: " + officer)
            resolve(officer)
        },(err)=>{
            reject(err)
        })
    })
}

exports.delete = function (email){
    return new Promise(function(resolve, reject){
        Officer.deleteOne({email: email
        }).then((docu)=>{
            console.log("Deleted: ",  docu)
        },(err)=>{
            reject(err)
        })
    })
}





exports.getOfficer = function(email){
    return new Promise(function(resolve, reject){
        Officer.findOne({email:email}).then((officer)=>{
            resolve(officer)
        }, (err)=>{
            reject(err)
        })
    })
}