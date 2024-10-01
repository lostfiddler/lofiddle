import menuUrl from '../../images/menu.png';

export default function MenuButton() {
    const menuIcon = document.createElement('img')
    menuIcon.className = 'menuIcon'
    menuIcon.alt = 'menu icon';
    menuIcon.src = menuUrl;
    menuIcon.width = 64;
    menuIcon.addEventListener('click', clickHandler);

    /** @param {Event} e */
    function clickHandler(e) {
        // host.classList.toggle('open');
        // menu.classList.toggle('open');
        // e.stopPropagation();
        //
        // window.addEventListener('click', (_e) => {
        //     host.classList.toggle('open');
        //     menu.classList.toggle('open');
        // }, {once: true});
    }
    
    return menuIcon
}
