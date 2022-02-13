var http = require('http')

var server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/plain'})
    res.write('hello nodejs' + JSON.stringify(server))
    res.end()
}).listen(3000)