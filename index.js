const request = require("request")
const zlib = require("zlib")
const fs = require("fs")
const http = require("http")

// headers that will accept gzip file
const headers = {
  "Accept-Encoding": "gzip",
}

const main = async () => {
  try {
    // The function of the line below is that it will write the json result into the output.json file as a stream
    // it will be used again later
    var stream = fs.createWriteStream("output.json")

    // do http request to gz file
    await request({
      url: "http://k.imanga.co/mangakakalot/tags/Most%20Popular/p0.gz",
      headers: headers,
    })
      .pipe(zlib.createGunzip()) // it will unzip gz file
      .pipe(stream) // write the result to the output.json file

    // when the stream finish you can read the output.json,
    // you won't be able to read the file (output.json) when the stream hasn't finished, so you need to
    // wait until it finished
    stream.on("finish", function () {
      const result = require("./output.json")

      // you can show the result in console
      console.log(result)

      // or show it in the page
      //   const port = 8080
      //   const server = http.createServer(function (req, res) {
      //     res.end(JSON.stringify(result))
      //   })
      //   server.listen(port)
      //   console.log(`Listen on port ${port}`)
      //   console.log(`http://localhost:${port}`)
    })
  } catch (error) {}
}

// run the function
main()
