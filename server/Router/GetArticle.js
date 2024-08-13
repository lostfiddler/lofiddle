import {readFileSync} from 'node:fs'
import {MIMEType} from '../utils.js'

export default function GetArticle(request, res) {

    const ext = request.url.slice(request.url.lastIndexOf('.'))

    res.writeHead(200, {
        'access-control-allow-origin': '*',
        'content-type': MIMEType(ext)
    })
    res.write(readFileSync('../frontEnd/data' + request.url))
    res.end();
    return;
}
