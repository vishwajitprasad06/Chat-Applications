const socket = io("https://chat-applications-xpnb.onrender.com");

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name to join");

append(`<strong>${name}</strong> joined the chat`, "right");

socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    append(`<strong>${name}</strong> joined the chat`, 'left');
});

socket.on("receive", data => {
    append(`<strong>${data.name}</strong>: ${data.message}`, 'left');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;

    append(`<strong>You</strong>: ${message}`, 'right');

    socket.emit('send', message);

    messageInput.value = '';
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});
