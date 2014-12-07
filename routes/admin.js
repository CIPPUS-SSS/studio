/**
 * Created by I on 2014/10/6.
 */
/**
 * Created by I on 2014/10/5.
 */
var express = require('express');
var router = express.Router();
var adminCl=require('../method/adminCl');
var userCl=require('../method/userCl');
var async=require('async');
var mongoose=require('mongoose');
/* GET home page. */
router.get('/', function(req, res) {
    //var sname=req.session.sname;
    var sname="RoseOffice";
adminCl.adminData(sname,function(err,data,msg){
    if(err) {
       console.log(err);
        res.render('error',{message:err});
    }
    else if(msg){
        res.render('error',{message:msg});
    }else{
        res.render('aindex',{title:sname,data:data});
    }
});
});
/**
 * 管理员通知界面..
 */
router.get('/tip',function(req,res){
//var sname=req.session.sname;
  var sname="RoseOffice";
  adminCl.adminTip(sname,function(err,data){
      if(err) {
          console.log(err);
          res.render('error',{message:err});
      }
      else{
          res.render('atip',{data:data});
      }
  })
});

/**
 * 游客留言信息处理
 */
router.get('/tip/leaveMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
adminCl.adminMsg(sname,"sleaveMessages",0,function(err,data){
    if(err) return console.log(err);
    else{
        res.render('aleavemsg',{data:data});

    }
})
});
/**
 * 游客留言信息处理..
 * 同意,不同意不能同时选..
 */
router.post('/tip/leaveMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    var msg=req.body.msg;
    var msgno=req.body.msgno;
    var i=0;

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    console.log(sname);

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function() {
        if (typeof(msg) == 'object') {
            async.series([
                function (callback) {
                    msg.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sleaveMessages", val, 1, function (err) {
                            console.log("调用一次处理函数..");
                            //adminCl.adminMsgOki(sname,val,1,function(){
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }

            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msg.length) {
                    db.close();
                    res.redirect('/admin/tip/leaveMsg');
                }
            });
        } else if (typeof(msg) == 'string') {
            adminCl.adminMsgOk(sname, "sleaveMessages", msg, 1, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        }
        //拒绝消息的处理..
        else if (typeof(msgno) == 'object') {
            async.series([
                function (callback) {
                    msgno.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sleaveMessages", val, 2, function (err) {
                            console.log("调用一次处理函数..");
                            //adminCl.adminmsgnoOki(sname,val,1,function(){
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }

            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msgno.length) {
                    db.close();
                    res.redirect('/admin/tip/leaveMsg');
                }
            });
        } else if (typeof(msgno) == 'string') {
            adminCl.adminMsgOk(sname, "sleaveMessages", msgno, 2, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        } else {
            db.close();
            res.render('error', {message: "未选择任何项.."});
        }
    });
});
/**
 * 成员反馈界面
 */
router.get('/tip/feedback',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.adminMsg(sname,"sfeedbackMessages",0,function(err,data){
        if(err) return console.log(err);
        else{
            res.render('afeedback',{data:data});

        }
    })
});

/**
 * 成员反馈处理界面..
 */


router.post('/tip/feedback',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    var msg=req.body.msg;
    var msgno=req.body.msgno;
    var i=0;

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    console.log(sname);

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function() {
        if (typeof(msg) == 'object') {
            async.series([
                function (callback) {
                    msg.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sfeedbackMessages", val, 1, function (err) {
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }
            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msg.length) {
                    db.close();
                    res.redirect('/admin/tip/feedback');
                }
            });
        } else if (typeof(msg) == 'string') {
            adminCl.adminMsgOk(sname, "sfeedbackMessages", msg, 1, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        }
        //拒绝消息的处理..
        else if (typeof(msgno) == 'object') {
            async.series([
                function (callback) {
                    msgno.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sfeedbackMessages", val, 2, function (err) {
                            console.log("调用一次处理函数..");
                            //adminCl.adminmsgnoOki(sname,val,1,function(){
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }

            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msgno.length) {
                    db.close();
                    res.redirect('/admin/tip/leaveMsg');
                }
            });
        } else if (typeof(msgno) == 'string') {
            adminCl.adminMsgOk(sname, "sfeedbackMessages", msgno, 2, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        } else {
            db.close();
            res.render('error', {message: "未选择任何项.."});
        }

    });
});


/**
 * 加入创新组信息处理界面
 */
router.get('/tip/joinMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.adminMsg(sname,"joinMessages",0,function(err,data){
        if(err) return console.log(err);
        else{
            res.render('ajoinmsg',{data:data});

        }
    })
});

router.post('/tip/joinMsg',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var msg=req.body.msg;
    var msgno=req.body.msgno;
    var i=0;

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function() {
        if (typeof(msg) == 'object') {
            async.series([
                function (callback) {
                    msg.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "joinMessages", val, 1, function (err) {
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }
            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msg.length) {
                    db.close();
                    res.redirect('/admin/tip/joinMsg');
                }
            });
        } else if (typeof(msg) == 'string') {
            adminCl.adminMsgOk(sname, "joinMessages", msg, 1, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        }
        //拒绝消息的处理..
        else if (typeof(msgno) == 'object') {
            async.series([
                function (callback) {
                    msgno.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "joinMessages", val, 2, function (err) {
                            console.log("调用一次处理函数..");
                            //adminCl.adminmsgnoOki(sname,val,1,function(){
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }

            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msgno.length) {
                    db.close();
                    res.redirect('/admin/tip/joinMsg');
                }
            });
        } else if (typeof(msgno) == 'string') {
            adminCl.adminMsgOk(sname, "joinMessages", msgno, 2, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        } else {
            db.close();
            res.render('error', {message: "未选择任何项.."});
        }

    });

});
/**
 * 项目申请处理界面..
 */
router.get('/tip/projectMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.adminMsg(sname,"sprojectMessages",0,function(err,data){
        if(err) return console.log(err);
        else{
            res.render('apromsg',{data:data});

        }
    })
});


/**
 * 项目申请处理界面..
 */
router.get('/tip/projectMsg',function(req,res) {
//var sname=req.session.sname;
    var sname = "RoseOffice";

    var msg=req.body.msg;
    var msgno=req.body.msgno;
    var i=0;

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    console.log(sname);

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function() {
        if (typeof(msg) == 'object') {
            async.series([
                function (callback) {
                    msg.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sprojectMessages", val, 1, function (err) {
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }
            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msg.length) {
                    db.close();
                    res.redirect('/admin/tip/joinMsg');
                }
            });
        } else if (typeof(msg) == 'string') {
            adminCl.adminMsgOk(sname, "sprojectMessages", msg, 1, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        }
        //拒绝消息的处理..
        else if (typeof(msgno) == 'object') {
            async.series([
                function (callback) {
                    msgno.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sprojectMessages", val, 2, function (err) {
                            console.log("调用一次处理函数..");
                            //adminCl.adminmsgnoOki(sname,val,1,function(){
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }

            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msgno.length) {
                    db.close();
                    res.redirect('/admin/tip/joinMsg');
                }
            });
        } else if (typeof(msgno) == 'string') {
            adminCl.adminMsgOk(sname, "sprojectMessages", msgno, 2, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        } else {
            db.close();
            res.render('error', {message: "未选择任何项.."});
        }

    });


});
//**************************发布模块********************************88

/**
 * 发布信息统计..
 */
router.get('/sendout/',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.teamData(sname,function(err,data){
        if(err){
            res.render('error',{message:err});
        }else{

            res.render('ateamdata',{data:data});
        }
    });

});

/**
 * 团队介绍
 */
router.get('/sendout/teaminfo',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.teamInfo(sname,function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('ateaminfo',{docs:docs});
        }
    });

});

/**
 * 组织信息发布..
 * 需要设计数据库..
 */
router.get('/sendout/msgSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";

    adminCl.teamInfoSendout(sname,function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('ateaminfos',{docs:docs});
        }
    });

});

/**
 * 组织信息发布..
 * 后台更新
 */
router.post('/sendout/msgSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    var group = req.body.group;
    var leader =req.body.leader;
    var content = req.body.content;
    var pic = req.body.pic;
    var date = req.body.date;
    adminCl.teamInfoSendoutNew(sname,group,leader,content,pic,date,function(err){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('ok',{message:"ok"});
        }
    });

});
/**
 * 发布新闻...
 */
router.get('/sendout/newsSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.newsInfo(function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('anewsSendout',{docs:docs});
        }
    });


});
router.post('/sendout/newsSendout',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var ntitle = req.body.ntitle;
    var ncontent = req.body.ncontent;
    var npublisher = req.body.npublisher;
    var npic = req.body.npic;

    adminCl.newsSendout(sname,ntitle,npublisher,ncontent,npic,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"上传成功.."});
        }
    });
});

/**
 * 大事件发布
 */
router.get('/sendout/eventSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.eventsInfo(function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('aeventSendout',{docs:docs});
        }
    });
});
router.post('/sendout/eventSendout',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var etitle = req.body.etitle;
    var econtent = req.body.econtent;
    var epics= req.body.epics;
    var epubTime = req.body.epubTime;

    adminCl.eventsSendout(sname,etitle,econtent,epics,epubTime,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"上传成功.."});
        }
    });
});

//成果的发布..
router.get('/sendout/acSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.acInfo(function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('aacSendout',{docs:docs});
        }
    });


});
router.post('/sendout/acSendout',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var atitle = req.body.atitle;
    var acontent = req.body.acontent;
    var atime = req.body.atime;
    var apic = req.body.apic;

    adminCl.acSendout(sname,atitle,acontent,apic,atime,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"上传成功.."});
        }
    });
});

//榜样的发布..
router.get('/sendout/exampleSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.exampleInfo(function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('aexampleSendout',{docs:docs});
        }
    });
});
router.post('/sendout/exampleSendout',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var etitle = req.body.etitle;
    var econtent = req.body.econtent;
    var etime= req.body.etime;
    var epic = req.body.epic;

    adminCl.exampleSendout(sname,etitle,econtent,epic,etime,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"上传成功.."});
        }
    });
});

//项目的发布..
router.get('/sendout/projectSendout',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.projectInfo(function(err,docs){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('aprojectSendout',{docs:docs});
        }
    });
});
router.post('/sendout/projectSendout',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var ptitle = req.body.ptitle;
    var pcontent = req.body.pcontent;
    var ppubTime= req.body.ppubTime;

    var pstartTime = req.body.pstartTime;
    var pfinishTime = req.body.pfinishTime;
    var ptype = req.body.ptype;
    var pstaute = req.body.pstaute;
    var pleader = req.body.pleader;
    var pmembers = req.body.pmembers;
    var pdocs= req.body.pdocs;

    adminCl.projectSendout(ptitle,pcontent,ppubTime,pstartTime,pfinishTime,ptype,pstaute,pleader,pmembers,pdocs,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"上传成功.."});
        }
    });
});


//***************人员模块**********************

router.get('/people',function(req,res){
//   var sname=req.session.sname;
     var sname="RoseOffice";
    adminCl.peopleNum(sname,function(err,data){
        if(err)res.render("error",{message:err});
        else res.render('peopleNum',{data:data});
    });
});


router.get('/people/allgroup', function(req, res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var pagesize =3;
    //var pagenow=req.body.pagenow;
    //var group=req.body.group;
    var pagenow=0;
    var group="all";
    adminCl.peopleInfo(sname,group,pagesize,pagenow,function(err,docs){
          if(err){res.render('error',{message:err})}
          else{
              res.render('group',{data:docs});
          }
    });

});


router.get('/people/adduser', function(req, res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    userCl.groupInfo(function(err,data){
        if(err){res.render("error",{message:err})}
        else{
            res.render('aadduser',{data:data});
        }
    })
});

router.post('/people/adduser', function(req, res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var username=req.body.username;
    var uid = req.body.uid;
    var password=req.body.password;
    var email=req.body.email;
    var group=req.body.group;
    var role=req.body.role;
    var grade=req.body.grade;
    var sex=req.body.sex;
    var headPic="head.ico";
    adminCl.addUser(sname,username,uid,email,group,grade,headPic,sex,role,password,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"add user success"});
        }
    });

});



router.get('/index', function(req, res) {
    res.render('index', { title: 'admin' });
});


//*********测试用**************

router.get('/test',function(req,res){
//    mongoose.connect('mongodb://localhost/studio');
//    var db=mongoose.connection;
//    var Schema=mongoose.Schema;
//    var user=require('../method/user.js');
//    var projects= require('../method/other.js').project;
//    var studio = require('../method/studio.js').studio;
//    db.on('error',console.error.bind(console,"connect error.."));
//    db.once('open',function(){
////    var leader=new user({_id:"5437ce8a1cd44a881e78e118"});
////        console.log(leader);
//////
//        var id=mongoose.Types.ObjectId("5437ce8a1cd44a881e78e120");
//        studio.update({},{$push:{"sleader":{_id:id}}},function(err,num){
//            db.close();
//            console.log(err+"   " + num);
//
//        })
//
//
////        projects.findOne().populate('pleader').select('pleader').exec(function(err,doc){
////                db.close();
////            console.log("******");
////            if(err) console.log(err);
////            else console.log(doc);
////        })
//    });
    var sname="RoseOffice";
//    adminCl.addUser(sname,"aaa4","222","dd@q.com","5437c5fe229fe3981c6135dc","13","aa.pci",0,10,"aaa",function(err){
//        if(err)console.log(err);
//        else{
//            console.log("***************3");
//        }
//    });
//    adminCl.editUser(sname,"5466a80bcf375ba413076ace","aaa","333","aaa","dd@q.com","5437c5fe229fe3981c6135e5","13","aa.pci",0,10,0,["5437cc4eaa84a5141a2853cb"],function(err){
//        if(err)console.log(err);
//        else{
//            console.log("***************");
//        }
//    });
    //删除用户设置..
//    adminCl.removeUser(sname,"546621a965e516781b91a2c6",function(err){
//        console.log("(***********************)");
//        console.log(err);
//        console.log("(*****************************)");
//    })
    adminCl.findPeople(sname,["5437cc4eaa84a5141a2853cb"],"5437c5fe229fe3981c6135e5","13","aaa",function(err,data){
        console.log(err+ " *** " + data.length);
        console.log("***********");
    });
    res.end();
});


module.exports = router;
