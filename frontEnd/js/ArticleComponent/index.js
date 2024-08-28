import GetArticle from './Article.js'
import Style from './style.css?inline'

export default class PostComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.styleSheet = document.createElement('style')

        window.addEventListener('popstate', async (e) => {
            const path = e.state;
            const module = await GetArticle(path)

            this.canvasApp = module.canvasApp()
            this.article = module.article()
            this.shadow.replaceChildren(this.styleSheet, this.canvasApp, this.article)
        });
    }

    connectedCallback() {
        this.RenderView();
    }

    RenderView() {
        this.styleSheet.textContent = Style;

        const kitten = document.createElement('span');
        kitten.textContent = 'all you need is love! no, hatred is the only way!';

        this.shadow.append(this.styleSheet, kitten)
    }
}

customElements.define('post-element', PostComponent)
