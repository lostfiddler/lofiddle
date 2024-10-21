import {readdirSync} from 'node:fs'

export default function GetBooksMetaData(_request, res) {
    res.statusCode = 200;

    res.write(JSON.stringify(BooksMetaData()));

    res.end();
    return;
}

const books = readdirSync('../frontEnd/articles', {
    encoding: 'utf8',
    recursive: true
})

function BooksMetaData() {
    const data = [];
    const ignore = ['images', '.png', '.md', 'utils', 'misc', 'node_modules', 'package'];

    let chapter = {chapter: '', examples: []};
    let book = {book: '', chapters: []};

    for(let i = 0; i < books.length; i++) {
        const file = books[i];

        if (ignore.some(ext => file.includes(ext))) continue;

        // root dir corresponds to book, push to data array, clear book variable
        if(!file.includes('/')) {
            book.book = file;
            data.push(book); 
            book = {book: '', chapters: []};
            continue;
        }

        // sub dir corresponds to chapter, search data array for corresponding book,
        // push to book.chapters array, clear chapter variable
        if(file.includes('/') && !file.includes('.')) {
            const sep = file.indexOf('/');

            chapter.chapter = file.slice(sep + 1);
            data[data.findIndex(obj => file.includes(obj.book))].chapters.push(chapter);
            chapter = {chapter: '', examples: []};
            continue;
        }
        // search for corresponding book, access its chapters[] symbol,
        // search chapters[] for corresponding chapter, push file to its examples[]
        const cha = data[data.findIndex(obj => file.includes(obj.book))].chapters
        cha[cha.findIndex(obj => file.includes(obj.chapter))].examples.push(file)
    }

    return data; 
}
