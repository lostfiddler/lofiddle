import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router';
import routes from './routes.tsx'

export default createBrowserRouter(
    createRoutesFromElements(
        routes.map(route => 
            <Route key={route.path} path={route.path} element={route.component} />)
))
