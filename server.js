import { readFileSync, readdirSync } from 'node:fs';
import http from 'node:http'

const foundationDir = readdirSync('./foundation', {
    encoding: 'utf8',
    recursive: true
})

function ch() {
    const x = [];
    const ignore = ['.js', '.png'];
    const arr = foundationDir.filter(file => 
        !ignore.some(ext => file.includes(ext))
    )
    const chapters = arr.filter(file => !file.includes('/'));
    chapters.forEach(chap => {
        x.push({chap, arr})
    })
    return x
}

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
