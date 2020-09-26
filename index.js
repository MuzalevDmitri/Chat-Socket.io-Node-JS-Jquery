let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io').listen(server)

server.listen(3001)

app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/index.html')
})

users = []
connections = []

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('подключение')

 socket.on('disconnect', function(data) {
     connections.splice(connections.indexOf(socket),1)
     console.log('отключение')

 })
socket.on('send mess', function(data) {
    io.sockets.emit('add mess', {mess:data.mess, name: data.name, className: data.className})
})



})