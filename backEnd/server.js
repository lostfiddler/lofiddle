// TODO vite
import http from 'node:http';
import routes from './routes.js';

function myMiddleware() {
    console.log('buzz')
}

const server = http.createServer(myMiddleware);

server.on('request', (request, res) => {
    routes({ request, res });
});

server.listen(7000, () => {
    console.log('server listening')
});
