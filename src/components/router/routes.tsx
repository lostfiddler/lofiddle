import React from 'react';

import Home from '../../pages/Home';
import {RandomWalks} from 
    '../../pages/nature_of_code/chapter_00_randomness/01_random_walks';
import { RandomNumberDistribution } from '../../pages/nature_of_code/chapter_00_randomness/02_random-number_distribution';
import { Probability } from '../../pages/nature_of_code/chapter_00_randomness/03_probability_and_nonuniform_distributions';
import { NormalDistribution } from '../../pages/nature_of_code/chapter_00_randomness/04_normal_distribution_of_random_numbers';
import { CustomDistribution } from '../../pages/nature_of_code/chapter_00_randomness/05_custom_distribution_of_random_numbers';
import { PerlinNoise } from '../../pages/nature_of_code/chapter_00_randomness/06_smoother_approach_with_perlin_noise';
import HelloCube from '../../pages/three/hello_cube'

export default [
    {path: '/', component: <Home />},
    {path: '/random_walks', component: <RandomWalks />},
    {path: '/random_number_distribution', component: <RandomNumberDistribution />},
    {path: '/probability_and_non-uniform_distribution', component: <Probability />},
    {path: '/a_normal_distribution_of_random_numbers', component: <NormalDistribution />},
    {path: '/a_custom_distribution_of_random_numbers', component: <CustomDistribution />},
    {path: '/a_smoother_approach_with_perlin_noise', component: <PerlinNoise />},
    // three.js
    {path: '/hello_cube', component: <HelloCube />}
]
