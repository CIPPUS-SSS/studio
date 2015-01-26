/**
 * Created by I on 2014/12/7.
 * 測試的 路由文件。。
 */
var express = require('express');
var router = express.Router();
var test = require('../method/test');
var service = require('../method/service');
var adminCl = require("../method/adminCl");
router.get('/json',function(req,res){
    res.render('test',{});
});

router.post("/aa",function(req,res){
    console.log(req.body.msg);
    res.json({"ok":"true"});
})
router.post('/json',function(req,res){
    var data = req.body.uname;
    console.log(data);
    res.json({"message":"hello"});
});

//創建一個組。。
//值已經寫入代碼中。。
router.get('/creategroup',function(req,res){
    test.addGroup({gname:"test",gcontent:"for test",gbackgroundPic:"1.pic",gmember:[]},function(err){
        console.log(err);
        res.end();
    })
});


//創建項目接口。。
// get ti=?? -- title 項目名稱。。
router.get('/createProject',function(req,res){
    console.log(req.query);
    console.log(req.query.ti);
    if(typeof(req.query.ti)!='undefined'){
        test.addProject({ptitle:req.query.ti,pmembers:[],pdocs:[],ptime:Date()},function(err){
            console.log(err);
            res.end();
        })
    }
    else{
        res.json({hello:1});
    }

})
router.get('/simple',function(req,res){
   test.simple();
    res.end();
});

router.get('/test',function(req,res){
    var id= "5492d8a5d06e1084170a3e61";
        adminCl.leavemsgDelC(id,function(err){
        res.end();
   });

   // adminCl.leavemsgC("aaa","sss@qq.com","daisiki","5492cd445552f460143192c5",function(err){
    //    res.end();
    //})
})
module.exports = router;