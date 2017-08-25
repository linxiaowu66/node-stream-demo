const fs = require('fs')
const { Readable } = require('stream')

const rs = fs.createReadStream('test1.txt', { highWaterMark: 10 })

rs.on('readable', () => {
  console.log('trigger readable event')
  console.log(rs._readableState.buffer)
  setTimeout(() => {
    console.log('read bytes: ', rs.read(8))
  }, 5000)
})
