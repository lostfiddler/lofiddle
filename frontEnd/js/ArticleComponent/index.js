import GetArticle from './Article.js';
import prismCSSRaw from '../../node_modules/prismjs/themes/prism-tomorrow.min.css?raw'
import Style from './style.css?inline';

export default class PostComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'});
        this.styleSheet = document.createElement('style');
        this.prismCSS = document.createElement('style');

        window.addEventListener('popstate', async (e) => {
            const path = e.state;
            const module = await GetArticle(path)

            this.articleName = module.title()
            this.canvasApp = module.canvasApp()
            this.article = module.article()

            this.shadow.replaceChildren(
                this.styleSheet,
                this.prismCSS,
                this.articleName,
                this.canvasApp,
                this.article
            )
        });

    }

    connectedCallback() {
        this.RenderView();
    }

    RenderView() {
        this.prismCSS.textContent = prismCSSRaw
        this.shadow.appendChild(this.prismCSS)
        this.styleSheet.textContent = Style;
    }
}

customElements.define('post-element', PostComponent)
