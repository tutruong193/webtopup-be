const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 3001; // Default port is 3000 if PORT is not specified in .env
const app = express();

app.get('/', (req, res) => {
    res.send('hello worldasdasd');
});

app.listen(port, () => {
    console.log('Server is listening on port', port);
});
