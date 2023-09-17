// Implementado los módulos necesarios para el WebSocket
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const readline = require('readline');

/**
 * Configurando Express y Socket.IO
 */
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

/**
 * Pequeña interfaz para leer mensajes desde la consola
 */
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Puerto en el cual corre nuestro servidor
 */
const PORT = process.env.PORT || 3000;

/**
 * Ruta estatica para leer los archivos del cliente
 */
app.use(express.static(path.join(__dirname, '/client')));

/**
 * Ruta principal
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

/**
 * Manejo de una conexión con Socket.IO
 */
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    //Recibir los mensajes del cliente y emitirlo
    socket.on('mensajeCliente', (mensaje) => {
        console.log(`Cliente: ${mensaje}`);
        socket.broadcast.emit('mensajeServidor', mensaje);
    });
});

/**
 * Leer mensaje desde la consola y emitir mensajes al cliente
 */
readLine.on('line', (input) => {
    io.emit('mensajeServidor', input);
});

/**
 * Inicia el servidor
 */
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
