let http = require('http')
const qs = require("querystring")
const fs = require("fs")
const path = require('path')
var os = require('os');


let saveImg = (savePath, saveName, suju, res)=>{

	fs.writeFile(savePath + saveName , suju, (err)=>{
		if(err){
			console.log('-----------------------')
		}else{

			let path = savePath.replace(/\\/g, '/');
			res.write('{"success":true,"msg":"'+ path + saveName +'"}')
			res.end()
			
		}

		
	})
	
}


http.createServer( (req, res)=>{
	res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"})
	if( req.method.toUpperCase() == "POST" ){
		let reply="";

		req.on("data", (chunk)=>{
			reply += chunk; // 获取全部数据
		})

		req.on("end",()=>{
			let query = qs.parse( reply );
			let suju = query.suju// 拿到 base64
			// suju = suju.replace(/data\:image\/jpeg;base64,/, '')
			suju = suju.replace(/\w.+\:\w.+\/\w.+;\w.+,/, '')
			let timer = new Date().getTime()
			let sujuBuffer = Buffer.from( suju, 'base64' );
			let lsdir = path.join( __dirname );
			let name = timer+'.png'
			let savePath =path.join(lsdir, 'images\\');

			let direxis = fs.existsSync(savePath);
			/**
			 * [if description] 文件夹存在直接保存，不存在创建保存
			 * @param  {[type]} direxis [description]
			 * @return {[type]}         [description]
			 */
			if( direxis ){
				saveImg(savePath ,name, sujuBuffer, res);
	
			}else{
				fs.mkdirSync(savePath);
				saveImg(savePath , name, sujuBuffer, res);
			}

			
		});
	}
} ).listen(1995, ()=>{
	console.log('ok....' )
})