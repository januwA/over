let http = require('http')
let url = require('url')
let server = http.createServer((req, res)=>{
	res.writeHead(200,{"ContentType":"text/json","Access-Control-Allow-Origin":"*"})
	let query = url.parse(req.url,true).query;
	console.log( query)
	res.write('{"success":true,"msg":["aa","bb","cc"]}')
	res.end()
}).listen(1995,()=>{
	console.log('ok...')
});
