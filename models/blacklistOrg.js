const mongoose = require("mongoose")

var blOrgSchema = mongoose.Schema({
    orgAbb: String
})

var BlOrg = mongoose.model("blacklistOrg", blOrgSchema)

exports.add = function(org){
    return new Promise(function(resolve, reject){
        console.log(org)
        var blacklistOrg = {
            orgAbb: org
        }
        var b = new BlOrg(blacklistOrg)

        b.save().then((newBlOrg)=>{
          console.log(newBlOrg)
          resolve(newBlOrg)
        }, (err)=>{
          reject(err)
        })
    })
}

exports.remove = function(id){
    return new Promise(function(resolve, reject){
        BlOrg.deleteOne({_id: id}).then((blacklistOrg)=>{
            console.log("Deleted: ", blacklistOrg)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getOrg = function(org){
    return new Promise(function(resolve, reject){
        BlOrg.findOne({orgAbb:org}).then((blacklist)=>{
            resolve(blacklist)
        }, (err)=>{
            reject(err)
        })
    })
}