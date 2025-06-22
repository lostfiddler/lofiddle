import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import Prism from 'prismjs';
import "prismjs/components/prism-javascript";
import "prism-themes/themes/prism-dracula.css";
import "prismjs/plugins/autolinker/prism-autolinker";

import './style.css'
import './my_custom_prism.css'
import Sidebar from './components/sidebar'
import router from './components/router'

const container = document.querySelector('#root')!;
const root = ReactDOM.createRoot(container);

function App() {
    useEffect(() => {
        Prism.highlightAll();
    }, [])

    return (
        <>
            <Sidebar />
            <RouterProvider router={router} />
        </>
    )
}

root.render(
    <App />
)

// TODO put brand in nav and modify menu
