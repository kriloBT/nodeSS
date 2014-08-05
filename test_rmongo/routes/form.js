//mongodbDemo
// var mongodb = require('../models/db.js');
var util = require('util');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
var childprocess = require('child_process');

exports.form1 = function (req, res) {
    //res.render('mongodbDemo1', { title: 'mongodbDemo1' ,layout: 'l2'});
    res.render('formComponent', { title: 'Table', resp : false, layout: 'l2' });
};

exports.form2 = function (req, res) {
    //res.render('mongodbDemo1', { title: 'mongodbDemo1' ,layout: 'l2'});
    res.render('formTable', { title: 'Table', resp : false, layout: 'l2' });
};
exports.form3 = function (mongodb) {
    return function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        var collection = mongodb.get('events');
        var query = {};
        collection.count(query, function (err, total) {
            //根据 query ?象查?，并跳?前 (page-1)*10 ??果，返回之后的 10 ??果
            collection.find(query, 
						    { skip : (page - 1) * 10, limit : 10, sort : { timestamp : -1 } }, function (e, docs) {
                res.render('formPaging', {
                    title : 'Page',
                    resp : docs,
                    page : page,
                    isFirstPage : (page - 1) == 0,
                    isLastPage : ((page - 1) * 10 + docs.length) == total,
                    layout: 'l2'
                });
            });
        });
    //res.render('formPaging', { title: 'Paging', resp : false, layout: 'l2' });
    };
};

exports.formTest = function (req, res) {
    //res.render('mongodbDemo1', { title: 'mongodbDemo1' ,layout: 'l2'});
    res.render('formTest', { title: 'Table', resp : false, layout: 'l2' });
};





//---------------PROCCESS----------------------
exports.formProcessPage = function (req, res) {
    res.render('formProcess', { title : 'process get', resp : false, layout : 'l2' });
};

exports.formProcess = function () {
    return function (req, res) {
        if (req.body.mongoOption > 0) processexec();
        //console.log("child exec" + '\n\n');
        res.render('formProcess', { title: 'process calc', Switch: 'no', layout: 'l2' });
    };
}

function newTerminal() {
    // return "gnome-terminal -x sh -c '"+cmdstr+"|less'"; ==> 會跳出視窗
    //return "gnome-terminal -x sh -c '"+cmdstr+"'";
    //return 'mongod';
    return "calc";
    console.log('calc');
}

function processexec() {
    childprocess.exec(newTerminal());
    console.log('child_process');
}