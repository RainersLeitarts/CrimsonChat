const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const app = express()

app.use(cors)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', (socket) => {
    console.log(`New Client Connected: ${socket.id}`)

    socket.on('send_msg', (data) => {
        console.log(data)
        socket.broadcast.emit('receive_msg', data)
    })
})

server.listen(3001, () => {
    console.log('Server ready at PORT 3001')
})