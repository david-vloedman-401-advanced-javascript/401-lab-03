'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if( file.match(/bad/i) ) {
    cb('Invalid File');
  }
  else {
    cb(undefined, new Buffer('{ "name": "works!" }'));
  }
};

exports.writeFile = (file, data, cb) => {
  const existingFile = 'file.json';
  if(file !== existingFile){
    cb('File does not exist');
  } else if(!Buffer.isBuffer(data)){
    cb('Is not a buffer');
  } else {
    cb(undefined, 'success');
  }
};

