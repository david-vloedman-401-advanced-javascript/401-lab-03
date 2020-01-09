'use strict';

const validator = require('./lib/validatorClass');
const file = require('./edit-file');
const util = require('util');

const directory = `${__dirname}/data/${process.argv[2]}`;


let readfilePromise = util.promisify(file.read);
let saveFilePromise = util.promisify(file.save);



const fileRules = {
  fields: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },   
    hair: {
      type: 'array',
      valueType: 'string',
    },
  },
};

readfilePromise(directory).then(data => {

  data.firstName = 'David';
  data.lastName = 'Vanderbeek';
  data.married = true;
  
  saveFilePromise(data, directory, fileRules).then(stuff => console.log('Success')).catch(err => {
    throw err;
  });
  
});



