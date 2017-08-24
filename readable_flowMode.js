const { Readable } = require('stream')

class MyReadable extends Readable {
  constructor(options) {
    // Calls the stream.Readable(options) constructor
    super(options);
  }
  _read(size) {

  }
}

const rs = new MyReadable()
// const rs = new MyReadable({ objectMode: true })

rs.on('data', (data) => {
  console.log('Received data: ', data)
})

rs.push('1234567')

setTimeout(() => {
  rs.push('890abcd')
}, 1000)

setTimeout(() => {
  rs.push('efghijk')
}, 2000)

console.log(rs._readableState.buffer)

