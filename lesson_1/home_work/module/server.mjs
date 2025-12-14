// server.mjs
import { createServer } from 'node:http';
import data from './data.json' with { type: 'json' };
import { returnCurrentName } from './HandlerFunction/index.js';
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(returnCurrentName(req.url, data));
});

server.listen(3001, () => {
  // console.log('Server is running on http://localhost:3000');
});

