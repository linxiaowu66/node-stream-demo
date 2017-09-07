const { Duplex, Writable, Readable } = require('stream');


class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    // ...
  }
  _write(chunk, encoding, callback) {
    console.log('we write: ', chunk)
    callback();
  }

  _read(size) {
    this.push('read method')
    this.push(null)
  }
}

const dp = new MyDuplex({
  readableObjectMode: true
})

console.log(dp instanceof Writable)
console.log(dp instanceof Readable)

dp.on('data', (chunk) => {
  console.log('we read: ', chunk)
})

dp.write('write method', 'utf-8')