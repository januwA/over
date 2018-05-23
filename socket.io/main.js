var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**
 * 监听socket链接接口
 * 有人进入，就在控制台打印
 * ! 需要在前端加载 io()
 */
io.on('connection', socket => {
  console.log('a user connected');

  // 有人离开了
  socket.on('disconnect', () => {
    console.log('user disconnect...');
  })

  // 监听前端发来的消息 
  socket.on('chat message', msg => {
    console.log('前端发来的信息:' + msg);
      io.emit('chat message', msg)
  })

  // 服务器发送给用户消息
  io.emit('update server', {
    msg: '系统将在晚上8点维护.'
  })
});


http.listen(3000, function () {
  console.log('listening on *:3000');
});