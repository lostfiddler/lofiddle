import { readdirSync } from 'node:fs';

const foundationDir = readdirSync('./foundation', {
    encoding: 'utf8',
    recursive: true
})

export default function ch() {
    const x = [];
    const ignore = ['.js', '.png'];
    const arr = foundationDir.filter(file => 
        !ignore.some(ext => file.includes(ext))
    )
    const chapters = arr.filter(file => !file.includes('/'));
    for (let i = 0; i < chapters.length; i++){
        const chap = chapters[i]
        x.push({chap, arr})
    }
    return x
}

console.log(ch())
