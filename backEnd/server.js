import { readFileSync } from 'node:fs';
import http from 'node:http'

import {data} from './bookData.js'

const server = http.createServer();

server.on('request', (request, res) => {
    if(request.url === '/') {
        res.writeHead(200, {
            'access-control-allow-origin': '*'
        })
        res.write(readFileSync('./frontEnd/index.html', 'utf8'));
        res.end();
        return;
    }

    if(['HTM5_Canvas', 'foundation_html5_for_animation', 'nature_of_code'].some(boook => request.url.includes(boook))) {
        res.writeHead(200, {
            'access-control-allow-origin': '*',
            'content-type': {
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.html': 'text/html',
                '.png': 'image/png'
            }[request.url.slice(request.url.lastIndexOf('.'))]
        })
        res.write(readFileSync('./frontEnd/books' + request.url))
        res.end();
        return;
    }

    if(['.html', '.css', '.js', '.png'].some(ext => request.url.includes(ext))) {
        res.writeHead(200, {
            'access-control-allow-origin': '*',
            'content-type': {
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.html': 'text/html',
                '.png': 'image/png'
            }[request.url.slice(request.url.lastIndexOf('.'))]
        })
        res.write(readFileSync('./frontEnd' + request.url))
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
