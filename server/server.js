import http from 'node:http';
import routes from './Router/index.js';

const server = http.createServer();

server.on('request', (request, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-AllowMethods', 'GET, POST, PUT, DELETE, OPTIONS');

    res.setHeader('Access-Control-Allow-Headders', 'Content-Type, Authorization');

    if (request.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }
    routes({ request, res });
});

server.listen(7000, () => {
    console.log('server listening')
});
