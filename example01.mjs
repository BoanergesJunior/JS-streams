
// ########################################################
// write file as stream with fs module
// import http from 'http'
// import { readFileSync, createReadStream } from 'fs'

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// http.createServer((req, res) => {
// const file = readFileSync('big.file')
// res.write(file)
// res.end()

//   createReadStream('big.file')
//   .pipe(res)

// }).listen(3000, () => console.log('running at 3000'))
// ########################################################

// stream with socket
// import net from 'net'

// node -e "process.stdin.pipe(require('net').connect(1338))"
// net.createServer(socket => socket.pipe(process.stdout)).listen(1338)