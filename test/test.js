/**
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');
var should = require('should');
var index = require('../index'); // Always place index before all local files
var dump = require('../lib/dump');
var toodo = require('../lib/toodo');


var DESKTOP_PATH = index.DESKTOP_PATH;
var DUMP_PATH = index.DUMP_PATH;

// Test for making and deleting dump
if (dump.exists) {
  dump.delete();
  (dump.exists).should.be.false;
}
dump.make();
dump.exists.should.be.true;

// Basic tests for dump
var dumpData = dump.get();
dumpData.should.be.an.Array;

// Test for item's data
toodo.add('hello');
var dumpData = dump.get();
var itemData = dumpData[0];
itemData.should.be.an.Object;
itemData.should.have.property('name', 'hello');
new Date(itemData.created).should.be.an.instanceof(Date);
var itemPath = path.join(DESKTOP_PATH, itemData.name);
var itemExists = fs.existsSync(itemPath);
itemExists.should.be.true;

// Test for sorting based on time
toodo.add('hello2');
toodo.add('hello3');
var dumpData = dump.get();
dumpData.should.have.a.lengthOf(3);
var firstItem = dumpData[0];
firstItem.name.should.have.property('name', 'hello');
var mostRecentItem = dumpData[2];
mostRecentItem.name.should.have.property('name', 'hello3');
