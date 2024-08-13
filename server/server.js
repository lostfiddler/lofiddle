import http from 'node:http';
import routes from './Router/index.js';

const server = http.createServer();

server.on('request', (request, res) => {
    routes({ request, res });
});

server.listen(7000, () => {
    console.log('server listening')
});
