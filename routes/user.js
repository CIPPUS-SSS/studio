/**
 * Created by I on 2014/10/5.
 */
var express = require('express');
var router = express.Router();
var userCl=require("../method/userCl");
var mongoose=require("mongoose");
/* GET home page. */
router.get('/', function(req, res) {
    if(req.session.pass=="ok"){
        res.render('uindex', { title: 'user'});
    }
    res.render('uindex', { title: 'not login'});
});
router.get('/index', function(req, res) {
    if(req.session.pass=="ok"){
        res.render('uindex', { title: 'user'});
    }
    res.render('uindex', { title: 'not login'});
});

//个人资料..
router.get('/info',function(req,res){
    if(req.session.pass=="ok"){
        userCl.getInfo(req.session.name,function(err,userone)
        {
            if (err) {
                res.render("error", {message: err});
            }
            else res.render('info', {userone: userone});
        });
    }else{
        res.render('nologin');
    }
});

//修改个人信息..
router.get('/infoEdit',function(req,res){
    if(req.session.pass=="ok"){
        userCl.getInfo(req.session.name,function(err,userone){
            if(err){res.render('error',{message:err})}
            else res.render('infoEdit',{userone:userone});
        });
    }else{
        res.render('nologin');
    }
});
router.post('/infoEdit',function(req,res){
    console.log('get infoedit request..');
    if(req.session.pass=="ok"){
    var userId=req.body.mid;
    var userEmail = req.body.userEmail;
    var userGrade=req.body.userGrade;
    var userNickName=req.body.userNickName;
    var _id=req.session._id;
    console.log(userId + "*****************");
    userCl.infoEdit(_id,userId,userEmail,userGrade,userNickName,function(err){
        if(err) res.render('error',{message:err});
        else{ res.render("ok",{message:"更新成功.."});}
    });
}else{
        res.render('nologin');
    }
});
//密码修改..
router.get('/pswEdit',function(req,res){
    if(req.session.pass=="ok"){
        userCl.getInfo(req.session.name,function(err,userone){
            if(err){res.render('error',{message:err})}
            else res.render('pswEdit',{userone:userone});
        });
    }else{
        res.render('nologin');
    }
});


router.post('/pswEdit',function(req,res){
    if(req.session.pass=="ok"){
        var oPwd=req.body.oPwd;
        var nPwd=req.body.nPwd;
        var _id=req.session._id;
       userCl.pwdEdit(_id,oPwd,nPwd,function(err){
           if(err){res.render('error',{message:err})}
           else res.render('ok',{message:"更新成功"});
       });
    }else{
        res.render('nologin');
    }
});
//技能树编辑..
router.get('/skillEdit',function(req,res){
if(req.session.pass=="ok"){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,'connection error:******'));
    db.once('open',function() {
    userCl.getSkill(req.session._id,function(err,userone){
        if(err){ db.close();res.render('error',{message:err})}
        else{
            var user=userone;
            console.log(userone.uskills);
                userCl.getAllSkills(function (err, allSkills) {
                    if (err) {
                        db.close();
                        res.render('error', {message: err});
                    }
                    else {
                        db.close();
                        console.log(userone.uskills);
                        res.render('skillEdit', {skills: user.uskills, allSkills: allSkills});
                    }
                });
        }
    });
    })
}else{
    res.render("nologin");
}
});

router.post('/skillEdit',function(req,res) {
    if(req.session.pass=="ok") {
        mongoose.connect("mongodb://localhost/studio");
        var db = mongoose.connection;
        var skills=req.body.skills;
        var uid =req.session._id;
        console.log(uid + "  " + skills);
        db.on('error', console.error.bind(console, 'connection error:******'));
        console.log("db is open..");
        db.once('open', function () {
            userCl.skillEdit(uid,skills,function(err){
                if (err) {
                    db.close();
                    res.render('error', {message: err});
                }
                else {
                    db.close();
                    res.render('ok', {message:"技能更新成功.."});
                }
            })
        });
    }else{
        res.render('nologin');
    }
});

//登录..
router.get('/login', function(req, res) {
    res.render('login', { title: 'login'});
});

router.post("/login",function(req,res){
    if(req.session.pass=="ok"){
        res.render('index',{title:req.session.name});
    }else{
        var username=req.body.username;
        var password=req.body.password;
        userCl.checkUser(username,password,function(err,_id){
            if(err) res.render('error',{message:err});
            else{
                req.session.name=username;
                req.session._id=_id;
                req.session.pass="ok";
                res.render('uindex',{uname:username})
            }
        });

    }
});

//同道中人..
router.get('/skillSame', function(req,res) {
    console.log('get...request..');
    if(req.session.pass!="ok"){
        res.render('login', { title: 'login'});
    }else {
        var username=req.session.name;
        var id=req.session._id;
        userCl.findSameSkillUsers(username,id,function(err,data){
            if(err){res.render('error',{message:err})}
            else{
                res.render('skillSame',{data:data});
            }
        });

        //原始版本..
        // userCl.findSameSkillUser(req, res);
    }
});

//项目信息..
router.get('/projectInfo', function(req,res) {
    console.log('get...request..');
    var username=req.session.name;
    userCl.userProjectInfo(username,function(err,data){
        if(err)res.render('error',{message:err});
        else{
            res.render('projectInfo',{data:data});
        }
    });

});

router.get('/projectMy', function(req,res) {
    if(req.session.pass!="ok"){
        res.render('login', { title: 'login'});
    }else {
        var uname=req.session.name;
        var uid= req.session._id;
        userCl.projectsMy(uname,uid,function(err,data){
            if(err){
                res.render('error',{message:err});
            }else{
                res.render('projectMy',{data:data});
            }
        })
    }
    //原始版本
   // userCl.projectMy(req,res);
    // res.render('login', { title: 'login'});
});
router.post("/projectsClass",function(req,res){
    var uname=req.session.name;
    var uid= req.session._id;
    var cls = req.session.cls;
    userCl.projectsClass(uname,uid,cls,function(err,data){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('projectMy',{data:data});
        }
    })

})
router.get('/projectsList', function(req,res) {
    if(req.session.pass!="ok"){
        res.render('login', { title: 'login'});
    }else {
        //var ptype=req.body.type;
        var ptype = "all";
        userCl.projectsLists(ptype, function (err, data) {
            if (err) {
                res.render('error', {message: err});
            } else {
               console.log(data);
                res.render('projectsList', {data: data});
            }
        });
    }
    //旧版本..
//    var ptype=3;
//    userCl.projectsList(ptype,function(error,docs){
//        if(error) {
//            console.log(error);
//            res.render('error',{message:error});
//        }
//        else{
//            res.render('projectsList',{data:docs});
//        }
//    });
});

router.post('/projectsList', function(req,res) {
    console.log('post...request..');
    var ptype=req.body.ptype;
    userCl.projectsList(ptype,function(error,docs){
        if(error) res.render("error",{message:err});
        else{
            res.render('projectsList',{data:docs});
        }
    });
});
router.post('/joinProjects',function(req,res){
    var pid=req.body.ppid;
    var userid=req.session._id;
    var content=req.body.content;
    userCl.joinProjects(userid,pid,content,function(err){
        if(err) res.render("error",{message:err});
        else{
            res.render('ok',{message:"加入成功,等待审核中.."});
        }
    });
   // res.end();
   // res.render('projectsList')
})
router.get('/joinGroup', function(req,res) {
    console.log('get...request..');
    userCl.groupInfo(function(err,data){
        if (err) {
            res.render('error', {message: err});
        } else {
            res.render('joinGroup', {data: data});
        }
    })

});

router.post('/joinGroup', function(req,res) {

    var username=req.session.name;

    userCl.joinGroup(username,req.body.groupId,req.body.content,function(error,num){
        if(error) return handleError(error);
        else{
            if(num===1){
                return res.render('ok',{message:"your request is sent.."});
            }
            else{
                return res.render('error',{message:num});
            }
        }
    });
});

//发表反馈..
router.get('/sendFeedBack', function(req,res) {
    console.log('get...request..');

    res.render('sendFeedBack',{});
});

router.post('/sendFeedBack', function(req,res) {
    console.log('post...request..');
    var username=req.session.name;
    userCl.sendFeedBack(username,req.body.content,function(error,num){
        if(error) return handleError(error);
        else{
            if(num===1){
                return res.render('ok',{message:"your request is sent.."});
            }
            else{
                return res.render('error',{message:num});
            }
        }
    });
});

router.get("/leavemsg",function(req,res){
    res.render('leavemsg',{});
})

router.post("/leavemsg",function(req,res){
    var uname=req.body.uname;
    var email=req.body.email;
    var content= req.body.content;
    userCl.leaveMsg(uname,email,content,function(err){
        res.render('leavemsg',{});
    })
})

router.get('/logout',function(req,res){
    var session = req.session;
    userCl.logout(session);
    res.render('login');
})

router.get("/aaa",function(req,res){
    res.render('bianjijinengshu',{});
})
module.exports = router;
