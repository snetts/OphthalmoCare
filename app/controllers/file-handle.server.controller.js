'use strict';

/**
 * Module dependencies.
 */
var	config = require('../../config/config'),
    errorHandler = require('./errors'),
    path=require('path'),
    fs=require('fs'),
    mime = require('mime-types'),
    filesRoot=config.filesUpload;


var saveFile=function(file, filePath, callback){
    console.log(file);
    var ext=mime.extension(file.type);
    if(ext){
        ext='.'+ext;
    }
    fs.rename(file.path, filesRoot + filePath + file.name + ext, function(err) {
        if(err){
            callback(err);
        }
        else{
            callback();
        }
    });
}

var createDir=function(filePath, callback, position) {
    var parts = path.normalize(filePath).split(path.sep);
    var rootDir = path.normalize(filesRoot);
    position = position || 0;
    if (position >= parts.length) {
        return callback();
    }
    var directory = rootDir+parts.slice(0, position + 1).join(path.sep) || path.sep;
    fs.stat(directory, function(err) {
        if (err === null) {
            createDir(path, callback, position + 1);
        } else {
            fs.mkdir(directory, function(err) {
                if (err && err.code !== 'EEXIST') {
                    return callback(err);
                } else {
                    createDir(path, callback, position + 1);
                }
            });
        }
    });
};

exports.fileUpload=function(req, res){
    var filePath = req.body.filePath;
    var warn=null;
    fs.exists(filesRoot+filePath, function(exist){
       if(!exist){
           createDir(path, function(err) {
               if(err){
                   warn={warn:errorHandler.getErrorMessage(err)};
                   _.extend(req.body, warn);
                   res.jsonp(req.body);
                   return;
               }
               saveFile(req.files.file, filePath, function(err) {
                   if(err){
                       warn={warn:errorHandler.getErrorMessage(err)};
                       _.extend(req.body, warn);
                       res.jsonp(req.body);
                       return;
                   }
                   res.jsonp(req.body);
               });
           });
       }
        else{
           saveFile(req.files.file, filePath, function(err) {
               if(err){
                   warn={warn:errorHandler.getErrorMessage(err)};
                   _.extend(req.body, warn);
                   res.jsonp(req.body);
                   return;
               }
               res.jsonp(req.body);
           });
       }
    });
};
