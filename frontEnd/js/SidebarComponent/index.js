import MenuButton from './MenuButton.js'
import SidebarChildren from './SidebarChildren.js'
import StyleSheet from './styles.css?inline' // vite specific

export default class SidebarComponent extends HTMLElement{
    constructor(state) {
        super();
        this.state = state;
    }

    panel = document.createElement('div')
    menu = document.createElement('menu');
    header = document.createElement('div');
    icon = document.createElement('img');

    connectedCallback() {
        this._updateRendering();
    }

    async _updateRendering() {
        if (this.shadowRoot) return;

        console.log(this.state)
        const shadow = this.attachShadow({mode: 'open'});

        shadow.append(
            this.Styles(),
            await SidebarChildren(
                this.state,
                this.panel,
                this.header,
                this.menu,
                MenuButton(this, this.panel, this.menu, this.icon)
        ))
    }

    Styles() {
        const style = document.createElement('style');
        this.panel.className = 'panel';
        this.header.className = 'header';
        style.innerText = StyleSheet;

        return style;
    }
};

customElements.define('sidebar-component', SidebarComponent);
