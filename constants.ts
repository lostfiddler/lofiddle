import {default as instance} from 'p5';

export const p5 = new instance((_) => {
    _.setup = () => {
        _.noCanvas();
    }
});
export const CANVAS_WIDTH = 680;
export const CANVAS_WIDTH_RATIO = 2.2;
