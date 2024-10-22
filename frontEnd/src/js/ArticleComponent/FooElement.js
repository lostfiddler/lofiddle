export default class FooElement extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const shadow = this.attachShadow({mode: 'open'});
        const button = document.createElement('button');
        button.innerText = 'click'
        button.onclick = () => {
            console.log('kat')
        }
        shadow.appendChild(button)
    }
}

customElements.define('foo-element', FooElement)
