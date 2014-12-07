/**
 * Created by I on 2014/10/6.
 */
var mongoose=require('mongoose');
var user=require('./user');


//用户登录验证函数..

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,'connection error:******'));

    db.once('open',function(err){
        if(err){console.log("open error..");}
        else{
            console.log('mongodb is open..');
            //for(var i=0;i<20;i++){
            i='1';
            console.log('********'+i);
            var userone= new user({
                uname:'user',
                uid:"20000",
                unickname:'jack',
                uemail:'2@qq.com',
                upwd:'111',
                ugroupId:'1',
                ugrade:"1",
               uHeadPic:"1.ico",
               usex:0,
               uroll:2,
               uregTime:20140910,
                uskills:[1,2],
                uprojectsAsked:[1,2],
                uprojects:[3,4]
            });
            userone.save(function(err,userone){
                if(err){console.log(err);console.log('error..');}
                else{  console.log(userone.uname+"is saved..");}

            });

        }
        //}
db.close();

});
