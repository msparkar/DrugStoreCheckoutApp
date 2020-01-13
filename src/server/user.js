var express = require('express');
var router = express.Router();
const userService = require('./users.service'); 
const bcrypt = require('bcryptjs');
const csv=require('csvtojson')

/*
   isUserLoggedIn
   Login
   getProfile
   saveProfile

*/

router.get('/isLoggedIn', function(req, res, next) {
   //sess = req.session;
   //sess.email = 'msparkar@gmail.com'; 
   //return res.redirect('/');
});

router.post('/login', function(req, res, next) {
   userService.checkLogin(req, res);
});

router.get('/getProfile', function(req, res, next) {
   userService.getCurrentUserProfile(req, res);
});

router.post('/saveProfile', function(req, res, next) {
   userService.saveProfile(req, res);
});

module.exports = router;
