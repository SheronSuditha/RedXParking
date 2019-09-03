const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    console.log("Running server on port 3000")
})


