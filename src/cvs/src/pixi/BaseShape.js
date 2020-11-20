import * as YR from './YR';
import MyData from './MyData';
export default class BaseShape extends PIXI.Container {
    constructor() {
        super();
        this.name = "BaseShape";
    }
    draw()
    {
        
    }
    resize() {
        console.log('resize');
    }
}