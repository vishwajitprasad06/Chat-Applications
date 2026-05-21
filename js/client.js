const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// Append message function
const append = (message, position) => {

    const messageElement = document.createElement('div');

    messageElement.innerHTML = message;

    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageContainer.append(messageElement);
}

// Ask name
const name = prompt("Enter your name to join");

append(`<strong>${name}</strong> joined the chat`, "right");

// Emit new user
socket.emit("new-user-joined", name);

// If new user joins
socket.on("user-joined", name => {

    socket.on("user-joined", name => {

    append(`<strong>${name}</strong> joined the chat`, 'left');

});

});

// Receive message
socket.on("receive", data => {

    append(`<strong>${data.name}</strong>: ${data.message}`, 'left');


});

// Form submit
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const message = messageInput.value;

    append(`<strong>You</strong>: ${message}`, 'right'); 

    socket.emit('send', message);

    messageInput.value = '';

});
// If a user leaves the chat
socket.on('left', name => {

    append(`${name} left the chat`, 'left');

});