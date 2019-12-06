const mongoose = require("mongoose")

var orgSchema = mongoose.Schema({
    orgName: String, 
    abbrev: String, 
    description: String
})

var Organization = mongoose.model("org", orgSchema)

exports.create = function(org){
    return new Promise(function(resolve, reject){
        console.log(org)
        var o = new Organization(org)

        o.save().then((newOrg)=>{
            console.log(newOrg)
            resolve(newOrg)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Organization.find({}, {abbrev:1, _id:0}).then((orgs)=>{
            resolve(orgs)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAllOrgs = function(){
    return new Promise(function(resolve, reject){
        Organization.find().then((orgs)=>{
            resolve(orgs)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Organization.findOne({_id:id}).then((org)=>{
            resolve(org)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getOrg = function(abbrev){
    return new Promise(function(resolve, reject){
        Organization.findOne({abbrev:abbrev}).then((org)=>{
            resolve(org)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getOrgExceptCSO = function(abbrev){
    return new Promise(function(resolve, reject){
        Organization.find({abbrev:{ $ne: "CSO"}}).then((org)=>{
            resolve(org)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.delete = function (abbrev){
    return new Promise(function(resolve, reject){
        //console.log("in promise : " + tag + " "+ username)
        // console.log(abbrev)
        Organization.deleteOne({abbrev: abbrev
        }).then((docu)=>{
            console.log("Deleted: ",  docu)
        },(err)=>{
            reject(err)
        })
    })
}

exports.edit = function(oldContent, newContent){
    return new Promise(function(resolve,reject){
        Organization.findOneAndUpdate(oldContent, newContent).then((org)=>{
            console.log("Update: ", org)
        })
    })
  }