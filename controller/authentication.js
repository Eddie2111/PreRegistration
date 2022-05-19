var Mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
const express = require('express');


function authentication(email,password){

var MongoClient = Mongo.connect(url, function (err, db) {
    if(err) throw err;
    var dbo = db.db("eventizer");
    dbo.collection("event_vendors").findOne({email:email},function(err,result){
      if (err) throw err;

      if (result){ //on success -> email
        console.log(result.password);
        const syst = bcrypt.compare(password,result.password,(err,res)=>{
            if (res === true){
                console.log(res);
            }
            else{
                console.log(res);
            }
        });
      }

      if (!result){
        const result = {};
        console.log("No data found");   
      }
    });

  });
}
  module.exports = authentication;