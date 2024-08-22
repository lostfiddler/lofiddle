// @ts-check
// @ts-ignore
import {titleCase} from 'https://esm.sh/title-case@4.3.1'
import GetBooks from '../api/GetBooks.js'

/** @typedef {{book: string, chapters: Array<{chapter: string, examples: string[]}>}} Book */


export default async function SidebarChildren(state, panel, header, menu, menuButton) {
    /** @type {Array<Book>} */
    const data = await GetBooks();
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

            example_htmlElement.setAttribute('href', example) 
            example_htmlElement.textContent = titleCase(example.slice(example.lastIndexOf('/') + 1).replace('.js', '').replace(/_/g, ' '));
            example_htmlElement.addEventListener('click', clickHandler)
            parentHtmlElement.appendChild(example_htmlElement);
        }

        /**
         * @param {Event} event
         */
        function clickHandler(event) {
            event.preventDefault();

            const href = event.target.getAttribute('href')
            const tail = href.slice(href.lastIndexOf('/'))

            history.pushState(null, '', tail)
            const popStateEvent = new PopStateEvent('popstate', {state: 'foo'});
            dispatchEvent(popStateEvent)
        }
    }
    return panel;
}
