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
    secCheck: String,
    secDate: Date,
    date: Date,
    startTime: String,
    endTime: String,
    ENP: Number,
    ENMP: Number,
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
