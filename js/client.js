const socket = io("https://chat-applications-xpnb.onrender.com");

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
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Ask user name
let name = prompt("Enter your name to join");

if (!name || name.trim() === "") {
    name = "Guest";
}

append(`<strong>${name}</strong> joined the chat`, "right");

// Connect user
socket.emit("new-user-joined", name);

// User joined
socket.on("user-joined", name => {
    append(`<strong>${name}</strong> joined the chat`, 'left');
});

// Receive message
socket.on("receive", data => {
    append(`<strong>${data.name}</strong>: ${data.message}`, 'left');
});

// Send message
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();

    if (message === "") return;

    append(`<strong>You</strong>: ${message}`, 'right');

    socket.emit('send', message);

    messageInput.value = '';
});

// User left
socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});

// Connection check
socket.on("connect", () => {
    console.log("Connected to server");
});
