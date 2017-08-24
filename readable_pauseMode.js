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

rs.on('readable', () => {
  let chunk;
  while (null !== (chunk = rs.read(5))) {
    console.log('Received bytes of data.', chunk);
  }
})

rs.push('1234567')
rs.push('890abcd')
rs.push('efghijk')

console.log(rs._readableState.buffer)

