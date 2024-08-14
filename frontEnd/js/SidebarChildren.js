// @ts-check
// @ts-ignore
import {titleCase} from 'https://esm.sh/title-case@4.3.1'
import render from './render.js'

/** @typedef {{book: string, chapters: Array<{chapter: string, examples: string[]}>}} Book */

const res = await fetch('/get-books');
/** @type {Array<Book>} */
const data = await res.json();

export default function SidebarChildren(panel, header, menu, menuButton) {
    panel.append(header, menu);
    const heading = document.createElement('span');
    heading.className = 'heading';
    heading.textContent = 'Animations';
    header.append(menuButton, heading)

    createBooksList(data, menu);

    /**
     * @param {Array<Book>} books
     * @param {HTMLMenuElement} parentHtmlElement
     */
    function createBooksList(books, parentHtmlElement) {
        for (let i = 0; i < books.length;i++) {
            const book = data[i];
            const book_htmlElement = document.createElement('li');
            const book_titleElement = document.createElement('span')
            book_titleElement.className = 'bookTitle';

            book_titleElement.textContent = titleCase(book.book.replace(/_/g, ' '));
            book_htmlElement.appendChild(book_titleElement);
            parentHtmlElement.appendChild(book_htmlElement);

            createChaptersList(book.chapters, book_htmlElement);
        }
    }

    /**
     * @param {Array<{chapter: string, examples: Array<string>}>} chapters
     * @param {HTMLLIElement} parentHtmlElement
     */
    function createChaptersList(chapters, parentHtmlElement) {
        for (let i = 0; i < chapters.length;i++) {
            const chapter = chapters[i];
            const chapter_htmlElement = document.createElement('ul');
            const chapter_titleElement = document.createElement('li')
            chapter_titleElement.className = 'chapterTitle';

            chapter_titleElement.textContent = titleCase(chapter.chapter.replace(/_/g, ' '));
            chapter_htmlElement.appendChild(chapter_titleElement)
            parentHtmlElement.appendChild(chapter_htmlElement);

            createExamplesList(chapter.examples, chapter_htmlElement);
        }
    }

    /** 
     * @param {Array<string>} examples
     * @param {HTMLUListElement} parentHtmlElement
     */
    function createExamplesList(examples, parentHtmlElement) {
        for (let i = 0; i < examples.length;i++) {
            const example = examples[i];
            const example_htmlElement = document.createElement('li');
            const link_htmlElement = document.createElement('a')

            link_htmlElement.href = example;
            link_htmlElement.textContent = titleCase(example.slice(example.lastIndexOf('/') + 1).replace('.js', '').replace(/_/g, ' '));
            link_htmlElement.addEventListener('click', clickHandler)
            example_htmlElement.appendChild(link_htmlElement);
            parentHtmlElement.appendChild(example_htmlElement);
        }

        /**
         * @param {Event} event
         */
        function clickHandler(event) {
            event.preventDefault();
            render({request: event.target.href});
        }
    }
    return panel;
}
