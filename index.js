// index.js
require("dotenv").config(".env");
const express = require('express');
const ChatRoutes = require('./routes/ChatRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Chat app is live here.');
});

app.use('/api', ChatRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});