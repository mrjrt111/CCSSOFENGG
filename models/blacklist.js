const mongoose = require("mongoose")
const User = require("../models/user")

var bListSchema = mongoose.Schema({
    email: String,
    org: String
})

var BList = mongoose.model("blacklist", bListSchema)

exports.add = function(id){
    return new Promise(function(resolve, reject){
        User.get({_id: id}).then((user)=>{
            var blacklist = {
                email: user.email,
                org: user.org
            }

            var b = new BList(blacklist)

            b.save().then((newBList)=>{
                console.log(newBList)
                resolve(newBList)
            }, (err)=>{
                reject(err)
            })
        })
    })
}

exports.remove = function(id){
    return new Promise(function(resolve, reject){
        BList.deleteOne({_id: id}).then((blacklist)=>{
            console.log("Deleted: ", blacklist)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.authenticate = function(blacklist){
    return new Promise(function(resolve, reject){
        console.log("in promise: " + blacklist.email)
        BList.findOne({
          email: blacklist.email,
          org: blacklist.org
        }).then((blacklist)=>{
          console.log("callback user: " + blacklist)
          resolve(blacklist)
        },(err)=>{
          reject(err)
        })
    })
}