import { readFileSync } from 'node:fs';
import http from 'node:http'

import ch from './makeData.js' 

console.log(ch())

const Books = [
    {
        title: "Foundation HTML5 for Animation",
        chapters: ''
        //examples: foundationDir.filter(file => file.includes('.html'))
    }
]

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
