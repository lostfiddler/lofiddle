import {readFileSync} from 'node:fs'
import {MIMEType} from '../utils.js'

export default function GetStatic(request, res){ 
    const ext = request.url.slice(request.url.lastIndexOf('.'))

    res.setHeader('content-type', MIMEType(ext))
    res.write(readFileSync('../frontEnd' + request.url))
    res.end();
    return;
}
