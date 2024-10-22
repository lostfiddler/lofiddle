import { titleCase } from 'title-case'

/**
 * @param {Array<{chapter: string, examples: Array<string>}>} chapters
 * @param {HTMLLIElement} parentHtmlElement
 */
export default function ListChapters(chapters, parentHtmlElement, ListExamples) {
    for (let i = 0; i < chapters.length;i++) {
        const chapter = chapters[i];
        const chapter_htmlElement = document.createElement('ul');
        const chapter_titleElement = document.createElement('li')
        chapter_titleElement.className = 'chapterTitle';

        chapter_titleElement.textContent = titleCase(chapter.chapter.replace(/_/g, ' '));
        chapter_htmlElement.appendChild(chapter_titleElement)
        parentHtmlElement.appendChild(chapter_htmlElement);

        ListExamples(chapter.examples, chapter_htmlElement);
    }
}
