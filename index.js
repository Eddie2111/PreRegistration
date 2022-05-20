const express = require('express');
const app = express();
const mongoose = require('mongoose');
const service = require('./model/service');
var Mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const environment = require('./environment');
const {Tokengen} = require('./controller/tokengeneration');
const {sessiongen} = require('./controller/sessiongen');
const {mailer} = require('./model/nodemailer');
const {serviceValidation} = require('./controller/serviceValidation');

var cookieParser = require('cookie-parser');
app.set('view engine','ejs')
app.use(environment);

const upload = require('./model/multer');
const cloudinary = require('./model/cloudinary');
const fs = require('fs');
app.use(cookieParser());

app.use('/portfolio-images',upload.array('image',10),async (req,res) =>{
  const uploader = async (path) => await cloudinary.uploads(path,'Images');
  if (req.method == 'POST'){
      const urls = [];
      const files = req.files;
      for (const file of files){
          const {path} = file;
          const newPath = await uploader(path)
          urls.push(newPath)
          fs.unlinkSync(path)
      }
      res.status(200).json({
          message: 'images uploaded succesfully',
          data:urls
      })
      } 
  else{
      res.status(405).json({
          err: 'method not allowed'
              })
          }
      });
      app.use('/nid',upload.array('image',2),async (req,res) =>{
        const uploader = async (path) => await cloudinary.uploads(path,'nid');
        if (req.method == 'POST'){
            const urls = [];
            const files = req.files;
            for (const file of files){
                const {path} = file;
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }
            res.status(200).json({
                message: 'images uploaded succesfully',
                data:urls
            })
            } 
        else{
            res.status(405).json({
                err: 'method not allowed'
                    })
                }
            });


app.get('/service',(req,res)=>{
      res.render('pages/service'); 
  });
const { body, validationResult } = require('express-validator');
app.post('/service',
  body('email').isEmail(), 
  body('password').isLength({max:120}), 
  body('fullname').isLength({max:35}),
  body('service').isLength({max:15}), (req,res)=>{

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }  

  const Data = req.body;
  const serviceData = serviceValidation(Data);
  if(serviceData.email || serviceData.phonenumber ){    
    req.session.user = sessiongen();
    const session = {session: req.session.user};
    const service = {
      ...serviceData,
      ...session
    }
    Mongo.connect(url, function (err, db) {
    if(err) throw err;
      var dbo = db.db("eventizer");
      var tokenset = Tokengen(req.session.user);
      // injecting into event_vendors collection and generating token.
      dbo.collection("event_vendors").insertOne(service);
      dbo.collection("event_vendor_tokens").insertOne(tokenset); 
      // nodemailer here
      mailer(tokenset.otp,serviceData.email);
      // nodemailer here
      if (err) throw err;
      res.render('pages/otp');
 });
}
 else{ 
   res.render('pages/service');
  }
  
  // send the otp to mongo with bcrypt cookies
});


app.get('/otp',(req,res)=>{
  if(req.session.user){
  res.redirect('/otp');
  }
  else{ res.redirect('/service');}
});
app.post('/otp',(req,res)=>{
  const otp = parseInt(req.body.otp);
  const session = req.session.user;

  if(otp && session ){
    Mongo.connect(url, function (err, db) {
      if(err) throw err;
      var dbo = db.db("eventizer");
      dbo.collection("event_vendor_tokens").findOne({otp:otp,session:session},function(err,result){        
        if (err) throw err;
        const expiry  = result.expiry;
        const current = parseInt(Math.floor(Date.now() / 1000));
        if (expiry<current){
          res.redirect('/service');
        }
        else res.redirect('/personalDetails');
        
    });
  });
}
});
  

  // send the otp to mongo with bcrypt cookies
  const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;


app.get('/app/:id',(req,res)=>{
    const token = req.params.id;
    //console.log(token,req.session.loggedin);
    res.render('pages/index');
    
});

app.get('/login',(req,res)=>{
  if(!req.session.loggedin){
    res.render('pages/login');
  }
  if (req.session.loggedin){
    res.send('welcome!');
  }
});
app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    var MongoClient = Mongo.connect(url, function (err, db) {
        if(err) throw err;
        var dbo = db.db("eventizer");
        dbo.collection("event_vendors").findOne({email:email},function(err,result){
          if (err) throw err;
          if (result){ //on success -> email
            
            const syst = bcrypt.compare(password,result.password,(err,data)=>{
                if (data === true){
                    // in here
                    req.session.loggedin = true;
                    res.render('pages/welcome');
                }
                else{
                    res.render('pages/index');
                }
            });
          }
          if (!result){
            const result = {};
            console.log("No data found");   
          }

        });
    
      });
    
});
 app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render('pages/login');
});
app.get('/profile',(req,res)=>{
    res.render('pages/profile');
    });
app.post('/profile',
  body('serviceName').isLength({max:20}), 
  body('deviceName').isLength({max:20}), 
  body('experience').isLength({max:20}), 
  body('location').isLength({max:20}), 
  body('serviceLocation').isLength({max:20}), 
  body('file').isLength({max:20}), 
  body('details').isLength({max:20}), 
  body('profilePhoto').isLength({max:20}), 
  body('address').isLength({max:20}), 
  body('nid1').isLength({max:20}),
  body('nid2').isLength({max:20})
,(req,res)=>{
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
  }  
  res.send(req.body);
});

const port =  process.env.PORT;
app.listen(port,()=>{
    console.log("Server started at "+ port);   
})



