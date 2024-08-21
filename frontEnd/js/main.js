import SidebarComponent from './SidebarComponent/index.js';
import ArticleComponent from './ArticleComponent/index.js';

const state = {};
const app = document.querySelector('#app');
const Sidebar = new SidebarComponent(state);
const Article = new ArticleComponent(state);

app.appendChild(Sidebar);
app.appendChild(Article);
