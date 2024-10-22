// @ts-check
import GetBooks from '../api/GetBooks.js';
import CreateList from './list.js'
import ListChapters from './chapters.js'
import ListExamples from './examples.js'

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

    CreateList(data, nav, ListChapters, ListExamples);
    return navigation
}
