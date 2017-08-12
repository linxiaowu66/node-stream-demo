const { Readable } = require('stream')

const rs = new Readable({ highWaterMark: 10 })

rs.on('data', (data) => {
  console.log(data)
})

rs.push('1234567890qaz')
