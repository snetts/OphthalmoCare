'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config'),
    mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    moment = require('moment'),
    Patient = mongoose.model('Patient'),
    fileHandler = require('../../app/controllers/' + config.fileHandler + '-file-handle'),
    _ = require('lodash');


/**
 * render patient photo
 */
exports.renderPhoto = function (req, res) {
    var patient = req.patient;
    var time = patient.created.time;
    var photoPath = moment(time).year() + '/' +
        (moment(time).month() + 1) + '/' +
        moment(time).date() + '/' +
        patient._id + '/' + patient.personalPhoto;
    fileHandler.responseFile(photoPath, res);
};

/**
 * Create a Patient
 */
exports.create = function (req, res, next) {
    var patient = new Patient(req.body);
    patient.created._user = req.user;
    var hasPhoto = patient.personalPhoto;
    if (hasPhoto === 'true') {
        patient.personalPhoto = config.patientPhotoFileName;
    }
    patient.save(function (err, newPatient) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else {
            if (hasPhoto === 'true') {
                var time = newPatient.created.time;
                var photoPath = moment(time).year() + '/' +
                    (moment(time).month() + 1) + '/' +
                    moment(time).date() + '/' +
                    newPatient._id + '/';
                _.extend(req.body, {filePath: photoPath});
                _.extend(req.body, newPatient);
                next();
                return;
            }
            res.jsonp(newPatient);
        }
    });
};

/**
 * Show the current Patient
 */
exports.read = function (req, res) {
    res.jsonp(req.patient);
};

/**
 * Update a Patient
 */
exports.update = function (req, res, next) {
    var patient = req.patient;
    patient = _.extend(patient, req.body);

    patient.updated._user = req.user;
    patient.updated.time = Date.now();
    var hasPhoto = patient.personalPhoto;
    if (hasPhoto === 'true') {
        patient.personalPhoto = config.patientPhotoFileName;
    }
    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (hasPhoto === 'true') {
                var time = patient.created.time;
                var photoPath = moment(time).year() + '/' +
                    (moment(time).month() + 1) + '/' +
                    moment(time).date() + '/' +
                    patient._id + '/';
                _.extend(req.body, {filePath: photoPath});
                _.extend(req.body, patient);
                next();
                return;
            }
            res.jsonp(patient);
        }
    });
};

/**
 * Delete an Patient
 */
exports.delete = function (req, res) {
    var patient = req.patient;

    patient.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(patient);
        }
    });
};

/**
 * List of Patients
 */
/*exports.list = function (req, res) {
    Patient.find().exec(function (err, patients) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(patients);
        }
    });
};*/

exports.list = function (req, res) {
    Patient.find().exec(function (err, patients) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({list: patients});
        }
    });
};

function getSearchQuery(property){

    var newQuery = {}; // the new query

    var queue = [];
    var queueValues = [];
    var result = "";
    var obj = null;

    if(typeof property == 'string'){
        try{
            obj = JSON.parse(property);
        }
        catch(e){
            result += " - " + property;
        }
    }
    else{
        obj = property;
    }

    if(obj != null && obj != undefined){
        for(var key in obj){
            queue.push(key);
            queueValues.push(obj[key]);
        }
        while (queue.length > 0){
            try{
                var propKey = queue[0];
                try{ // Object && Array
                    var propValue = JSON.parse(queueValues[0]);
                    if(Array.isArray(propValue) && propValue.length > 0){  // Array
                        newQuery[propKey] = {$all: propValue};
                    }
                    else{  // Object
                        for(var k in propValue){
                            queue.push(propKey + "." + k);
                            queueValues.push(propValue[k]);
                        }
                    }
                }
                catch(e){  // string && empty array && Already sent as array
                    if(typeof queueValues[0] == 'string'){
                        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
                        if(checkForHexRegExp.test(queueValues[0]) == true){  // check if field is ObjectId
                            newQuery[propKey] =  queueValues[0];
                        }
                        else{
                            newQuery[propKey] = new RegExp('.*' +  queueValues[0] + '.*', 'i');
                        }


                    }
                    if(typeof queueValues[0] == 'object'  && Array.isArray(queueValues[0]) && queueValues[0].length > 0){
                        newQuery[propKey] = {$all: queueValues[0]};
                    }
                }
            }
            catch(e){
            }
            queue.shift();
            queueValues.shift();
        }
    }

    return newQuery;

}

exports.search = function(req,res){
    console.log("***********************************");
    console.log("returned Req.Query");
    var newRequest = getSearchQuery(req.query);
    Patient.find(newRequest).populate('_patient').populate('created._user').exec(function (err, patients) {
        if (err) {
            console.log('error');
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            console.log(patients);
            res.jsonp({list: patients});
        }
    });
};

/*
exports.search = function (req, res) {
    console.log('search search search');
    console.log(req.query);
    if (req.query && Object.keys(req.query).length > 0) {
        //fullName
        if (req.query.hasOwnProperty('fullName') && req.query.fullName && req.query.fullName.length > 0) {
            req.query.fullName = new RegExp('.*' + req.query.fullName + '.*', 'i');
        }
        else {
            delete req.query.fullName; // didn't search by fullName
        }
        //gender
        if (req.query.hasOwnProperty('gender') && req.query.gender && req.query.gender.length > 0) {
        }
        else {
            delete req.query.gender; // didn't search by gender
        }
        //birthDate
        if (req.query.hasOwnProperty('birthDate') && req.query.birthDate && req.query.birthDate.length > 0) {
        }
        else {
            delete req.query.birthDate; // didn't search by birthDate
        }
        //tel
        if (req.query.hasOwnProperty('tel') && req.query.tel && req.query.tel.length > 0) {
            //req.query.tel = {$regex: '.*' + req.query.tel + '.*', $options: 'i'};
            req.query.tel = new RegExp('.*' + req.query.tel + '.*', 'i');
        }
        else {
            delete req.query.tel; // didn't search by tel
        }
        //address
        if (req.query.hasOwnProperty('address') && req.query.address && req.query.address.length > 0) {
            //req.query.address = {$regex: '.*' + req.query.address + '.*', $options: 'i'};
            req.query.address = new RegExp('.*' + req.query.address + '.*', 'i');
        }
        else {
            delete req.query.address; // didn't search by address
        }
        //email
        if (req.query.hasOwnProperty('email') && req.query.email && req.query.email.length > 0) {
            //req.query.email = {$regex: '.*' + req.query.email + '.*', $options: 'i'};
            req.query.email = new RegExp('.*' + req.query.email + '.*', 'i');
        }
        else {
            delete req.query.email; // didn't search by email
        }
        //notes
        if (req.query.hasOwnProperty('notes') && req.query.notes && req.query.notes.length > 0) {
            //req.query.notes = {$regex: '.*' + req.query.notes + '.*', $options: 'i'};
            req.query.notes = new RegExp('.*' + req.query.notes + '.*', 'i');
        }
        else {
            delete req.query.notes; // didn't search by notes
        }

        //pagination
        var pageNo = 0, pageSize = 10;
        if (req.query.hasOwnProperty('paginationConfig')) {
            var paginationConfig = JSON.parse(req.query.paginationConfig);
            pageNo = paginationConfig.pageNo - 1;
            pageSize = paginationConfig.pageSize;
            delete req.query.paginationConfig;
        }

        Patient.find(req.query).skip(pageNo * pageSize).limit(pageSize).exec(function (err, patients) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                Patient.find(req.query).count(function (err, _count) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    else {
                        res.jsonp({list: patients, count: _count});
                    }

                });

            }
        });
    }
};*/

/**
 * Patient middleware
 */
exports.patientByID = function (req, res, next, id) {
    Patient.findById(id).populate('user', 'displayName').exec(function (err, patient) {
        if (err) return next(err);
        if (!patient) return next(new Error('Failed to load Patient ' + id));
        req.patient = patient;
        next();
    });
};

/**
 * Patient authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.patient.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
