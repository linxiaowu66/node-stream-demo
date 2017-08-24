const fs = require('fs')
const { Transform } = require('stream')

const demoFile = 'test.txt'

class middleware extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(data, encoding, done) {
    // console.log('in middleware: ', data)
    let block
    const lines = data.toString().split(/\n/)

    while (lines.length) {
      block = `${lines.shift()} ++++`
      if (block) {
        this.push(block)
      }
    }

    done()
  }
}
let result = ''
fs.createReadStream(demoFile, { encoding: 'utf8' })
.on('error', () => console.error('read file stream failure'))
.pipe(new middleware({ objectMode: true }))
.on('data', (data) => {
  result += data
})
.on('finish', () => {
  console.log(result)
})
.on('end', () => {
  console.log('read event....', result)
})

