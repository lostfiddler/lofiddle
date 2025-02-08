import GetArticle from './Article.js';
import Prism from 'prismjs'
import prismCSSRaw from '../../../node_modules/prismjs/themes/prism-tomorrow.min.css?raw'
import Style from './style.css?inline';
import KatexCSSRaw from 'katex/dist/katex.min.css?inline';

export default class PostComponent extends HTMLElement {
    static observedAttributes = ["path"]

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'});
        this.styleSheet = document.createElement('style');
        this.prismCSS = document.createElement('style');
        this.KatexCSS = document.createElement('style');
    }

    connectedCallback() {
        this.RenderView();
    }

    RenderView() {
        this.prismCSS.textContent = prismCSSRaw
        this.shadow.appendChild(this.prismCSS)
        this.styleSheet.textContent = Style;
        this.KatexCSS.textContent = KatexCSSRaw
    }

    async attributeChangedCallback(_name, _oldValue, newValue) {
        const module = await GetArticle(newValue)
        this.article = module.article()

        this.shadow.replaceChildren(
            this.styleSheet,
            this.KatexCSS,
            this.prismCSS,
            this.article
        )
        const codeElement = this.shadowRoot.querySelector('code')
        if (codeElement) {
            Prism.highlightAllUnder(this.shadowRoot)
        }
    }
}

customElements.define('post-element', PostComponent)
