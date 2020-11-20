import * as YR from './YR';
import MyData from './MyData';
export default class ShapePage extends PIXI.Container {
    constructor() {
        super();

        this.arr_shape=[]
        this.name = "ShapePage";

        YR.Mediator.getInstance().add('ShapePage_Create',createThing.bind(this));
    }
    createThing(e)
    {
        if(e.type)
        {
          
        }
    }
    

    resize() {
        console.log('resize');
    }
}