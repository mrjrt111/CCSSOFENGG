const mongoose = require("mongoose")

var documentSchema = mongoose.Schema({
    org: String,
    term: Number,
    actName: String,
    subType: String,
    subBy: String,
    recBy: String,
    dateRec: Date,
    firstCheck: String,
    firstDate: Date,
    secCheck: String,
    secDate: Date,
    filedBy: String,
    fileDate: Date,
    remarks: String,
    tieUp: String,
    docuType: String,
    status: String
})

var Document = mongoose.model("docu", documentSchema)

exports.create = function(docu){
    return new Promise(function(resolve, reject){
        console.log(docu)
        var d = new Document(docu)

        d.save().then((newDocu)=>{
            console.log(newDocu)
            resolve(newDocu)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        //console.log("in promise : " + tag + " "+ username)
        Document.deleteOne({_id: id
        }).then((docu)=>{
            console.log("Deleted: ",  docu)
        },(err)=>{
            reject(err)
        })
    })

}


exports.get = function(id){
    return new Promise(function(resolve, reject){
        Document.findOne({_id:id}).then((docu)=>{
            resolve(docu)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Document.find().then((docus)=>{
            resolve(docus)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getDocu = function(actName){
    return new Promise(function(resolve, reject){
        Document.findOne({actName:actName}).then((docu)=>{
            resolve(docu)
        }, (err)=>{
            reject(err)
        })
    })
}
