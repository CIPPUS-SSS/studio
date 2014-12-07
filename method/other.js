/**
 * Created by I on 2014/10/10.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var groupSchema=mongoose.Schema({//组别集合

    ID:{type:Number,_id:true},

    gname:String,//组名

    gcontent:String,//组介绍

    gbackgroundPic:String,//图url

    gleader:{type:Number},//负责人 (id)..

    gmember:[{type:Number}]//成员 (id)

});

var projectSchema=mongoose.Schema({//项目集合



    ptitle: String,//项目标题

    pcontent: String,//项目介绍

    ppubTime: {type:Date,default:Date()},//申请时间//发布时间

    pstartTime: {type:Date,default:Date()},//开始时间

    pfinishTime: {type:Date,default:Date()},//结束时间

    ptype: Number,//项目类型 0：科研项目，1：外包项目，2：geek创意，3：校园作品

    pstaute: Number,//项目状态 0：开始报名，1：进行中，2：成功结束，3：死掉了

    pleader: {type: Schema.Types.ObjectId, ref: 'user' },//Leader(name)

    pmembers: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],//项目成员(id)

    pdocs: [
        {type: String}
    ]//url..

});



var skillSchema=mongoose.Schema({

    ID:{type:Number,_id:true},

    skname:String,//技能名称

    skowners:[{type:Schema.ObjectId,ref:'user'}]//技能拥有者

});


exports.group=mongoose.model("group",groupSchema);
exports.project=mongoose.model("project",projectSchema);
exports.skill=mongoose.model("skill",skillSchema);