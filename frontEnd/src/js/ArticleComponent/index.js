import GetArticle from './Article.js';
import prismCSSRaw from '../../../node_modules/prismjs/themes/prism-tomorrow.min.css?raw'
import Style from './style.css?inline';

export default class PostComponent extends HTMLElement {
    static observedAttributes = ["path"]

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'});
        this.styleSheet = document.createElement('style');
        this.prismCSS = document.createElement('style');
    }

    connectedCallback() {
        this.RenderView();
    }

    RenderView() {
        this.prismCSS.textContent = prismCSSRaw
        this.shadow.appendChild(this.prismCSS)
        this.styleSheet.textContent = Style;
    }

    async attributeChangedCallback(_name, _oldValue, newValue) {
            const module = await GetArticle(newValue)
            this.article = module.article()

            this.shadow.replaceChildren(
                this.styleSheet,
                this.prismCSS,
                this.article
            )
    }
}

customElements.define('post-element', PostComponent)
