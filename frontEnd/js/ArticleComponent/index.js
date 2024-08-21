export default class PostComponent extends HTMLElement {
    static observedAttributes = ["data"]

    constructor(foo) {
        super()
        this.foo = foo
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
        }
        shadow.appendChild(button)
        console.log(this.foo)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`)
    }
}

customElements.define('post-element', PostComponent)
