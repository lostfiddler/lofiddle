import { titleCase} from 'title-case'

/**
 * @param {Array<Book>} books
 * @param {HTMLUListElement} parentHtmlElement
 */
export default function createBooksList(books, parentHtmlElement, ListChapters, ListExamples) {
    for (let i = 0; i < books.length;i++) {
        const book = books[i];
        const book_htmlElement = document.createElement('li');
        const book_titleElement = document.createElement('span')
        book_htmlElement.className = 'book'
        book_titleElement.className = 'bookTitle';

        book_titleElement.textContent = titleCase(book.book.replace(/_/g, ' '));
        book_htmlElement.appendChild(book_titleElement);
        parentHtmlElement.appendChild(book_htmlElement);

        ListChapters(book.chapters, book_htmlElement, ListExamples);
    }
}
