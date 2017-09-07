const { Readable } = require('stream')

class MyReadable extends Readable {
  constructor(options) {
    // Calls the stream.Readable(options) constructor
    super(options);
  }
  _read(size) {

  }
}

const rs = new MyReadable({ highWaterMark: 20, encoding: 'utf8' })

rs.on('readable', () => {
  const chunk = rs.read(50)
  console.log('hwm has changed!', rs._readableState.highWaterMark)
  console.log(chunk)
})
console.log('hwm must be equal to 20!', rs._readableState.highWaterMark)
rs.push('1234567')
const r1 = rs.push('890abcd')
const r2 = rs.push('efghijk')

console.log(`r1=${r1}, r2=${r2}`)

const r3 = rs.push("lmnopqr")

console.log(`r3=${r3}`)