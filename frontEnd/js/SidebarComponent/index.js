import MenuButton from './MenuButton.js'
import Children from './SidebarChildren.js'
import StyleSheet from './styles.css?inline' // vite specific

export default class SidebarComponent extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this._updateRendering();
    }

    async _updateRendering() {
        if (this.shadowRoot) return;
        const shadow = this.attachShadow({mode: 'open'});

        shadow.append(
            this.Styles(),
            await Children(),
            MenuButton()
        )
    }

    Styles() {
        const style = document.createElement('style');
        style.innerText = StyleSheet;

        return style;
    }
};

customElements.define('sidebar-component', SidebarComponent);
