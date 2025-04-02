import React from 'react';

import Home from '../../articles/Home';
import {RandomWalks} from 
    '../../articles/nature_of_code/chapter_00_randomness/01_random_walks';

export default [
    {path: '/', component: <Home />},
    {path: '/random_walks', component: <RandomWalks />}
]
