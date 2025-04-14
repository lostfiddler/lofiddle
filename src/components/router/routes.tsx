import React from 'react';

import Home from '../../pages/Home';
import {RandomWalks} from 
    '../../pages/nature_of_code/chapter_00_randomness/01_random_walks';
import HelloCube from '../../pages/three/hello_cube'

export default [
    {path: '/', component: <Home />},
    {path: '/random_walks', component: <RandomWalks />},
    {path: '/hello_cube', component: <HelloCube />}
]
