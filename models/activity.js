const mongoose = require("mongoose")

var activitySchema = mongoose.Schema({
    docuType: String,
    actType: String,
    actName: String,
    venue: String,
    date: Date,
    time:String,
    enp:Number,
    enmp:Number,
    isOnline: String,
    inGOSM: String
})

var Activity = mongoose.model("act", activitySchema)

exports.create = function(act){
    return new Promise(function(resolve, reject){
        console.log(act)
        var a = new Activity(act)
        
        a.save().then((newAct)=>{
          console.log(newAct)
          resolve(newAct)
        }, (err)=>{
          reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Activity.findOne({_id:id}).then((act)=>{
          resolve(act)
        }, (err)=>{
          reject(err)
        })
      })
}

exports.getAct = function(actName){
    return new Promise(function(resolve, reject){
        Activity.findOne({actName:actName}).then((act)=>{
          resolve(act)
        }, (err)=>{
          reject(err)
        })
      })
}


