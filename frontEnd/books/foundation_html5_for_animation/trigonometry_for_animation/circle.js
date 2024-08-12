import Ball from '../utils/ball.js';

export default () => {
    canvasApp();
    article();
}

function canvasApp() {
    const main = document.querySelector('main');
    const canvas = document.createElement('canvas');
    main.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const ball = new Ball();
    let centerX;
    let centerY;
    const radius = 50;
    const speed = 0.05;
    let angle = 0;

    (function draw() {
        window.requestAnimationFrame(draw);
        resizeCanvas(canvas)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = centerX + Math.sin(angle) * radius;
        ball.y = centerY + Math.cos(angle) * radius;
        angle += speed;
        ball.draw(ctx);
    }())

    function resizeCanvas(canvas) {
        canvas.width = canvas.parentElement.clientWidth * 0.8;
        canvas.height = canvas.width * (9/16);
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }
}

function article() {
    const main = document.querySelector('main');
    const title = document.createElement('h1');
    title.textContent = 'Circle'

    main.prepend(title)
    
    const article = document.createElement('p');
    article.textContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercit 
    tion ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat
    cupid
    atat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
    Class
    aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
    Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.  Integer id quam.
    Morbi mi.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercit 
    tion ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat
    cupid
    atat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
    Class
    aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
    Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.  Integer id quam.
    Morbi mi.
    Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.   Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.
    `
    main.append(article)
}
