const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const PORT = process.env.PORT || 8000;

// Home Route
app.get('/', (req, res) => {
    res.send("Chat server is running");
});

const users = {};

io.on("connection", socket => {

    console.log("User connected");

    socket.on("new-user-joined", name => {

        users[socket.id] = name;

        socket.broadcast.emit("user-joined", name);

    });

    socket.on("send", message => {

        socket.broadcast.emit("receive", {
            message: message,
            name: users[socket.id]
        });

    });

    socket.on("disconnect", () => {

        socket.broadcast.emit("left", users[socket.id]);

        delete users[socket.id];

    });

});

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});

app.get("/", (req, res) => {
    res.send("Chat App Server is Running 🚀");
});
