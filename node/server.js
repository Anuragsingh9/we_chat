const path = require('path');
const http =require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../public')));

const users = {};

io.on('connection', socket =>{
    console.log('established');
    
    socket.on('new-user',username =>{
        users[socket.id] = username;
        socket.broadcast.emit('new-joined',username);
    });

    // socket.emit('message','Welcome to WeChat');

    // socket.broadcast.emit('message','A user has joined the chat');

    socket.on('disconnect',() =>{
        socket.broadcast.emit('user-left',users[socket.id]);
    });

    socket.on('chat-message',msg =>{
        socket.broadcast.emit('send-message',{message:msg, user:users[socket.id]});
    });

    // socket.on('chat-message',msg =>{
    //     console.log('okkk');
    //     io.emit('recieve-message',msg);
    // });
});

const PORT = 3000;

server.listen(PORT, () => console.log(`server running on ${PORT}`));
