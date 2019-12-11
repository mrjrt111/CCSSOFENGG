const mongoose = require("mongoose")

var documentSchema = mongoose.Schema({
    actName: String,
    org: String,
    actType: String,
    nature: String,
    venue: String,
    isOnline: String,
    inGOSM: String,
    term: Number,
    subType: String,
    subBy: String,
    recBy: String,
    dateRec: Date,
    firstCheck: String,
    firstDate: Date,
    date: Date,
    startTime: String,
    endTime: String,
    ENP: String,
    ENMP: String,
    filedBy: String,
    fileDate: Date,
    remarks: String,
    tieUp: String,
    status: String,
    docuType: String
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

exports.edit = function(oldContent, newContent){
    return new Promise(function(resolve,reject){
        Document.findOneAndUpdate(oldContent, newContent).then(()=>{
            console.log("Update: ", docu)
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

exports.getPre = function(){
    return new Promise(function(resolve,reject){
        Document.find({docuType:'Pre-Acts'}).then((pres)=>{
            resolve(pres)
        },(err)=>{
            reject(err)
        })
    })
}

exports.getPost = function(){
    return new Promise(function(resolve,reject){
        Document.find({docuType:'Post-Acts'}).then((posts)=>{
            resolve(posts)
        },(err)=>{
            reject(err)
        })
    })
}

exports.getOrgDocu = function(orgName){
    return new Promise(function(resolve,reject){
        Document.find({org:orgName}).then((docus)=>{
            resolve(docus)
        },(err)=>{
            reject(err)
        })
    })
}