const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const util = require('util');
const readFile = util.promisify(fs.readFile);
/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = async (name) => {
  const assetPath = path.join(__dirname, 'assets', name);
  return await readFile(assetPath, {encoding: 'utf-8'});
}

const hostname = '127.0.0.1'
const port = 3000

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  // this is sloppy, especially with more assets, create a "router"
  try {
    const asset = await findAsset(route === '/' ? 'index.html' : route);
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(asset)
    logRequest(method, route, 200)
  }
  catch (e) {
    // missing asset should not cause server crash
    res.writeHead(400, {'Content-Type': 'text/html'})
    res.write('erroooou')
    logRequest(method, route, 404)
  }
  res.end()
  // most important part, send down the asset
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
