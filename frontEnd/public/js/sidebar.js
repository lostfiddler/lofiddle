import {titleCase} from 'https://esm.sh/title-case@4.3.1';
import render from './render.js';

/** @typedef {{book: string, chapters: Array<{chapter: string, examples: string[]}>}} Book */

const res = await fetch('/get-books');
/** @type {Array<Book>} */
const data = await res.json();

class SidebarElement extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this._updateRendering();
    }

    _updateRendering() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({mode: 'open'});
        const menu = this.createMenuElements();
        const style = document.createElement('style')

        // TODO - mobile styling
        style.textContent = `
            :host {
                --width: 23%;
                --padding: 1rem;
                width: calc(var(--width) + calc(var(--padding) * 2));
            }
            h1 {
                font-size: 1.4rem;
            }
            a {
                text-decoration: none;
            }
            menu {
                position: fixed;
                width: var(--width);
                background: #222;
                height: 100%;
                margin: 0;
                padding: var(--padding);
                list-style-type: none;
            }
            ul {
                padding-left: 1rem;
                list-style-type: none;
            }
        `

        shadow.append(style, menu)
    }

    createMenuElements() {
        const menu = document.createElement('menu');

        createBooksList(data, menu);

        /**
         * @param {Array<Book>} books
         * @param {HTMLMenuElement} parentHtmlElement
         */
        function createBooksList(books, parentHtmlElement) {
            for (let i = 0; i < books.length;i++) {
                const book = data[i];
                const book_htmlElement = document.createElement('li');
                const book_h1Element = document.createElement('h1');

                book_h1Element.textContent = titleCase(book.book.replace(/_/g, ' '));
                book_htmlElement.appendChild(book_h1Element);
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

                chapter_htmlElement.textContent = titleCase(chapter.chapter.replace(/_/g, ' '));
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
                link_htmlElement.textContent = example.slice(example.lastIndexOf('/') + 1).replace('.js', '').replace(/_/g, ' ');
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
        return menu;
    }
};

customElements.define('sidebar-element', SidebarElement);
