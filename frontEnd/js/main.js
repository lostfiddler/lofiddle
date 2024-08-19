import SidebarElement from './SidebarComponent/index.js';
import PostComponent from './PostComponent/index.js';

const app = document.querySelector('#app')

app.appendChild(new SidebarElement)
app.appendChild(new PostComponent)
