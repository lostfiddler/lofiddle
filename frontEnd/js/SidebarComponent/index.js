import MenuButton from './MenuButton.js'
import Children from './SidebarChildren.js'
import StyleSheet from './styles.css?inline' // vite specific

export default class SidebarComponent extends HTMLElement{
    constructor() {
        super();
        this.navigation = document.createElement('ul');
        this.header = document.createElement('div');
        this.icon = document.createElement('img');

        this.navigation.classList = 'navigation';
    }
    connectedCallback() {
        this._updateRendering();
    }

    async _updateRendering() {
        if (this.shadowRoot) return;
        const shadow = this.attachShadow({mode: 'open'});

        const ChildrenWrapper = document.createElement('div')
        ChildrenWrapper.className = 'navigation-wrapper';
        this.navigation.appendChild(this.title())
        ChildrenWrapper.append(await Children(this.navigation))

        shadow.append(
            this.Styles(),
            ChildrenWrapper
        )
    }

    title() {
        const title = document.createElement('h1');
        title.className = 'title'
        title.textContent = 'Animations';
        return title;
    }

    Styles() {
        const style = document.createElement('style');
        this.header.className = 'header';
        style.innerText = StyleSheet;

        return style;
    }
};

customElements.define('sidebar-component', SidebarComponent);
