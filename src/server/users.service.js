const User = require('./user.model');
const bcrypt = require('bcryptjs');
const csv=require('csvtojson')

var conn = require('./mongo').connect();

function checkLogin(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var userFound = false;
  User.findOne({ emailAddress: username}).exec(function (err, user) {
    if(user !=null && bcrypt.compareSync(password, user.passwordHash)) 
    {
       var sess = req.session;
       sess.userId = user.userId;
       sess.CurrentUser = user;
       userFound = true;
    }
    res.send(userFound);
    });
}

function getCurrentUserProfile(req, res) {
  var sess = req.session;
  var userId = 1;//sess.userId;
  User.findOne({ userId: userId }).exec(function (err, user) {
    res.send(user);
  });
}

function saveProfile(req, res){
  User.findOneAndUpdate({ userId: req.body.userId }, { $set: req.body }, { new: true }).exec(function (err, user) {
    res.send(user);
  });
}

module.exports = {
  checkLogin,
  getCurrentUserProfile,
  saveProfile
};