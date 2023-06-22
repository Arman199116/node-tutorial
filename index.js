const routes = require('./routes.js');
const http = require('http');

const server = http.createServer(routes.requestHandler);

server.listen(3000)