import { pipeline, Readable, Writable, Transform } from 'stream'
import { promisify } from 'util'
import { createWriteStream } from 'fs'

const pipelineAsync = promisify(pipeline)

{
  const readableStream = Readable({
    read: function () {
      this.push("Hello world!0")
      this.push("Hello world!1")
      this.push("Hello world!2")
      this.push(null)
    }
  })

  const writeblaStream = Writable({
    write(chunk, encoding, cb) {
      console.log('msg', chunk.toString())
      cb()
    }
  })

  await pipelineAsync(
    readableStream,
    // process.stdout
    writeblaStream
  )

  console.log('process 01 end')
}

{
  const readableStream = Readable({
    read() {
      for (let index = 0; index < 1e5; index++) {
        const person = { id: Date.now() + index, name: `B.O-${index}` }
        const data = JSON.stringify(person)
        this.push(data)
      }
      // end datas
      this.push(null)
    }
  })

  const writebleMapToCSV = Transform({
    transform(chunk, encoding, cb) {
      const data = JSON.parse(chunk)
      const result = `${data.id}, ${data.name.toUpperCase()}\n`

      cb(null, result)
    }
  })

  const setHeader = Transform({
    transform(chunk, encoding, cb) {
      this.counter = this.counter ?? 0

      if (this.counter) {
        return cb(null, chunk)
      }

      this.counter += 1

      return cb(null, "id,name\n".concat(chunk))
    }
  })

  await pipelineAsync(
    readableStream,
    writebleMapToCSV,
    setHeader,
    // process.stdout,
    createWriteStream('my.csv')
  )
}