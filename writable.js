const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Readable(options) constructor
    super(options);
  }
  _write(chunk, encoding, callback) {
    console.log('-------', chunk)
    // callback()
  }
}

const ws = new MyWritable()
// const ws = new MyWritable({ objectMode: true })
// const ws = new MyWritable({ highWaterMark: 5 })

console.log('writable stream: ', ws)

const ws1 = ws.write('abcdefgh')

console.log('writable stream: ', ws)
console.log('write buffer return value:', ws1)
console.log(ws._writableState.getBuffer())

const ws2 = ws.write('ijk')

console.log('writable stream: ', ws)
console.log('write buffer return value:', ws2)
console.log(ws._writableState.getBuffer())

const ws3 = ws.write('opq')

console.log('writable stream: ', ws)
console.log('write buffer return value:', ws3)
console.log(ws._writableState.getBuffer())