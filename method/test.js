/**
 * Created by I on 2014/10/6.
 * 一些測試功能的實現
 */
var mongoose=require('mongoose');
var user=require('./user');
var skill=require('./other').skill;
var group=require('./other').group;
var service = require("./service");
var projects=require("./other").project;
function ttt(){
//用户登录验证函数..

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,'connection error:******'));

    db.once('open',function(){
        var i=0;
        for(;i<10;i++) {
            var one = new user({
                //user..
                ID:i,
                uname:"user"+i,
                uid:9813+i,
                unickname:"Jack"+i,
                uemail:"22@qq.com",
                upwd:"111",
                ugroupId:"1",
                ugrade:"13",
                uheadPic:"user.ico",
                usex:0,
                uroll:2,
                uregTime:20141010,
                uskills:[1,2],
                uprojectsAsked:[1,2],
                uprojects:[0]


         //project..
//                ptitle:"skill"+i,
//                ppubTime:20141010,
//                pstartTime:20141011,
//                pfinishTime:20141012,
//                ptype:3,
//                pstaute:0,
//                pleader:0,
//                pmembers:[1,2],
//                pdocs:["pro.doc"],
//               // epic:"skill.ico",
//                pcontent:"hello.."
//                skname:"skill"+i,
//                sknowners:[0,1,2]
            });

            one.save(function (err, one) {
                if (err) {
                    console.log(err);
                    db.close();
                } else {
                    console.log('ok..');
                    db.close();
                }
            });
        }


});

}


var db=null;
function openDB(func,param){
    mongoose.connect('mongodb://localhost/studio');
    db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function(){
          func();
    });
}

function addGroup(option,callback){
    openDB(
        function(){
            group.create(option,function(err){
                db.close();
                callback(err);
            })
        }
    );

}
function simple(){
    service.getDB(function a(){
        console.log("*****");
        user.findOne({},function(err,doc){
            console.log(doc+ "  " + err);
        })
    });
}

function addProject(option,callback){
    openDB(
        function(){
            projects.create(option,function(err){
                db.close();
                callback(err);
            })
        }
    );
}
exports.addGroup = addGroup;
exports.simple=simple;
exports.addProject=addProject;