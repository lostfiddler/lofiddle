import { readFileSync } from 'node:fs';
import http from 'node:http'

import chapters from './makeData.js' 

const Books = [
    {
        "book": "Foundation HTML5 for Animation",
        "chapters": chapters()
    }
]

console.log(JSON.stringify(Books));

const server = http.createServer();

server.on('request', (request, res) => {
    if(request.url === '/get-books') {
        res.writeHead(200, {'access-control-allow-origin': '*'});
        res.write(JSON.stringify(Books));
        res.end();
        return;
    }

    res.writeHead(200, {
        'access-control-allow-origin': '*'
    })
    res.write(readFileSync('./index.html'));
    res.end();
});

server.listen(7000, () => {
    console.log('server listening')
});
