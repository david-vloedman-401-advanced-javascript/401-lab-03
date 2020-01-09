'use strict';

jest.mock('fs');

const file = require('../edit-file.js');



describe('File Reader Module', () => {

  describe('as a callback', () => {

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

});
