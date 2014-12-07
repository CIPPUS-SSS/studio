/**
 * Created by I on 2014/10/12.
 */
var mongoose=require('mongoose');
var async=require('async');
var user=require('./user');
var news=require("./studio").news;//新闻..
var events=require("./studio").event;//大事件..
var achievements=require("./studio").achievement;//成就..
var examples=require("./studio").example;//榜样..
var groups=require('./other').group;
var skills=require('./other').skill;
var projects=require('./other').project;
var studio=require("./studio").studio;
/**
 * 获取工作室的一些数据..
 * @param sname 工作室名称..
 * @param callback
 */
function adminData(sname,callback){
    mongoose.connect('mongodb://localhost/studio');
    console.log(sname);
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,"connetion error:"));
    db.once('open',function(){
       studio.findOne({sname:sname},"sstaute svisited svisitedToday snews sevents sachievements sexamples -_id",function(err,doc){
           if(err) return callback(err,null,null);
           else if(doc==null){
               return callback(null,null,"no this studio..");
           }else{
               var data={};
               data.svisited=doc.svisited;
               data.svisitedToday=doc.svisitedToday;
               data.newsNum=doc.snews.length;
               data.eventsNum=doc.sevents.length;
               data.achievementsNum=doc.sachievements.length;
               data.examplesNum=doc.sexamples.length;
               data.totalNum=0;
               data.staute=doc.sstaute;
               groups.find({},function(err,docs){
                   if(err) return callback(err,null,null);
                   else{
                       var groups=[];
                       docs.forEach(function(doc){
                           groups.push({name:doc.gname,num:doc.gmember.length});
                           data.totalNum+=doc.gmember.length;

                           if(groups.length==docs.length){
                               db.close();
                               data.groups=groups;
                              return callback(null,data,null);
                           }
                       });
                   }
               });

           }
       })
    });
}
/**
 * 获取管理通知 待审核的消息数目统计..
 * @param sname
 * @param callback
 */
function adminTip(sname,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    console.log(sname);

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function(){
        studio.findOne({sname:sname},"sprojectMessages joinMessages sleaveMessages sfeedbackMessages",function(err,doc){
           if(err){
               db.close();
               return callback(err,null);
           }else{
               if(doc==null){
                   db.close();
                   return callback('no this office..',null);
               }else{

                   var data={};
                   data.projectTotal=doc.sprojectMessages.length;
                   data.joinTotal=doc.joinMessages.length;
                   data.leavemsgTotal=doc.sleaveMessages.length;
                   data.feedbackTotal=doc.sfeedbackMessages.length;
                   var count=0;
                   var i=0;
                   console.log(data);
                   doc.sprojectMessages.forEach(function(val){
                       i++;
                     //  console.log(i);
                       if(val.mstaute==0){
                           count ++;
                       }
                       if(i==doc.sprojectMessages.length){
                           console.log(data);
                           data.projectUndo=count;
                           count=0;
                           i=0;
                           doc.joinMessages.forEach(function(val){
                               i++;
                               if(val.mstaute==0){
                                   count ++;
                               }
                               if(i==doc.joinMessages.length){
                                   //console.log(data);
                                    data.joinUndo=count;
                                   count=0;
                                   i=0;
                                   doc.sleaveMessages.forEach(function(val){

                                       i++;
                                       if(val.mstaute==0){
                                           count ++;
                                       }
                                       if(i==doc.sleaveMessages.length){
                                         //  console.log(data);
                                           data.leavemsgUndo=count;
                                           count=0;
                                           i=0;
                                           doc.sfeedbackMessages.forEach(function(val){

                                               i++;
                                               if(val.mstaute==0){
                                                   count ++;
                                               }
                                               if(i==doc.sfeedbackMessages.length){
                                                   //console.log(data);
                                                   db.close();
                                                   data.feedbackUndo=count;
                                                   return callback(null,data);
                                               }
                                           });
                                       }
                                   });
                               }

                           });
                       }
                   })

               }


           }
        });
    });
}
/**
 * 将游客留言 按审核状态 取出
 * @param sname
 * * @param what  字符串 即想要取出的字段..只支持单字段,四个可选项
 * @param staute
 * @param callback
 */
function adminMsg(sname,what,staute,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    console.log(sname);

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function(){

        studio.findOne({sname:sname},what,function(err,doc){
            if(err){
                db.close();
                return callback(err,null);
            }else{
                if(doc==null){
                    db.close();
                    return callback("no this office..",null);
                }else{
                    var i=0;
                    var data=[];
                    if(what=="sleaveMessages"){
                        doc.sleaveMessages.forEach(function(val){
                            i++;
                            if(val.mstaute==staute){
                                data.push(val);
                            }
                            if(i==doc.sleaveMessages.length){
                                db.close();
                                return callback(null,data);
                            }
                        });
                    }else if(what=="sfeedbackMessages"){
                        doc.sfeedbackMessages.forEach(function(val){
                            i++;
                            if(val.mstaute==staute){
                                data.push(val);
                            }
                            if(i==doc.sfeedbackMessages.length){
                                db.close();
                                return callback(null,data);
                            }
                        });
                    }else if(what=="joinMessages"){
                        doc.joinMessages.forEach(function(val){
                            i++;
                            if(val.mstaute==staute){
                                data.push(val);
                            }
                            if(i==doc.joinMessages.length){
                                db.close();
                                return callback(null,data);
                            }
                        });
                    }else if(what=="sprojectMessages"){
                        doc.sprojectMessages.forEach(function(val){
                            i++;
                            if(val.mstaute==staute){
                                data.push(val);
                            }
                            if(i==doc.sprojectMessages.length){
                                db.close();
                                return callback(null,data);
                            }
                        });
                    }else{
                        db.close();
                        return callback("字段错误",null);
                    }


                }
            }
        });
    });
}
/**
 * 同意消息申请  4种模式
 * @param sname  officeName
 * @param what   更新字段
 * @param smid   字段 _id (查找条件)
 * @param staute   更新值 ( 1审核通过 )
 * @param callback
 */
function adminMsgOk(sname,what,smid,staute,callback){

           studio.findOne({sname:sname},what,function(err,doc){
               if(err){
                   //db.close();
                   return callback(err,null);
               }else{
                   if(doc==null){
                       //db.close();
                       // return callback("no this office",null);
                       callback("no this office",null);
                   }else{
                       var i=0;
                       var flag=true;
                       if(what=="sleaveMessages"){
                               async.series([
                                     function(callback) {
                                         doc.sleaveMessages.forEach(function (val) {
                                             if (val.smid == smid&&flag) {
                                                 val.mstaute = staute;
                                                 doc.save(function (err, sav) {
                                                     flag=false;
                                                     if (err) {
                                                         //db.close();
                                                         console.log("审核出错..");
                                                         return callback(err, null);
                                                     } else {

                                                         console.log("审核成功..");
                                                         return callback(null, sav);
                                                     }
                                                 });
                                             }
                                         });
                                     }
                               ],function(err,msg){
                                   return callback(err,msg);
                               });
                          
                       }else if(what=="sfeedbackMessages"){
                           async.series([
                                 function(callback){
                                     doc.sfeedbackMessages.forEach(function(val){
                                         i++;
                                         if(val._id==smid){
                                             val.mstaute=staute;
                                             doc.save(function(err,sav){
                                                 if(err){
                                                     //db.close();
                                                     console.log("审核出错..");
                                                     return callback(err,null);
                                                 }else{
                                                     //console.log(sav);
                                                     //db.close();
                                                     console.log("审核成功..");
                                                     return callback(null,sav);
                                                 }
                                             });
                                         }
                                     } );
                                 }
                           ],function(err){
                               if(err){return callback(err);}
                               else{return callback(null);}
                           });
                       }else if(what=="joinMessages"){
                           async.series([
                               function(callback){
                                   doc.joinMessages.forEach(function(val){
                                       i++;
                                       if(val._id==smid){
                                           val.mstaute=staute;
                                           doc.save(function(err,sav){
                                               if(err){
                                                   //db.close();
                                                   console.log("审核出错..");
                                                   return callback(err,null);
                                               }else{
                                                   //console.log(sav);
                                                   //db.close();
                                                   console.log("审核成功..");
                                                   return callback(null,sav);
                                               }
                                           });
                                       }
                                   } );
                               }
                           ],function(err){
                               if(err){return callback(err);}
                               else{return callback(null);}
                           });


                       }else if(what=="sprojectMessages"){
                           async.series([
                               function(callback){
                                   doc.sprojectMessages.forEach(function(val){
                                       i++;
                                       if(val._id==smid){
                                           val.mstaute=staute;
                                           doc.save(function(err,sav){
                                               if(err){
                                                   //db.close();
                                                   console.log("审核出错..");
                                                   return callback(err,null);
                                               }else{
                                                   //console.log(sav);
                                                   //db.close();
                                                   console.log("审核成功..");
                                                   return callback(null,sav);
                                               }
                                           });
                                       }
                                   } );
                               }
                           ],function(err){
                               if(err){return callback(err);}
                               else{return callback(null);}
                           });
                       }else{
                           //db.close();
                           return callback("字段错误..",null);
                       }
                   }
               }
           });
//    })

}


//仅针对游客留言..
function adminMsgOki(sname,smids,staute,callback) {
    mongoose.connect("mongodb://localhost/studio");
    //var db = mongoose.createConnection('localhost',"studio");
    console.log(sname);
    db=mongoose.connection;
    var i=0;
      db.on('error', console.error.bind(console, "connect error:"));
       db.once('open', function () {
      if(typeof(smids)=="object"){
          console.log(smids);
      smids.forEach(function(smid){
//         async.series([
//             function(callbcak){
                 studio.update({sname: sname, "sleaveMessages.smid": smid}, {"sleaveMessage.$.mstaute": staute}, function (err, doc) {
                     console.log("enter update");
                     if(err){
                         console.log("bbb");
                         db.close();
                         console.log(err);
                         return callback(err,null);
                     }else{
                         console.log("ccc");
                         console.log(doc+"cc");
                         adminMsgOki(sname,smids,staute,callback);
                         //return callback(null,doc);
                     }
                     i++;
                     if(i==smids.length) {
                         callback(null, "ok");
                     }
//             }
                 });
//             },
//             function(callback){
//                 i++;
//                 callback(null,null);
//             }
//         ],
//         function(err,doc){
//             if(err)console.log(err);
//             if(i==smids.length){
//                 callback(null,"ok");
//             }
//         });
      });

      }
     });
}

/**
 * 信息处理未通过..标记指令
 * @param sname
 * @param what
 * @param val
 * @param staue
 * @param callback
 */
function adminMsgDel(sname,what,vals,staue,callback){
    var i=0;
    if(what=="sleaveMessages"){
        async.series([
            function(callback){
                vals.foreach(function(val){
                    studio.update({sname:sname,"sleaveMessage.smid":val},{$pull:{"sleaveMessage.$":1}},function(err,num){
                        if(err) {
                            callback(err);
                        }else{
                            console.log(num);
                            console.log("已执行操作..");
                            callback(null,num);
                        }
                    })
                });
            }
        ],function(err){
            i++;
            if(err) console.log(err);
            if(i==vals.length){

            }
        });

    }else if(what=="sfeedbackMessages"){

    }else if(what=="joinMessages"){

    }else if( what=="sprojectMessages"){

    }
    studio.update({sname:sname,"sleaveMessage.smid":val},{$pull:{"sleaveMessage.$":1}},function(err,num){
        if(err) {
            callback(err);
        }else{
            console.log(num);
            console.log("已执行操作..");
            callback(null,num);
        }
    })
}

//*******************************发布模块函数********************************8
//*******************这里没有加入登录验证***************************

/**
 * 查找所有新闻信息..
 * @param callback
 *
 */
function newsInfo(callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.findOne({},"snews -_id",function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{

                callback(null,docs.snews);
            }
        });
    });

}


/**
 * 新闻发布,存入数据库..
 * @param sname
 * @param ntitle
 * @param npublisher
 * @param ncontent
 * @param npic
 * @param callback
 */
function newsSendout(sname,ntitle,npublisher,ncontent,npic,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;
    console.log(sname);

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.update({sname:sname},{$push:{snews:{ntitle:ntitle,npublisher:npublisher,ncontent:ncontent,npic:npic}}},function(err,num){
            db.close();
            if(err) callback(err);
            else if(num!=1){
                callback("未成功更新..");
            }else{
                callback(null);
            }
        });

    });

}


/**
 * 查找所有事件信息..
 * @param callback
 */
function eventsInfo(callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.findOne({},{sevents:1,_id:0},function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{
                callback(null,docs.sevents);
            }
        });
    });

}


/**
 * 大事件发布..存入数据库..
 * @param sname
 * @param etitle
 * @param econtent
 * @param epics
 * @param epubTime
 * @param callback
 */
function eventsSendout(sname,etitle,econtent,epics,epubTime,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;
    console.log(sname);

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.update({sname:sname},{$push:{sevents:{etitle:etitle,econtent:econtent,epics:epics,epubTime:epubTime}}},function(err,num){
            db.close();
            if(err) callback(err);
            else if(num!=1){
                callback("未成功更新..");
            }else{
                callback(null);
            }
        });

    });

}


/**
 * 查找所有成果信息..
 * @param callback
 */
function acInfo(callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.findOne({},{sachievements:1,_id:0},function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{
                callback(null,docs.sachievements);
            }
        });
    });

}

/**
 * 成果发布..存入数据库..
 * @param sname
 * @param atitle
 * @param acontent
 * @param apic
 * @param atime
 * @param callback
 */
function acSendout(sname,atitle,acontent,apic,atime,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;
    console.log(sname);

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.update({sname:sname},{$push:{sachievements:{atitle:atitle,acontent:acontent,apic:apic,atime:atime}}},function(err,num){
            db.close();
            if(err) callback(err);
            else if(num!=1){
                callback("未成功更新..");
            }else{
                callback(null);
            }
        });

    });

}


/**
 * 查找所有榜样信息..
 * @param callback
 */
function exampleInfo(callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.findOne({},{sexamples:1,_id:0},function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{
                callback(null,docs.sexamples);
            }
        });
    });

}

/**
 * 榜样发布..存入数据库..
 * @param sname
 * @param etitle
 * @param econtent
 * @param epic
 * @param etime
 * @param callback
 */
function exampleSendout(sname,etitle,econtent,epic,etime,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;
    console.log(sname);

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        studio.update({sname:sname},{$push:{sexamples:{etitle:etitle,econtent:econtent,epic:epic,etime:etime}}},function(err,num){
            db.close();
            if(err) callback(err);
            else if(num!=1){
                callback("未成功更新..");
            }else{
                callback(null);
            }
        });

    });

}


/**
 * 查找所有成果信息..
 * @param callback
 */
function projectInfo(callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        projects.find({}).populate('pleader pmembers').exec(function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{
                callback(null,docs);
            }
        });
    });

}
/**
 * 按状态查找
 * @param pstaute
 * @param callback
 */
function projectStauteInfo(pstaute,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

    projects.find({pstaute:pstaute}).populate('pleader pmembers').exec(function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{
                callback(null,docs);
            }
        });
    });

}


/**
 * 按类型查找
 * @param ptype
 * @param callback
 */
function projectTypeInfo(ptype,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {

        projects.find({ptype:ptype}).populate('pleader pmembers').exec(function(err,docs){
            db.close();
            if(err) callback(err,null);
            else if(docs==null){
                callback("没有找到任何信息..",null);
            }else{
                callback(null,docs);
            }
        });
    });

}

/**
 * 项目发布..存入数据库..
 *
 * @param ptitle
 * @param pcontent
 * @param ppubTime
 * @param pstartTime
 * @param pfinishTime
 * @param ptype
 * @param pstaute
 * @param pleader
 * @param pmembers
 * @param pdocs
 * @param callback
 */
function projectSendout(ptitle,pcontent,ppubTime,pstartTime,pfinishTime,ptype,pstaute,pleader,pmembers,pdocs,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;
    //对传入的 成员id数组进行处理..
    var ids=pmembers.toString().split(',');
    console.log(typeof(pdocs) +"        ((("+ typeof(pmembers));
    console.log(pdocs + "    <<< " + pmembers);
    console.log(ids);
    for(var i =0;i<ids.length;i++){
        if(ids[i].length==0){
            ids.splice(i,1);
        }
    }
    console.log(ids);
    db.on('error', console.error.bind(console, "connect error:"));
    db.once('open', function () {
        projects.create({ptitle:ptitle,pcontent:pcontent,ppubTime:ppubTime,pstartTime:pstartTime,pfinishTime:pfinishTime,ptype:ptype,pstaute:pstaute,pleader:pleader,pmembers:ids,pdocs:pdocs},function(err){
            db.close();
            if(err) callback(err);
            else{
                callback(null);
            }
        });
    });

}

/**
 * 获取团队(工作室基本信息..
 * @param sname
 * @param callback
 */
function teamInfo(sname,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db= mongoose.connection;

    db.on('error',console.error.bind(console,"connect error: "));
    db.once('open',function(){
        studio.find({sname:sname}).populate("sleader steacher").select("sname scontent sleader steacher stelephone semail saddress sculture").exec(function(err,doc){
            db.close();
            console.log(doc);
            if(err) callback(err,null);
            else if(doc ==null) callback("不存在..数据",null);
            else callback(null,doc);
        });
    });
}

/**
 * 编辑工作室的部分信息..
 * @param sname
 * @param scontent
 * @param steacher
 * @param sleader
 * @param stelephone
 * @param semail
 * @param saddress
 * @param callback
 */
function teamInfoEdit(sname,scontent,steacher,sleader,stelephone,semail,saddress,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function(){
        studio.update({sname:sname},{$set:{sname:sname,scontent:scontent,steacher:steacher,sleader:sleader,stelephone:stelephone,semail:semail,saddress:saddress}},function(err,num){
            if(err) callback(err);
            else if(num!=1) callback("未更新成功..");
            else callback(null);
        })
    })
}
/**
 * 组织信息发布的信息。。
 * @param sname
 * @param callback
 */
function teamInfoSendout(sname,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function(){
        studio.find({sname:sname},{soMessages:1},function(err,docs){
            db.close();
            if(err){
                callback(err,null);
            }else{
                callback(null,docs);
            }
        });
    });
}
/**
 * 组织发布信息  新增。。
 * @param sname
 * @param group
 * @param leader
 * @param date
 * @param content
 * @param pic
 * @param callback
 */
function teamInfoSendoutNew(sname,group,leader,date,content,pic,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        studio.update({sname:sname},{$push:{soMessages:{ogroup:group,oleader:leader,otime:date,ocontent:content,opic:pic}}},function(err,num,doc){
            db.close();
            if(err)callback(err);
            else if(num!=1){
                callback("未成功。。");
            }else{
                callback(null);
            }
        })
    });
}


/**
 * 组织发布信息  修改。。
 * @param sname
 * @id   id
 * @param group
 * @param leader
 * @param date
 * @param content
 * @param pic
 * @param callback
 */
function teamInfoSendoutUpdate(sname,id,group,leader,date,content,pic,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        studio.update({sname:sname,"soMessages.id":id},{$set:{"soMessages.$":{ogroup:group,oleader:leader,otime:date,ocontent:content,opic:pic}}},function(err,num,doc){
            db.close();
            if(err)callback(err);
            else if(num!=1){
                callback("未成功。。");
            }else{
                callback(null);
            }
        })
    });
}
/**
 * 工作室 新闻，事件，成就，榜样 的数目统计。。
 * @param sname
 * @param callback
 */
function teamData(sname,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        studio.findOne({sname:sname},{snews:1,sevents:1,sachievements:1,sexamples:1,sstaute:1,_id:-1},function(err,doc){
            db.close();
            if(err) callback(err,null);
            else{
                //状态 是否需要转换 ？ 0：未开始招新，1：开始招新，2：网站维护中
                var data={};
                data.newsNum=doc.snews.length;
                data.eventsNum=doc.sevents.length;
                data.acNum=doc.sachievements.length;
                data.examplesNum=doc.sexamples.length;
                var trans=["未开始招新","开始招新","网站维护中"];
                data.staute=trans[doc.sstaute];
                callback(null,data)}
        })
    });
}

//*****************人员**************
/**
 * 添加用户,仅加入基本的属性,后续属性由用户,或管理员编辑更新..
 * @param sname
 * @param uname
 * @param uid
 * @param uemail
 * @param ugroupId
 * @param ugrade
 * @param uheadPic
 * @param usex
 * @param uroll
 * @param upwd
 * @param callback
 */
function addUser(sname,uname,uid,uemail,ugroupId,ugrade,uheadPic,usex,uroll,upwd,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    var group=mongoose.Types.ObjectId(ugroupId);
    console.log(group);
    console.log(ugroupId);


    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        user.create({uname:uname,uid:uid,uemail:uemail,ugroupId:group,ugrade:ugrade,uheadPic:uheadPic,usex:usex,uroll:uroll,upwd:upwd},function(err,idoc){

               if(err){ db.close();callback(err)}
            else{
                    db.close();callback(null);
                //    var m = uskills.toString().split(',');
               //    console.log(m);
                 //  console.log(typeof(m));

//                   async.series([
//                       function(callback){
//                           m.forEach(function(val){
//                               skills.update({_id:val._id},{$push:{sknowner:idoc._id}},function(err,num){
//                                     console.log(err + " ********" + num);
////
//                                    });
//                           })
//                       }
//                   ],function(err){
//                        console.log("@@@@@@@@@@@2");
//                       callback("test");
//                   });


                   //@ 没有实现..
//                   groups.find().where("_id").in(uskills).exec(function(err,docs){
//
//                        console.log(docs.length);
//                       async.series([
//                           function(callback) {
//                               docs.forEach(function (val) {
//                                    group.update({_id:val._id},{$push:{sknowner:idoc._id}},function(err,num){
//                                        console.log(err + " ********" + num);
//
//                                    });
//                               });
//                           }
//                       ],function(err,msg){
//                           console.log("@@@@@@@@@@@@2");
//                           return callback(err,msg);
//                       });









             // @方法一:  groups.find().where("_id").in(uskills).update({},{$push:{skowners:doc._id}},{safe: false, multi: true}).exec(function(err,num){



//                  // @方法二: 希望通过单次查询,修改多行,没有实现..
//                   var uid=mongoose.Types.ObjectId(idoc._id);
//                   console.log(idoc._id);
//                   console.log(typeof(idoc._id));
//                   skills.update({_id:{$in:m}},{$push:{skowners:idoc._id}},{safe: false, multi: true},function(err,num){
//                       db.close();
//                    console.log(num);
//                       console.log(err);
//                       if(err)callback(err);
//                       else if(num!=1){
//                           //不知道为啥,成功了..
//                          // callback("不成功。。");
//                           callback(null);
//                       }else{
//                           callback(null);
//                       }
//
//                   })
               }
        })

    });
}

/**
 * 编辑用户信息  如果成功,返回空值..
 * @param sname
 * @param id
 * @param uname
 * @param uid
 * @param unickname
 * @param uemail
 * @param ugroupId
 * @param ugrade
 * @param uheadPic
 * @param usex
 * @param uscore
 * @param uroll
 * @param uskills
 * @param callback
 */
function editUser(sname,id,uname,uid,unickname,uemail,ugroupId,ugrade,uheadPic,usex,uscore,uroll,uskills,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    var group=mongoose.Types.ObjectId(ugroupId);
    console.log(group);
    console.log(ugroupId);
    console.log(uskills + "::::" + typeof(uskills));
    var m = uskills.toString().split(',');
    console.log(m);
    console.log(typeof(m));
    var mid=mongoose.Types.ObjectId(id);

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
       user.findOne({_id:mid},{uskills:1,_id:-1},function(err,doc){
           if(err)callback(err);
           else if(doc==null){
               callback("no user");}
           else{
                   var uskill=doc.uskills;
                   console.log(doc.uskills);

                       skills.update({_id:{$in:uskill}},{$pull:{skowners:mid}},{multi:true},function(err){
                                  console.log(err);
                                 if(err) callback(err);
                                  else{
                                      user.update({_id:mid},{$set:{uname:uname,uid:uid,unickname:unickname,uemail:uemail,ugroupId:group,ugrade:ugrade,uheadPic:uheadPic,usex:usex,uscore:uscore,uroll:uroll,uskills:uskills}},function(err,idoc){

                                        if(err){ db.close();callback(err)}
                                        else{
                                            // @方法二: 希望通过单次查询,修改多行,没有实现..
                                            // var uid=mongoose.Types.ObjectId(idoc._id);

                                        skills.update({_id:{$in:m}},{$addToSet:{skowners:mid}},{safe: false, multi: true},function(err,num){
                                              db.close();
                                               console.log(num);
                                                 console.log(err);
                                                if(err)callback(err);
                                                else if(num!=1){
                                                //不知道为啥,成功了..
                                                // callback("不成功。。");
                                                callback(null);
                                                 }else{
                                                callback(null);
                                                }

                        })
                    }
                })
            }


        });


           }
           });
       })

}
/**
 * 删除用户..
 * @param sname
 * @param id
 * @param callback
 */
function removeUser(sname,id,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    var mid=mongoose.Types.ObjectId(id);

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
       user.remove({_id:mid},function(err,num){
           db.close();
           console.log(err+ " e333 " + num);
           if(err)callback(err);
           else if(num!=1){
               console.log("fail..");
               callback('buchengong');
           }else{
               console.log("success");
               callback(null);
           }
       })
    })
}

/**
 * 这个函数写得不好..
 * 分组查询,包含分页..
 * 在函数预设时,将Id写入对应的判断中去..
 * @param sname
 * @param group
 * @param pagesize
 * @param pagenow
 * @param callback
 */
function peopleInfo(sname,group,pagesize,pagenow,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        if(group=='all'){
            user.find().skip(pagenow*pagesize).limit(pagesize).exec(function(err,docs){
                db.close();
                callback(err,docs);
            });
        }
        else if(group=='group0'){
            user.find({ ugroup:"5437c5fe229fe3981c6135dc"}).skip(pagenow*pagesize).limit(pagesize).exec(function(err,docs){
                db.close();
                callback(err,docs);
            });
        }
        else if(group=='group1'){
            user.find({ ugroup:"5437c5fe229fe3981c6135dd"}).skip(pagenow*pagesize).limit(pagesize).exec(function(err,docs){
                db.close();
                callback(err,docs);
            });
        }
        else if(group=='group2'){
            user.find({ugroup:"5437c5fe229fe3981c6135de"}).skip(pagenow*pagesize).limit(pagesize).exec(function(err,docs){
                db.close();
                callback(err,docs);
            });
        }
        else {
            db.close();
            callback("not find..",null);
        }
    });
}

/**
 * 各个组的人数..
 * @param sname
 * @param callback
 */
function peopleNum(sname,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        groups.find({},function(err,docs){
            db.close();
            console.log(docs + " ** " + typeof(docs));
            var data=[];
            for(var i=0;i<docs.length;i++){
                var v={};
                v.name=docs[i].gname;
                v.num=docs[i].gmember.length;
                data.push(v);
            }
            console.log(data);
            callback(err,data);
        })
    });
 }

/**
 * 根据条件查找用户..
 * 对于不加约束的条件,设为空哦..
 * @param sname
 * @param skills
 * @param group   可为空
 * @param grade   可为空
 * @param name    可为空
 * @param callback
 */
function findPeople(sname,skills,group,grade,name,callback) {
    mongoose.connect("mongodb://localhost/studio");
    var db = mongoose.connection;
    if(group!=null){
        var ugroup=mongoose.Types.ObjectId(group);
    }

    db.on('error', console.error.bind(console, "connect error"));
    db.once('open', function () {
    if((grade==""||grade==null)&&(group==""||group==null)){
        user.find({uskills:{$in:skills},uname:new RegExp(name,'i')},function(err,docs){
            db.close();
            console.log(docs+ "  " + err);
            callback(err,docs);
        })
    }else if(grade==""||grade==null){
        user.find({uskills:{$in:skills},ugroupId:ugroup,uname:new RegExp(name,'i')},function(err,docs){
            db.close();
            console.log(docs+ "  " + err);
            callback(err,docs);
        })
    }else if(group==""||group==null){
        user.find({uskills:{$in:skills},ugrade:grade,uname:new RegExp(name,'i')},function(err,docs){
            db.close();
            console.log(docs+ "  " + err);
            callback(err,docs);
        })
    }else{
        user.find({uskills:{$in:skills},ugroupId:ugroup,ugrade:grade,uname:new RegExp(name,'i')},function(err,docs){
            db.close();
            console.log(docs+ "  " + err);
            callback(err,docs);
        })
    }

    });
}
exports.adminData=adminData;
exports.adminTip=adminTip;
exports.adminMsg=adminMsg;
exports.adminMsgOk=adminMsgOk;
exports.adminMsgOki=adminMsgOki;
exports.newsSendout=newsSendout;
exports.newsInfo=newsInfo;
exports.eventsSendout=eventsSendout;
exports.eventsInfo=eventsInfo;
exports.acSendout=acSendout;
exports.acInfo=acInfo;
exports.exampleInfo=exampleInfo;
exports.exampleSendout=exampleSendout;
exports.projectInfo=projectInfo;
exports.projectSendout=projectSendout;
exports.projectStauteInfo=projectStauteInfo;
exports.projectTypeInfo=projectTypeInfo;
exports.teamInfo=teamInfo;
exports.teamInfoEdit=teamInfoEdit;
exports.teamInfoSendout=teamInfoSendout;
exports.teamInfoSendoutNew=teamInfoSendoutNew;
exports.teamInfoSendoutUpdate=teamInfoSendoutUpdate;
exports.teamData=teamData;
exports.addUser=addUser;
exports.editUser=editUser;
exports.removeUser=removeUser;
exports.peopleInfo=peopleInfo;
exports.peopleNum=peopleNum;
exports.findPeople=findPeople;