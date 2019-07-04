const net = require('net')

net.createServer(socket => {
  console.log('Hello')
  socket.on('data', function(data){
    console.log('Echoing: %s', data.toString())
    socket.write(data.toString())
  })
}).listen(8081, '127.0.0.1')
