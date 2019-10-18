const mongoose = require("mongoose")
const crypto = require("crypto")

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    org: String,
    type: String
})

// userSchema.pre("save", function(next){
//     this.password = crypto.createHash("md5").update(this.password).digest("hex")
//     next()
// })

var User = mongoose.model("user", userSchema)

exports.create = function(user){
    return new Promise(function(resolve, reject){
        console.log("in promise: " + user.email)
        User.findOne({
            email: user.email,
            password: user.password
            // password: crypto.createHash("md5").update(user.password).digest("hex")
        }).then((user)=>{
            console.log("callback user: " + user)
            resolve(user)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.authenticate = function(user){
  return new Promise(function(resolve, reject){
    console.log("in promise: " + user.email)
    User.findOne({
      email: user.email,
      password: user.password
      // password: crypto.createHash("md5").update(user.password).digest("hex")
    }).then((user)=>{
      console.log("callback user: " + user)
      resolve(user)
    },(err)=>{
      reject(err)
    })
  })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        User.findOne({_id:id}).then((user)=>{
          resolve(user)
        }, (err)=>{
          reject(err)
        })
      })
}

exports.getUser = function(email){
    return new Promise(function(resolve, reject){
        User.findOne({email:email}).then((user)=>{
          resolve(user)
        }, (err)=>{
          reject(err)
        })
      })
}