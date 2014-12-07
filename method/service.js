/**
 * Created by I on 2014/11/27.
 */
var userCl = require("./userCl");
var adminCl = require("./adminCl");
var mongoose= require("mongoose");



function service_user(callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,'connection error:******'));

    db.once('open',function(){

    });
}
