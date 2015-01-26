/**
 * Created by I on 2014/11/27.
 */
var userCl = require("./userCl");
var adminCl = require("./adminCl");

var user=require('./user');
var groups=require('./other').group;
var skills=require('./other').skill;
var projects=require('./other').project;
var studio=require("./studio").studio;
//
//// mongoose config
//var mongoose = require('mongoose')
//    , connectionString = 'mongodb://localhost/studio'
//    , options = {};
//
//options = {
//    server: {
//        auto_reconnect: true,
//        poolSize: 5
//    }
//};
//
//mongoose.connect(connectionString, options, function(err) {
//    if(err) {
//        console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
//    } else {
//        console.log('[mongoose log] Successfully connected to: ' + connectionString);
//    }
//});

function getDB(callback){
var db = mongoose.connection;
    console.log("****************");
db.on('error', console.error.bind(console, 'mongoose connection error:'));
    console.log("*******************");
   db.once('open', function(){
       callback();
   });
}
function openDB(func,param){
    mongoose.connect('mongodb://localhost/studio');
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function(){
        func();
    })
}
/**
 * 判断所给的值是否在array 中,bool为真,返回bool值..否则返回索引..
 * @param array
 * @param val
 * @param bool
 * @returns {*}
 */
function inArray(array,val,bool){
    if(typeof(array)=='object'&& array.constructor==Array){
        for(var i=0;i<array.length;i++){
            if(val==array[i]){
               if(bool){
                return true;
               }
                return i;
            }
            return false;
            }
        }
     else{
        throw("not a array");
    }
}


/**
 * 通过id找到用户..
 * @param uid
 */
function findUser(uid){
    user.find({_id:uid},options,function(err,doc){
        if(err)return null;
        else return doc;
    })
}



exports.findUser = findUser;
exports.inArray=inArray;
exports.openDB=openDB;
exports.getDB=getDB;
//exports.mongoose=mongoose;