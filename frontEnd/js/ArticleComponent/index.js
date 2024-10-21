import GetArticle from './Article.js';
import prismCSSRaw from '../../node_modules/prismjs/themes/prism-tomorrow.min.css?raw'
import Style from './style.css?inline';

export default class PostComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'});
        this.styleSheet = document.createElement('style');
        this.prismCSS = document.createElement('style');
    }

    async connectedCallback() {
        await this.RenderView();
    }

    async RenderView() {
        this.prismCSS.textContent = prismCSSRaw
        this.shadow.appendChild(this.prismCSS)
        this.styleSheet.textContent = Style;

        if (performance.navigation.type === performance.navigation.TYPE_RELOAD ||
            performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
            await this.Render(location.pathname.replace(/%5E/g, '/').slice(1))
        }

        window.addEventListener('popstate', async (e) => {
            const path = e.state || history.state.path;
            await this.Render(path)
        });
    }

    async Render(path) {
        const module = await GetArticle(path)
        this.article = module.article()

        this.shadow.replaceChildren(
            this.styleSheet,
            this.prismCSS,
            this.article
        )
    }
}

customElements.define('post-element', PostComponent)
