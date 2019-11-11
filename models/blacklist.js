const mongoose = require("mongoose")

var bListSchema = mongoose.Schema({
    email: String,
    org: String
})

var BList = mongoose.model("blacklist", bListSchema)

exports.add = function(blacklist){
    return new Promise(function(resolve, reject){
        console.log(blacklist)
        var b = new BList(blacklist)

        b.save().then((newBList)=>{
            console.log(newBList)
            resolve(newBList)
        }, (err)=>{
            reject(err)
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