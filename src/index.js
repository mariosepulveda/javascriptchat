const http = require('http');
const path = require('path');

const express = require('express');
const socketIO = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require('./sockets')(io);

//contenido statico de la app
//console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')));


//levantando el servidor, escucha en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});