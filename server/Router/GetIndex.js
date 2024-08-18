import {readFileSync} from 'node:fs'

export default function GetIndex(_request, res) {
    res.statusCode = 200

    res.write(readFileSync(
        process.env.ENV === 'dev' ? 
        '../frontEnd/index.html' :
        '../frontEnd/dist/index.html'
        , 'utf8'));

    res.end();

    return;
}
