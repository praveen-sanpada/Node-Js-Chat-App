require("dotenv").config(".env");
const express = require('express');
const cors = require('cors');
const ChatRoutes = require('./routes/ChatRoutes');
const http = require('http');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(server, {
    maxHttpBufferSize: 5 * 1024 * 1024,
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
        credentials: true
    }
});

console.log("Socket.io server initialized");

io.on('connection', (socket) => {
    console.log('User connected to socket.');

    socket.on('user_chat', async function (data) {
        var user_id = data.user_id;
        var room = `user_chat_${user_id}`;
        socket.join(room);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from socket.');
    });

});

app.get('/', (req, res) => {
    res.send('Chat app is live here.');
});

app.use('/api', ChatRoutes(io));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
