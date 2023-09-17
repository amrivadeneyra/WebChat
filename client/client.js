/**
 * Conexión al servidor usando Socket.IO
 */
const socket = io.connect('http://localhost:3000');

/**
 * Está a la espera de los mensajes del servidor
 */
socket.on('mensajeServidor', (mensaje) => {
    mostrarMensaje(mensaje, 'mensaje-servidor');
});

/**
 * Enviar mensaje al servidor
 */
function enviarMensaje() {
    const mensaje = document.getElementById('mensaje').value;
    mostrarMensaje(mensaje, 'mensaje-cliente');
    socket.emit('mensajeCliente', mensaje);
    document.getElementById('mensaje').value = '';
}

/**
 * Crea contenedores y muestra los mensajes dentro del chat
 * @param {*} mensaje 
 * @param {*} clase 
 */
function mostrarMensaje(mensaje, clase) {
    const chatContainer = document.getElementById('chat');
    const mensajeElement = document.createElement('div');
    mensajeElement.classList.add('mensaje', clase);
    mensajeElement.textContent = mensaje;
    chatContainer.appendChild(mensajeElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Envia mensaje al presionar la tecla Enter
 */
document.getElementById('mensaje').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        enviarMensaje();
    }
});
