import menuUrl from '../../images/menu.png';

export default function MenuButton(host, panel, menu, icon) {
    icon.alt = 'menu icon';
    icon.src = menuUrl;
    icon.width = 36;
    icon.addEventListener('click', clickHandler);

    /** @param {Event} e */
    function clickHandler(e) {
       host.classList.toggle('open');
        panel.classList.toggle('open');
        menu.classList.toggle('open');
        e.stopPropagation();

        window.addEventListener('click', (_e) => {
            host.classList.toggle('open');
            panel.classList.toggle('open');
            menu.classList.toggle('open');
        }, {once: true});
    }
    
    return icon
}
