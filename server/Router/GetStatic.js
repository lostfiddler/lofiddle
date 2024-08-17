import {readFileSync} from 'node:fs'
import {MIMEType} from '../utils.js'

export default function GetStatic(request, res){ 
    const ext = request.url.slice(request.url.lastIndexOf('.'))

    res.setHeader('content-type', MIMEType(ext));

    res.statusCode = 200;

    res.write(readFileSync(
        '../frontEnd/dist' + request.url
    ))

    res.end();
    return;
}
