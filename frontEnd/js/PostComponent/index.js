export default class PostComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        console.log('kitten')
    }
}

customElements.define('post-element', PostComponent)
