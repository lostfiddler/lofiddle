import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';

import './style.css'
import Sidebar from './components/sidebar'
import router from './components/router'

const container = document.querySelector('#root')!;
const root = ReactDOM.createRoot(container);

function App() {
    return (
        <>
            <Sidebar />
            <RouterProvider router={router} />
        </>
    )
}

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)

// TODO put brand in nav and modify menu
