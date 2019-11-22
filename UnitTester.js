const mongoose = require('mongoose');
const mocha = require('mocha')
const express = require('express')
const app = express()
const Organization = require("./models/organization")
const User = require("./models/user")
const assert = require('assert')

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/CCSSOFENGG",{
    useNewUrlParser: true
})
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
describe('Add Org ', ()=>{

   it("Ok it saved the org to the database", function (done) {
       var newOrg = { "orgName": "Org Test",
           "abbrev": "OT",
           "description": "Please work"}
       Organization.create(newOrg).then((a)=>{
           assert(a.isNew==false)
           done();
       })
       
   })
})

describe('Add Officer ', ()=>{

    it("Ok it saved the officer to the database", function (done) {
        var newOrg = { "givenname": "Jarrett",
            "lastname": "Singian",
            "password": "poop",
            "email": "jar@google.com",
            "number": "1234",
            "org": "MES",
            "type": "Org Officer",
            "rank": "President"}
        Organization.create(newOrg).then((a)=>{
            assert(a.isNew==false)
            done();
        })

    })
})

