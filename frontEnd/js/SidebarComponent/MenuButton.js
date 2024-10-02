import menuUrl from '../../images/menu.png';

export default function MenuButton(host) {
    const menuIcon = document.createElement('img')
    menuIcon.className = 'menuIcon'
    menuIcon.alt = 'menu icon';
    menuIcon.src = menuUrl;
    menuIcon.width = 28;
    menuIcon.height = 28;
    menuIcon.addEventListener('click', clickHandler);

    /** @param {Event} e */
    function clickHandler(e) {
        const shadowRoot = host.shadowRoot;
        const navigation = shadowRoot.querySelector('.navigation')
        const nav = shadowRoot.querySelector('.nav')
        navigation.classList.toggle('open')
        nav.classList.toggle('open')
        e.stopPropagation();

        window.addEventListener('click', (_e) => {
            navigation.classList.toggle('open')
            nav.classList.toggle('open')
        }, {once: true})
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
