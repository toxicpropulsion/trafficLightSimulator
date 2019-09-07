const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.static('build'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.listen(port, () =>
  console.log(`Server started!\nOpen http://localhost:${port} in your browser\n`)
);
