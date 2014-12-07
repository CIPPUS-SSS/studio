var express = require('express');
var router = express.Router();
var userCl=require("../method/userCl");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/aa', function(req, res) {
    res.render('aa', { title: 'hello' });
});

router.get('/test',function(req,res){
   userCl.findSameSkillUsers("aaa4","5437ce8a1cd44a881e78e118",function(err,docs){
       res.end();
   })
});

module.exports = router;
