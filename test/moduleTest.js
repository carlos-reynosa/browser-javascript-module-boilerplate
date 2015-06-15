console.log('Running tests...');

var assert = require("assert");

var testModule= require('../src/module.js');

describe('Test functions',function(){
    it('should return false',function(){
        assert.equal(false,testModule.testFunction());
    });
});