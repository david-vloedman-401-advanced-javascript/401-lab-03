'use strict';

jest.mock('fs');

const file = require('../edit-file.js');



describe('File Reader Module', () => {

  describe('Test reading files', () => {

    it('when given a bad file, returns an error', (done) => {     
      let directory = `${__dirname}/../../data/bad.txt`;
      file.read(directory, (err, data) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('when given a real file, returns the contents', (done) => {
      let directory = `${__dirname}/../../data/file1.txt`;
      file.read(directory, (err, data) => {
        expect(err).toBeUndefined();
        
        expect(typeof data).toBe('object');
        done();
      });
    });

  });

  describe('Test the writing of a file', ()=>{
    const badFile = 'bad.json';
    const goodFile = 'file.json';
    const badBuffer = 'this is a bad a buffer';
    const goodBuffer = new Buffer('this is a good buffer');

    const firstRules = {
      fields: {
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          required: true,
        },
      },
    };

    const secondRules = {
      fields: {
        married: {
          type: 'array',
          required: true,
        },
        hair: {
          type: 'object',          
        },
      },
    };

    const rules = {};

    it('when given a file that does not exist, returns an error', (done)=> {
      file.save(goodBuffer, badFile, rules, (err, data) => {
        expect(err).toBeDefined();
        done();
      });
    });


    it('when given a file that does exist, error is undefined', done => {
      file.save(goodBuffer, goodFile, rules, (err, data) => {
        expect(err).toBeUndefined();
        done();
      });
    });


    it('when given data that is a  buffer, error is error is undefined', done => {
      file.save(goodBuffer, goodFile, rules, (err, data) => {
        expect(err).toBeUndefined();
        done();
      });
    });

    it('when given data that is not a buffer, error is error is defined', done => {
      file.save(badBuffer, goodFile, rules, (err, data) => {
        expect(err).toBeUndefined();
        done();
      });
    });     
  });

});




const faker = require('faker');
const validator = require('../lib/validatorClass.js');



const schema = {
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    age: {
      type: 'number',
      required: true,
    },
    children: {
      type: 'array',
      valueType: 'string',
    },
  },
};

let str = 'yes';
let num = 1;
let arr = ['a'];
let obj = {
  x: 'y',
};
let func = () => {};
let bool = false;

describe('validator module performs basic validation of', () => {
  
    

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
  });

  it('arrays', () => {
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeFalsy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(func)).toBeFalsy();
    expect(validator.isObject(bool)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(func)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
  });

  it('functions', () => {
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
    expect(validator.isFunction(bool)).toBeFalsy();
  });
});


describe('validates the basic schema', () => {
  
    
  it('isValid() function validates a good record.', () => {
      
    let testRecord = {};

    for (let field in schema.fields) {
      switch (schema.fields[field].type) {
      case 'boolean':
        testRecord[field] = faker.random.boolean();
        break;
      case 'number':
        testRecord[field] = faker.random.number();
        break;
      case 'string':
        testRecord[field] = faker.random.word();
        break;
      case 'array':
        testRecord[field] = [];
        testRecord[field].push(faker.random.arrayElement());
        testRecord[field].push(faker.random.arrayElement());
        break;
      default:
        null;
      }
    }
    expect(validator.isValid(schema, testRecord)).toBeTruthy();
  });

  it('isValid() function returns undefined with missing requirements', () => {
   
    let testRecord = {};
    for (let field in schema.fields) {
      if (schema.fields[field].required) {
        testRecord[field] = null;
      }
    }
    expect(validator.isValid(schema, testRecord)).toBeFalsy();
  });
});


const personRules = {
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    age: {
      type: 'number',
      required: true,
    },
    children: {
      type: 'array',
      valueType: 'string',
    },
  },
};

const susan = {
  id: '123-45-6789',
  name: 'Susan McDeveloperson',
  age: 37,
  children: [],
};

const fred = {
  id: 38,
  name: 'Freddy McCoder',
  children: [],
};

const ned = {};

const arrayRules = {
  fields: {
    test: {
      type: 'array',
      valueType: 'number',
    },
  },
};

const richard = {
  test: ['dick', 34],
};

describe('validator module performs complex validations', () => {
  
    
    it('Validates an object with a set of rules against an object', () => {
      expect(validator.isValid(personRules, susan)).toBeTruthy();
    });

    it('validates an object with a set of rules against an object that does not pass', () => {
      expect(validator.isValid(personRules, fred)).toBeFalsy();
    });

    it('does not validate rules against an empty object', () => {
      expect(validator.isValid(personRules, ned)).toBeFalsy();
    });

    it('validates a value array against an approved list', () => {
      expect(validator.isValid(arrayRules, richard)).toBeFalsy();
    });
  });

