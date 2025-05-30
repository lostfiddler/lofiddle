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
import NoVectors from '../../pages/nature_of_code/chapter_01_vectors/1.01_bouncing_ball_with_no_vectors';
import BallWithVectors from '../../pages/nature_of_code/chapter_01_vectors/1.02_bouncing_ball_with_vectors';
import VectorThatFollowsMouse from '../../pages/nature_of_code/chapter_01_vectors/1.03_vector_that_follows_mouse';
import ScaledVector from '../../pages/nature_of_code/chapter_01_vectors/1.04_vector_that_follows_mouse_scaled';
import VectorWithMagnitude from '../../pages/nature_of_code/chapter_01_vectors/1.05_vector_with_magnitude';
import VectorNormilzation from '../../pages/nature_of_code/chapter_01_vectors/1.06_vector_normailzation';
import VectorMotionVelocity from '../../pages/nature_of_code/chapter_01_vectors/1.07_vector_motion_velocity';
import VectorMotionAcceleration from '../../pages/nature_of_code/chapter_01_vectors/1.08_vector_motion_acceleration';
import MotionRandomAcceleration from '../../pages/nature_of_code/chapter_01_vectors/1.09_motion_random_acceleration';
import InteractiveAcceleration from '../../pages/nature_of_code/chapter_01_vectors/1.10_interactivity_with_acceleration_copy';
import AccelerateToMouse from '../../pages/nature_of_code/chapter_01_vectors/1.11_array_of_movers_acceleration_to_mouse';
// Three
import HelloCube from '../../pages/three/hello_cube'
import LoadOBJ from '../../pages/three/load_obj'
import LoadGLTF from '../../pages/three/load_gltf';
import Utilities from '../../pages/three/utiliites';
// Arcade
import Adventure from '../../pages/arcade/adventure'

export default [
    {path: '/', component: <Home />},
    // Nature of Code
    {path: '/random_walks', component: <RandomWalks />},
    {path: '/random_number_distribution', component: <RandomNumberDistribution />},
    {path: '/probability_and_non-uniform_distribution', component: <Probability />},
    {path: '/a_normal_distribution_of_random_numbers', component: <NormalDistribution />},
    {path: '/a_custom_distribution_of_random_numbers', component: <CustomDistribution />},
    {path: '/a_smoother_approach_with_perlin_noise', component: <PerlinNoise />},
    {path: '/a_bouncing_ball_with_no_vectors', component: <NoVectors />},
    {path: '/a_bouncing_ball_with_vectors', component: <BallWithVectors />},
    {path: '/a_vector_that_follows_the_mouse', component: <VectorThatFollowsMouse />},
    {path: '/a_scaled_vector', component: <ScaledVector />},
    {path: '/a_vector_with_magnitude', component: <VectorWithMagnitude />},
    {path: '/vector_normilzation', component: <VectorNormilzation />},
    {path: '/vector_motion_and_velocity', component: <VectorMotionVelocity />},
    {path: '/vector_motion_and_acceleration', component: <VectorMotionAcceleration />},
    {path: '/motion_and_random_acceleration', component: <MotionRandomAcceleration />},
    {path: '/interactivity_with_acceleration', component: <InteractiveAcceleration />},
    {path: '/movers_accelerating_to_mouse', component: <AccelerateToMouse />},
    // three.js
    {path: '/hello_cube', component: <HelloCube />},
    {path: 'load_obj', component: <LoadOBJ />},
    {path: 'load_gltf', component: <LoadGLTF />},
    {path: '/utilities', component: <Utilities />},
    // Arcade
    {path: '/adventure', component: <Adventure />}
]
