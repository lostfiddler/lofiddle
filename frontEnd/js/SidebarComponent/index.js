import MenuButton from './MenuButton.js'
import SidebarChildren from './SidebarChildren.js'
import StyleSheet from './styles.css?inline' // vite only

export default class SidebarElement extends HTMLElement{
    constructor() {
        super();
        this.panel = document.createElement('div'), this.panel.className = 'panel';
        this.menu = document.createElement('menu');
        this.header = document.createElement('div'), this.header.className = 'header';
        this.icon = document.createElement('img');
    }

    connectedCallback() {
        this._updateRendering();
    }

    async _updateRendering() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({mode: 'open'});

        shadow.append(
            this.Styles(),
            await SidebarChildren(
                this.panel,
                this.header,
                this.menu,
                MenuButton(this, this.panel, this.menu, this.icon)
        ))
    }

    Styles() {
        const style = document.createElement('style')
        style.innerText = StyleSheet;

        return style;
    }
};

customElements.define('sidebar-element', SidebarElement);
