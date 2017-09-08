const split = require('split2');
const through2 = require('through2');
const stream = require('stream')
const fs = require('fs')

const parseCSV = () => {
  let templateKeys = [];
  let parseHeadline = true;
  return through2.obj((data, enc, cb) => {
    if (parseHeadline) {
      templateKeys = data.toString().split(',');
      parseHeadline = false;
      return cb(null, null);
    }

    const entries = data.toString().split(',');
    const obj = {};

    templateKeys.forEach((el, index) => {
      obj[el] = entries[index];
    });

    return cb(null, obj);
  });
};

const toJSON = () => {
  let objs = [];
  return through2.obj(function(data, enc, cb) {
    objs.push(data);
    cb(null, null);
  }, function(cb) {
    this.push(JSON.stringify(objs));
    cb();
  });
};

fs.createReadStream('test.csv')
.pipe(split())
.pipe(parseCSV())
.pipe(toJSON())
.pipe(process.stdout);