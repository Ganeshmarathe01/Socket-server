const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app=express();
const server = http.createServer(app);
const io= socketIO(server);

io.engine.on("initial_headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:4200";
  });
  
  io.engine.on("headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:4200"; // url to all
  });

app.use(cors({origin: "*"}));

io.on('connection', (socket) => {
    console.log(' user connected');

    socket.on('draw',(data) => {
        io.emit('draw', data);
    });

    socket.on('disconnect',() => {
        console.log('user disconnected');
    });
});

server.listen(3001,()=>{
    console.log('server is listening at 3001')
})
