export default class PostComponent extends HTMLElement {
    static observedAttributes = ["data"]

    constructor(state) {
        super()
        this.state = state
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot) return;

        const shadow = this.attachShadow({mode: 'open'});
        const button = document.createElement('button');
        button.innerText = 'click'
        button.onclick = () => {
            this.setAttribute('data', 'I got this')
            console.log(this.state)
        }
        window.addEventListener('popstate', e => {
            console.log(e)
        })
        shadow.appendChild(button)
        console.log(this.foo)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`)
    }
}

customElements.define('post-element', PostComponent)
