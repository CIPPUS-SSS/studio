/**
 * Created by I on 2014/11/27.
 */
/*jshint node:true*/
'use strict'

var mongoose = require('mongoose')
    , connection = mongoose.createConnection('mongodb://localhost/studio')

connection.on('error', function (err) {
    console.log(err)
})

exports.connection = connection

/* 对于客户端来说，我们是否选择打开默认的
 * connection对象这件事应该是透明的 */

/*
 mongoose.connect('mongodb://localhost/NewProject')

 mongoose.connection.on('error', function (err) {
 console.log(err)
 })

 exports.connection = mongoose.connection
 */