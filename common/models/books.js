'use strict';
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var pdf = require('html-pdf');
var options = {format: 'Letter'};
module.exports = function(Books) {
  var uploadedFileName = '';
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // checking and creating uploads folder where files will be uploaded
      var dirPath = 'uploads/';
      if (!fs.existsSync(dirPath)) {
        var dir = fs.mkdirSync(dirPath);
      }
      cb(null, dirPath + '/');
    },
    filename: function(req, file, cb) {
      // file will be accessible in `file` variable
      var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
      var fileName = Date.now() + ext;
      uploadedFileName = 'uploads/' + fileName;
      cb(null, fileName);
    },
  });
  Books.remoteMethod('addByPDF', {
    accepts: [
      {arg: 'title', type: 'string', required: true},
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},

    ],
    returns: {root: true, type: 'object'},
    http: {path: '/addByPDF', verb: 'post'},
  });
  Books.addByPDF = function addByPDF(title, req, res, cb) {
    var upload = multer({
      storage: storage,
      onError: function(err, next) {
        console.log('error', err);
        next(err);
      },
    }).single('file');

    upload(req, res, function(err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return cb(err);
      }
      return Books.create({
        title: title,
        url: '/api/' + uploadedFileName,
        rating: 0,
      })
        .then(book => {
          console.log(book);
          cb(null, book);
        })
        .catch(err => {
          console.log(err);
          cb(err);
        });
    });
  };

  Books.remoteMethod('addByContent', {
    accepts: [
      {arg: 'title', type: 'string', required: true, http: {source: 'form'}},
      {arg: 'content', type: 'string', required: true, http: {source: 'form'}},
    ],
    returns: {root: true, type: 'object'},
    http: {path: '/addByContent', verb: 'post'},
  });
  Books.addByContent = function addByContent(title, content, cb) {
    const bookName = Date.now() + '.pdf';
    pdf.create(content, options).toFile(path.join(__dirname, '..', '..', 'uploads', bookName), function(err, res) {
      if (err) {
        return cb(err);
      }
      console.log(res); // { filename: '/app/businesscard.pdf' }
      Books.create({
        title: title,
        url: '/api/uploads/' + bookName,
        rating: 0,
      })
        .then(book => {
          console.log(book);
          cb(null, book);
        })
        .catch(err => {
          console.log(err);
          cb(err);
        });
    });
  };
};
