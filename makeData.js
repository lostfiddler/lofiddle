import { readdirSync } from 'node:fs';

const foundationDir = readdirSync('./foundation', {
    encoding: 'utf8',
    recursive: true
})

export default function chapters() {
    const data = []
    const ignore = ['.js', '.png'];
    let chapter = {chapter: '', examples: []};

    for(let i = 0; i < foundationDir.length; i++) {
        const file = foundationDir[i];

        if (ignore.some(ext => file.includes(ext))) continue;
        
        // if file is a dir(chapter) -> push object to data array -> re-assign chapter variable to empty template obj
        if (!file.includes('/')) {
            chapter.chapter = file;   data.push(chapter);     chapter = {chapter: '', examples:[]};
            continue;
        }

        data[data.findIndex(obj => file.includes(obj.chapter))].examples.push(file)
    }
    return data;
}
