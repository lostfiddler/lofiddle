// @ts-check
// @ts-ignore
import {titleCase} from 'https://esm.sh/title-case@4.3.1';
import GetBooks from '../api/GetBooks.js';

/** @typedef {{book: string, chapters: Array<{chapter: string, examples: string[]}>}} Book */

export default async function SidebarChildren() {
    /** @type {Array<Book>} */
    const data = await GetBooks();

    const navigation = document.createElement('div')
    const titleContainer = document.createElement('div')
    const title = document.createElement('h1')
    const nav = document.createElement('ul')

    titleContainer.appendChild(title)
    navigation.append(titleContainer, nav)

    navigation.className = 'navigation';
    nav.className = 'nav';
    titleContainer.className = 'titleContainer'
    title.className = 'title';
    title.textContent = 'Animations';

    createBooksList(data, nav);

    /**
     * @param {Array<Book>} books
     * @param {HTMLUListElement} parentHtmlElement
     */
    function createBooksList(books, parentHtmlElement) {
        for (let i = 0; i < books.length;i++) {
            const book = data[i];
            const book_htmlElement = document.createElement('li');
            const book_titleElement = document.createElement('span')
            book_htmlElement.className = 'book'
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
            const exampleLink_htmlElement = document.createElement('a')

            exampleLink_htmlElement.setAttribute('href', example) 
            exampleLink_htmlElement.textContent = titleCase(
                example.slice(
                    example.lastIndexOf('/') + 1
                ).replace('.js', '').replace(/_/g, ' '));
            exampleLink_htmlElement.addEventListener('click', clickHandler)
            example_htmlElement.appendChild(exampleLink_htmlElement)
            parentHtmlElement.appendChild(example_htmlElement);
        }

        /**
         * @param {Event} event
         */
        function clickHandler(event) {
            event.preventDefault();

            const path = event.target.getAttribute('href')
            // const tail = path.slice(path.lastIndexOf('/'))

            history.pushState(path, '', path.replace(/\//g, '^'));
            const popStateEvent = new PopStateEvent('popstate', {state: path});
            dispatchEvent(popStateEvent);
        }
    }
    return navigation
}
