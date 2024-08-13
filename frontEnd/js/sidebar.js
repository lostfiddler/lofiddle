// @ts-check

// @ts-ignore
import {titleCase} from 'https://esm.sh/title-case@4.3.1';
import render from './render.js';

/** @typedef {{book: string, chapters: Array<{chapter: string, examples: string[]}>}} Book */

const res = await fetch('/get-books');
/** @type {Array<Book>} */
const data = await res.json();

class SidebarElement extends HTMLElement{
    constructor() {
        super();
        this.panel = document.createElement('div'), this.panel.className = 'panel';
        this.menu = document.createElement('menu');
        this.header = document.createElement('div'), this.header.className = 'header';
        this.icon = document.createElement('img');
    }

    connectedCallback() {
        this._updateRendering();
    }

    _updateRendering() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({mode: 'open'});

        shadow.append(this.styling(), this.createChildren())
    }

    menuIcon() {
        const host = this
        const panel = this.panel;
        const menu = this.menu;
        this.icon.alt = 'menu icon';
        this.icon.src = '../images/menu-icon.svg';
        this.icon.width = 36;
        this.icon.addEventListener('click', clickHandler);

        /** @param {Event} e */
        function clickHandler(e) {
            host.classList.toggle('open');
            panel.classList.toggle('open')
            menu.classList.toggle('open');
            e.stopPropagation();

            window.addEventListener('click', (_e) => {
                host.classList.toggle('open');
                panel.classList.toggle('open');
                menu.classList.toggle('open');
            }, {once: true});
        }

        return this.icon;
    }

    createChildren() {
        this.panel.append(this.header, this.menu);
        const heading = document.createElement('span');
        heading.className = 'heading';
        heading.textContent = 'Animations';
        this.header.append(this.menuIcon(), heading)

        createBooksList(data, this.menu);

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
        return this.panel;
    }

    styling() {
        const style = document.createElement('style')

        // TODO - mobile styling
        style.textContent = `
            :host {
                width: 300px;
                margin-right: 1rem;
            }
            a {
                text-decoration: none;
                color: inherit;
            }
            a:hover {
                color: #049EF4;
            }
            .panel {
                position: fixed;
                width: inherit;
                padding-left: 1rem;
                height: 100%;
                background: #222;
            }
            .header {
                margin-left: -1rem;
                padding: 0.5rem 0;
                background: #1565c0;
                > .heading {
                    font-size: 1.4rem;
                    padding-left: 1rem;
                }
            }
            menu {
                padding: 0;
                list-style-type: none;
            }
            ul {
                padding: 0;
                list-style-type: none;
            }
            li {
                margin: 1px 0;
            }
            .bookTitle {
                font-size: 1.2rem;
                color: #049EF4;
            }
            .chapterTitle {
                font-weight: 900;
            }
            img {
                display: none;
                filter: brightness(0) saturate(100%) invert(100%) sepia(68%) saturate(0%) hue-rotate(67deg) brightness(114%) contrast(101%);
            }
        `
        style.textContent += `
            @media screen and (max-width: 768px) {
                :host {
                    display: inherit;
                    position: sticky;
                    top: 0;
                    width: inherit;
                }
                .panel {
                    position: relative;
                    height: inherit;
                    width: 100%;
                    .open& {
                        position: fixed;
                        top: 0;
                        height: 100%;
                        overflow: auto;
                    }
                }
                img {
                    display: block;
                    padding: 0.5rem;
                }
                .heading {
                    display: none;
                }
                menu {
                    display: none;
                    .open& {
                        display: block;
                    }
                }
            }
        `
        return style;
    }
};

customElements.define('sidebar-element', SidebarElement);
