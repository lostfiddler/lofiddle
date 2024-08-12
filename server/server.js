import http from 'node:http';
import routes from './routes.js';

const server = http.createServer();

server.on('request', (request, res) => {
    routes({ request, res });
});

server.listen(7000, () => {
    console.log('server listening')
});
