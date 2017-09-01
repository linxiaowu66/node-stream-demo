const request = require('request-promise');
const oss = require('ali-oss')
const co = require('co')

const store = oss({
  accessKeyId: 'UEHev336kKjrohZC',
  accessKeySecret: 'sYssMmpsAmfgf06zQe4QZCRlmoDnHz',
  bucket: 'node-stream-test',
  region: 'oss-cn-hangzhou'
})

function uploadToOss() {
  const timestamp = Date.now()
  try {
    request({
      url: 'http://node-stream-test.oss-cn-hangzhou.aliyuncs.com/apic14052.jpg',
      method: 'GET'
    })
    .then(resp => {
      co(function* () {
        return yield store.put(`apic_${timestamp}.png`,
        new Buffer(resp)
        )
      })
      .then(val => {
        console.log(val)
      })
    })
  } catch (err) {
    console.log(err)
  }
}

uploadToOss()