/**
 * Created by I on 2014/10/6.
 */
    /*
     exports.skill=mongoose.model("skill",skillSchema);
     exports.skill=mongoose.model("skill",skillSchema);
     exports.skill=mongoose.model("skill",skillSchema);
     exports.skill=mongoose.model("skill",skillSchema);
     exports.group=mongoose.model("group",groupSchema);
             exports.skill=mongoose.model("skill",skillSchema);
     exports.skill=mongoose.model("skill",skillSchema);
     */

var mongoose=require('mongoose');
var user=require('./user');
var skill=require('./other').skill;
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
