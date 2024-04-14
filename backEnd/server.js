import { readFileSync } from 'node:fs';
import http from 'node:http'

import {data} from './bookData.js'

const server = http.createServer();

server.on('request', (request, res) => {
    if(request.url === '/') {
        res.writeHead(200, {
            'access-control-allow-origin': '*'
        })
        res.write(readFileSync('./frontEnd/index.html'));
        res.end();
        return;
    }

    if(['.html', '.css', '.js'].some(ext => request.url.includes(ext))) {
        res.writeHead(200, {
            'access-control-allow-origin': '*',
            'content-type': {
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.html': 'text/html'
            }[request.url.slice(request.url.lastIndexOf('.'))]
        })
        res.write(readFileSync('./frontEnd/books/' + request.url))
        res.end();
        return;
    }

    if(request.url === '/get-books') {
        res.writeHead(200, {'access-control-allow-origin': '*'});
        res.write(JSON.stringify(data));
        res.end();
        return;
    }
});

server.listen(7000, () => {
    console.log('server listening')
});
