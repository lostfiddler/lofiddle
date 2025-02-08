import { titleCase } from 'title-case'
import onClickHandler from './onClickHandler.js'

/** 
 * @param {Array<string>} examples
 * @param {HTMLUListElement} parentHtmlElement
 */
export default function ListExamples(examples, parentHtmlElement) {
    for (let i = 0; i < examples.length;i++) {
        const example = examples[i];
        const example_htmlElement = document.createElement('li');
        const exampleLink_htmlElement = document.createElement('a')

        exampleLink_htmlElement.setAttribute('href', example) 
        exampleLink_htmlElement.textContent = titleCase(
            example.slice(
                example.lastIndexOf('/') + 1
            ).replace(/.jsx|.js/g, '').replace(/_/g, ' '));
        exampleLink_htmlElement.addEventListener('click', onClickHandler)
        example_htmlElement.appendChild(exampleLink_htmlElement)
        parentHtmlElement.appendChild(example_htmlElement);
    }
}
