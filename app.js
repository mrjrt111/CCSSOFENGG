const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
// Body Parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))

// Handlebars
// const exphbs  = require('express-handlebars') 

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/CCSSOFENGG",{
    useNewUrlParser: true
})

// var MongoClient = require('mongodb').MongoClient
// var uri = "mongodb+srv://legaspij93:legs123@cluster0-xcsjd.mongodb.net/test?retryWrites=true&w=majority"
// MongoClient.connect(uri,{useNewUrlParser:true},{ useUnifiedTopology: true }, function(err,client){
//     const collection = client.db("SOFENGG").collection("users")
//     console.log("connected")
//     // var ins = {name:'John Legaspi',email:'legaspi@gmail.com', password:'legs', org:'lscs', type:"admin"}
//     // collection.insertOne(ins,function(err,res){
//     //     console.log("added")
//     // })
//    client.close()
// })

app.set("view engine", "hbs")

app.use(express.static(__dirname + "/public"))

app.use(session({
    secret: "secret name",
    resave: true,
    saveUninitialized: true,
    name: "cookie monster"
}))

app.use(require("./controllers"))




// app.listen(process.env.PORT || 3000)

app.listen(3000, function(){
    console.log("live at port 3000")
})



// module.exports = {
//     MongoURI: '';
// }



// const mongoose = require('mongoose');
// const db = require('./config/keys').MongoURI;
// mongoose.connect(db, { useNewUrlParser : true })
//     .then(() => console.log("MongoDB Connected..."))
//     .catch(err => console.log(err));

