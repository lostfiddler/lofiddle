import {readFileSync} from 'node:fs'

export default function GetIndex(_request, res) {
    res.writeHead(200, {
        'access-control-allow-origin': '*'
    })
    res.write(readFileSync('../frontEnd/index.html', 'utf8'));
    res.end();
    return;
}
