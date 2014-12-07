/**
 * Created by I on 2014/10/10.
 */
var mongoose =require("mongoose");
var Schema = mongoose.Schema;
//转换为小写,防止邮箱重复注册..

function toLower(val){
    return val.toLowerCase();
}


var newsSchema=mongoose.Schema({

    ntitle: String,//新闻题目

    npic: String,//新闻配图url

    ncontent: String,//新闻内容

    npublisher: String,//发布者

    npubTime: {type:Date,default:Date()}//发布时间

});

var eventSchema=mongoose.Schema({//大事件


    etitle:String,//事件标题

    epics:[String],//大事件图组 url

    econtent:String,//大事件内容

    epubTime:{type:Date,default:Date()}//发布时间

});

var achievementSchema=mongoose.Schema({//成就集合

    atitle:String,//成就标题

    apic:[String],//成就图片url

    atime:{type:Date,default:Date()},//时间

    acontent:String//成就内容

});

var exampleSchema=mongoose.Schema({//榜样集合,

    etitle: String,//榜样名称（或者名字）

    epic: String,//图url

    etime:{type:Date,default:Date()},

    econtent: String//榜样介绍

});
var cultureSchema = mongoose.Schema(//文化 (包含于studio,用于介绍工作室..)

    {cname:String,ccontent:String}//文化id，名字，内容

);

//各个组发布的信息。。
/**
 * 组别，发布人，发布（更新时间），关联图片。。
 */
var omsgSchema = mongoose.Schema({
    ogroup:String,
    oleader:String,
    otime:{type:Date,default:Date()},
    ocontent:String,
    opic:String
});


var studioSchema= mongoose.Schema({
    //工作室集合（only one item）



        sname:String,//工作室名称

        scontent:String,//介绍

        svisited:Number,//访问次数

        svisitedToday:Number,//今天访问的次数

        steacher:[{type:Schema.Types.ObjectId,ref:'user'}],//指导教师

        sleader:[{type:Schema.Types.ObjectId,ref:'user'}],//负责人

        stelephone:Number,//联系电话

        semail:String,//邮箱

        saddress:String,//地址

        sculture:[//文化集合

            cultureSchema

        ],
        soMessages:[
            omsgSchema
        ] ,
        sfeedbackMessages:[//用户反馈

            {

                smid:String,//id

                uname:String,//反馈人姓名

                uemail:String,//反馈人邮箱

                mcontent:String,//反馈内容

                mtime:{type:Date,default:Date()},//反馈时间

                mstaute:{type:Number, default:0},//审核状态..0未审核, 1审核通过..

                reversions:[//针对这个反馈的回复

                    {rid:String,uname:String,uemail:String,mcontent:String,mtime:{type:String,default:Date()}}//回复id，发送人，其邮箱，内容，时间
                ]

            }

        ],

sleaveMessages:[//留言（内容同用户反馈）

    {

        smid:String,//留言id 时间戳+随机数,手动生成

        uname:String,//留言者雅号

        mcontent:String,//留言内容

        mtime:{type:Date,default:Date()},//留言时间

        mstaute:{type:Number, default:0},//审核状态..0未审核, 1审核通过..

        reversions:[//针对这个留言的回复

            {rid:String,uname:String,uemail:String,mcontent:String,mtime:{type:String,default:Date()}}


            ]

        }

    ],

sprojectMessages:[//项目申请

    {

       // smid:String,//id 项目id使用默认 _id

        uid:String,//申请人ID

        pid:String,//项目ID

        uname:String,//申请人姓名

        uemail:String,//申请人邮箱

        mcontent:String,//申请人说明

        mtime:{type:Date,default:Date()},//申请时间

        mstaute:{type:Number, default:0}//审核状态..0未审核, 1审核通过..

    }

],

joinMessages:[//加入申请

    {

        smid:String,//id

        uname:String,//申请人姓名

        uemail:String,//申请人邮箱

        mcontent:String,//申请人说明

        mtime:{type:Date,default:Date()},//申请时间

        mstaute:{type:Number, default:0}//审核状态..0未审核, 1审核通过..

    }

],


    snews:[newsSchema],//新闻集合..

    sevents:[eventSchema],//大事件集合

    sachievements:[achievementSchema],//成就集合..

    sexamples:[exampleSchema],//榜样集合..

    sstaute:Number//0：未开始招新，1：开始招新，2：网站维护中

});

exports.studio=mongoose.model("studio",studioSchema);
exports.news=mongoose.model("news",newsSchema);
exports.event=mongoose.model("event",eventSchema);
exports.achievement=mongoose.model("achievement",achievementSchema);
exports.example=mongoose.model("example",exampleSchema);
exports.culture=mongoose.model('culture',cultureSchema);
exports.culture=mongoose.model('message',omsgSchema);