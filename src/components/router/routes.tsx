import React from 'react';

import Home from '../../pages/Home';
// Nature of Code
import {RandomWalks} from 
    '../../pages/nature_of_code/chapter_00_randomness/01_random_walks';
import { RandomNumberDistribution } from '../../pages/nature_of_code/chapter_00_randomness/02_random-number_distribution';
import { Probability } from '../../pages/nature_of_code/chapter_00_randomness/03_probability_and_nonuniform_distributions';
import { NormalDistribution } from '../../pages/nature_of_code/chapter_00_randomness/04_normal_distribution_of_random_numbers';
import { CustomDistribution } from '../../pages/nature_of_code/chapter_00_randomness/05_custom_distribution_of_random_numbers';
import { PerlinNoise } from '../../pages/nature_of_code/chapter_00_randomness/06_smoother_approach_with_perlin_noise';
// Nature of Code - Chapter 01
import Vectors from '../../pages/nature_of_code/chapter_01_vectors/01_intro_to_vectors';
import MoreVectorMath from '../../pages/nature_of_code/chapter_01_vectors/02_more_vector_math.tsx';
import MotionWithVectors from '../../pages/nature_of_code/chapter_01_vectors/03_motion_with_vectors';
import MousePosition from '../../pages/html_css/mouse_position.tsx';
import DynamicBezierCurves from '../../pages/html_css/dynamic_bezier_curves.tsx';
// Three
import HelloCube from '../../pages/three/hello_cube'
import LoadOBJ from '../../pages/three/load_obj'
import LoadGLTF from '../../pages/three/load_gltf';
import Utilities from '../../pages/three/utiliites';
// Arcade
import Adventure from '../../pages/arcade/adventure'

export default [
    {path: '/', component: <Home />},
    // Nature of Code - Chapter 00
    {path: '/random_walks', component: <RandomWalks />},
    {path: '/random_number_distribution', component: <RandomNumberDistribution />},
    {path: '/probability_and_non-uniform_distribution', component: <Probability />},
    {path: '/a_normal_distribution_of_random_numbers', component: <NormalDistribution />},
    {path: '/a_custom_distribution_of_random_numbers', component: <CustomDistribution />},
    {path: '/a_smoother_approach_with_perlin_noise', component: <PerlinNoise />},
    // Nature of Code - Chapter 01
    {path: '/intro_to_vectors', component: <Vectors />},
    {path: '/more_vector_math', component: <MoreVectorMath />},
    {path: '/motion_with_vectors', component: <MotionWithVectors />},
    // html/css
    {path: '/get_mouse_position', component: <MousePosition />},
    {path: 'dynamic_bezier_curves', component: <DynamicBezierCurves />},
    // three.js
    {path: '/hello_cube', component: <HelloCube />},
    {path: 'load_obj', component: <LoadOBJ />},
    {path: 'load_gltf', component: <LoadGLTF />},
    {path: '/utilities', component: <Utilities />},
    // Arcade
    {path: '/adventure', component: <Adventure />}
]
