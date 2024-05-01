import {titleCase} from "https://esm.sh/title-case@4.3.1"

const res = await fetch('/get-books');
const data = await res.json();

const sidebar = document.querySelector('#sidebar');

// sidebar
for (let i = 0; i < data.length; i++) {
    const book = data[i];
    const container = document.createElement('div');
    const header = document.createElement('h1');

    header.textContent = titleCase(book.book.replace(/_/g, ' '))

    container.className = 'book';
    container.appendChild(header);
    sidebar.appendChild(container);

    for (let j = 0; j < book.chapters.length; j++) {
        const chapter = book.chapters[j];
        const list = document.createElement('ul');
        const header2 = document.createElement('h2');
        console.log(`${book.book}/${chapter.chapter}`)

        header2.textContent = titleCase(chapter.chapter.replace(/_/g, ' '));
        container.appendChild(header2);

        for (let k = 0; k < chapter.examples.length; k++) {
            const example = chapter.examples[k];
            const item = document.createElement('li');
            const link = document.createElement('a');

            link.href = example;
            link.onclick = (e) => {
                e.preventDefault();
                foo(e);
            } 
            link.textContent = example.slice(example.lastIndexOf('/') + 1).replace('.js', '').replace(/_/g, ' ');

            item.appendChild(link);
            list.appendChild(item);
        }
        container.appendChild(list);
    }
}

async function foo(e) {
    document.querySelector('main').replaceChildren();
    const module = await import(e.target.href)
    module.default()
    Prism.highlightAll()
}
