const { Readable } = require('stream')

class MyWritable extends Readable {
  constructor(options) {
    // Calls the stream.Readable(options) constructor
    super(options);
  }
  _write(size) {

  }
}

const ws = new MyWritable()

console.log(ws)