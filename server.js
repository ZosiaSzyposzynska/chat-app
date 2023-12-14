const express = require('express');
const app = express();
const path = require('path');

const messages = [];

app.use(express.static('client'));
app.use(express.json()); 

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(8000, () => {
  console.log('Serwer API działa na porcie 8000');
});
