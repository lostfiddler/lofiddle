// @ts-check
import MenuButton from './MenuButton.js'
import SidebarChildren from './SidebarChildren.js'

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

        shadow.append(this.styling(), await this.SidebarChildrenWrapper())
    }

    MenuButtonWrapper() {
        return MenuButton(this, this.panel, this.menu, this.icon)
    }

    SidebarChildrenWrapper() {
        return SidebarChildren(
            this.panel, this.header, this.menu, this.MenuButtonWrapper()
        )
    }

    styling() {
        const style = document.createElement('style')

        // TODO - mobile styling
        style.textContent = `
            :host {
                width: 300px;
                margin-right: 1rem;
            }
            a {
                text-decoration: none;
                color: inherit;
            }
            a:hover {
                color: #049EF4;
            }
            .panel {
                position: fixed;
                width: inherit;
                padding-left: 1rem;
                height: 100%;
                background: #222;
            }
            .header {
                margin-left: -1rem;
                padding: 0.5rem 0;
                background: #1565c0;
                > .heading {
                    font-size: 1.4rem;
                    padding-left: 1rem;
                }
            }
            menu {
                padding: 0;
                list-style-type: none;
            }
            ul {
                padding: 0;
                list-style-type: none;
            }
            li {
                margin: 1px 0;
            }
            .bookTitle {
                font-size: 1.2rem;
                color: #049EF4;
            }
            .chapterTitle {
                font-weight: 900;
            }
            img {
                display: none;
                filter: brightness(0) saturate(100%) invert(100%) sepia(68%) saturate(0%) hue-rotate(67deg) brightness(114%) contrast(101%);
            }
        `
        style.textContent += `
            @media screen and (max-width: 768px) {
                :host {
                    display: inherit;
                    position: sticky;
                    top: 0;
                    width: inherit;
                }
                .panel {
                    position: relative;
                    height: inherit;
                    width: 100%;
                    .open& {
                        position: fixed;
                        top: 0;
                        height: 100%;
                        overflow: auto;
                    }
                }
                img {
                    display: block;
                    padding: 0.5rem;
                }
                .heading {
                    display: none;
                }
                menu {
                    display: none;
                    .open& {
                        display: block;
                    }
                }
            }
        `
        return style;
    }
};

customElements.define('sidebar-element', SidebarElement);
