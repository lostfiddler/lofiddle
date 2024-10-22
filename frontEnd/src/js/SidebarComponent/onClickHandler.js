/**
 * @param {Event} event
 */
export default    function onClickHandler(event) {
    event.preventDefault();
    const ArticleComponent = document.querySelector('post-element')

    const path = event.target.getAttribute('href')
    const tail = path.slice(path.lastIndexOf('/'))

    ArticleComponent.setAttribute('path', path)
}
