let http = require('http')
const qs = require("querystring")
const fs = require('fs')

http.createServer((req, res)=>{
	res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"})
	if( req.method.toUpperCase() === "POST" ){
		let data = ''
		req.on('data',(chunk)=>{
			data += chunk;
		});
		req.on('end',()=>{
			data = qs.parse( data );

			let suju = data.suju;
			let name = data.name

			let sujuBuffer = new Buffer( suju, 'base64' );
			fs.writeFile(name, sujuBuffer, (err)=>{
				if(err){
					console.log( err)
				}else{
					res.write('{"success":true,"msg":'+ "保存图片成功"+'}')
				}
			})
			
			res.end()
		})
	}
	
}).listen(1995,()=>{
	console.log('ok...')
})