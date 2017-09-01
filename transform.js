const { Transform } = require('stream')

class myTransform extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, done) {
    const upperChunk = chunk.toString().toUpperCase()
    this.push(upperChunk)
    done()
  }
  _flush(cb){
    /* at the end, output the our additional info */
    this.push('this is flush data\n')
    cb(null, 'appending more data\n')
  }
}

const tss = new myTransform()

tss.pipe(process.stdout)
tss.write('hello transform stream\n')
tss.write('another line\n')
tss.end()

