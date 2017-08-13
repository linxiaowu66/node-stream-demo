var Readable = require('stream').Readable;
var fs = require('fs')
var rs = Readable({ highWaterMark: 2 });

rs._read = function (size) {
  console.log('read', size)
};
rs.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
})
let res = rs.push('0123456789abc');
console.log('---res:', res)
res = rs.push('defghijk')
console.log('+++++res: ', res)



// process.on('exit', function () {
//     console.error('\n_read() called ' + (c - 97) + ' times');
// });
// process.stdout.on('error', process.exit);