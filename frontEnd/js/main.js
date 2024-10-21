import SidebarComponent from './SidebarComponent/index.js';
import ArticleComponent from './ArticleComponent/index.js';

const app = document.querySelector('#app');
const Sidebar = new SidebarComponent();
const Article = new ArticleComponent();

app.appendChild(Sidebar);
app.appendChild(Article);

window.env = {
    contentWidth: 800,
    canvasWidth: 800,
    canvasHeight: 600,
    blue: '#1565c0',
    red: '#d20f39'
}
