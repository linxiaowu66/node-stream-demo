const request = require('request-promise');
const oss = require('ali-oss')
const co = require('co')
const stream = require('stream')

const store = oss({
  accessKeyId: 'UEHev336kKjrohZC',
  accessKeySecret: 'sYssMmpsAmfgf06zQe4QZCRlmoDnHz',
  bucket: 'node-stream-test',
  region: 'oss-cn-hangzhou'
})

class HungryStream extends stream.Duplex {
  constructor(options) {
    super(options);
    this.waiting = false;
  }

  _write(chunk, encoding, callback) {
    this.waiting = false;
    this.push(`\u001b[32m${chunk}\u001b[39m`);
    callback();
  }

  _read(size) {
    if (!this.waiting) {
      this.push('Feed me data! > ');
      this.waiting = true;
    }
  }
}

function uploadToOss() {
  const timestamp = Date.now()
  try {
    request({
      url: 'http://node-stream-test.oss-cn-hangzhou.aliyuncs.com/apic14052.jpg',
      method: 'GET'
    })
    // .then(resp => {
    //   co(function* () {
    //     return yield store.put(`apic_${timestamp}.png`,
    //     new Buffer(resp)
    //     )
    //   })
    //   .then(val => {
    //     console.log(val)
    //   })
    // })
  } catch (err) {
    console.log(err)
  }
}

uploadToOss()