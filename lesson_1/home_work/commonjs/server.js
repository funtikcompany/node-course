const { createServer } = require('node:http');
const data = require('./data.json');
const returnCurrentName = require('./HandlerFunction');

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(returnCurrentName(req.url, data));
});

server.listen(3000);
