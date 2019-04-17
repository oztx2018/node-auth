var express = require('express');
var router = express.Router();
var multer= require("multer");
var upload = multer({dest:'./uploads'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{ title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' } );
});


router.post('/register', upload.single('profileimage'), function(req, res, next) {
   // this makes to user enter the all info
   var name= req.body.name;
   var email= req.body.email;
   var username= req.body.username;
   var password= req.body.password;
   var password2= req.body.password2;

   // This is for uploading pictures;

   if(req.file) {
     console.log('Uploading file');
     var profileimage= req.file.filename;
   } else {
     console.log('No file uploaded');
     var profileimage= 'noimage.jpg';
   };

   // Validation

   req.checkBody('name', 'Name field is required').notEmpty();
   req.checkBody('email', 'Email field is required').notEmpty();
   req.checkBody('email', 'Email  is not valid').isEmail();
   req.checkBody('username', 'Username field is required').notEmpty();
   req.checkBody('password', 'Password field is required').notEmpty();
   req.checkBody('password2', 'Password  do not match').equals(req.body.password);




   //Check errors 

   var errors = req.validationErrors();

   if(errors) {
     res.render('register', {
       errors: errors
     });
   } else {
     console.log('No Errors');
   }   
});


module.exports = router;
