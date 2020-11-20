// import Preload from "./Preload.js";
import MyData from "@/MyData.js";
import Game from "./Game.js";
import * as YR from "@/YR.js";
export default class PixiMain extends PIXI.Container {
    constructor(canvas) {
        super();
        this.parentW = canvas.parentNode.offsetWidth*1;
        this.parentH = canvas.parentNode.offsetHeight*1;
        MyData.ratio = this.ratio = window.devicePixelRatio;
        this.direction = MyData.direct;
        this.loadComplete = false;
        this.pageVer;
        this.game;

        this.app = new PIXI.Application({
            width: MyData.stageW,
            height: MyData.stageH,
            transparent: true,
            resolution: this.ratio,
            view: canvas,
            // forceCanvas:true,
        });
        MyData.render = this.pixi_renderer = this.app.renderer;

        YR.Mediator.getInstance().add('PixiMain_LoadComplete', (e) => {
            MyData.resource = e.res;
            this.loadComplete = true;
            YR.Mediator.getInstance().fire('Main_2DLoaded');
        });

        this.pixiStage = new PIXI.Container();
        this.addChild(this.pixiStage);

        // this.preload = new Preload();
        // this.pixiStage.addChild(this.preload);

        this._resize();
        window.onresize = this._resizeHandlerPIXI.bind(this);
        window.requestAnimationFrame(this._animate.bind(this));
    }

    _resizeHandlerPIXI() {
        setTimeout(() => {
            this._resize();
        }, 200);
    };

    _resize() {
        this.pixi_renderer.resize(this.parentW, this.parentH);
        this.pixi_renderer.view.style.height = this.parentH + 'px';
        this.pixi_renderer.view.style.width = this.parentW + 'px';
        let mode = 'noBorder';
        // if(this.parentW > this.parentH)
        // {
        //     mode='showAll';
        // }
        // switch (mode) {
        //     case 'exactFit':
        //         this.pixiStage.scale.x = this.parentW / MyData.stageW;
        //         this.pixiStage.scale.y = this.parentH / MyData.stageH;
        //         break;
        //     case 'noBorder':
        //         this.pixiStage.scale.x = (this.parentH / MyData.stageH < this.parentW / MyData.stageW) ? (this.parentW / MyData.stageW) : (this.parentH / MyData.stageH);
        //         this.pixiStage.scale.y = this.pixiStage.scale.x;
        //         break;
        //     case 'noScale':
        //         this.pixiStage.scale.x = 1;
        //         this.pixiStage.scale.y = 1;
        //         break;
        //     case 'showAll':
        //         this.pixiStage.scale.x = (this.parentH / MyData.stageH < this.parentW / MyData.stageW) ? (this.parentH / MyData.stageH) : (this.parentW / MyData.stageW);
        //         this.pixiStage.scale.y = this.pixiStage.scale.x;
        //         break;
        // }
        // this.pixiStage.x = (this.parentW - MyData.stageW * this.pixiStage.scale.x) * .5;
        // this.pixiStage.y = (this.parentH - MyData.stageH * this.pixiStage.scale.y) * .5;
        // MyData.offsetX = this.pixiStage.x / this.pixiStage.scale.x;
        // MyData.offsetY = this.pixiStage.y / this.pixiStage.scale.x;
        // MyData.scale = this.pixiStage.scale.x;
        // MyData.stage = this.pixiStage;
        if (this.direction == 'hor') {
            if (this.parentW < this.parentH) {
                if (this.pageVer && this.loadComplete) {
                    this.pixiStage.addChild(this.pageVer);
                }
            }
            else {
                if (this.pageVer && this.pageVer.parent) {
                    this.pixiStage.removeChild(pageVer);
                }
                if (this.loadComplete && !this.game) {
                    // this.game=Game.create();
                    // this.pixiStage.addChildAt(this.game,0);
                }
            }
        }
        //竖版设计
        else {
            //假横屏
            if (this.parentW > this.parentH) {
               
            }
            else {
            
            }
            
            // if (this.loadComplete && !this.game) {
                this.game = new Game();
                this.pixiStage.addChildAt(this.game, 0);
            // }

            // console.log('myVideo:',myVideo);
            // if(myVideo)
            // {
            // myVideo.style.left= pixiStage.x+pixiStage.scale.x*0+'px';
            // myVideo.style.top= pixiStage.y+pixiStage.scale.y*0+'px';
            // myVideo.style.width= 844*pixiStage.scale.x+'px';
            // myVideo.style.height=1496*pixiStage.scale.y+'px';
            // }
        }
        if (this.pageVer) {
            this.pageVer.resize();
        }
        if (this.game) {
            this.game.resize();
        }
    }
    pixiStart() {
        // this.preload.out();
        this._resize();
    }

    _animate() {
        window.requestAnimationFrame(this._animate.bind(this));
        this.pixi_renderer.render(this.pixiStage);

        if (this.game && this.game.pd) {
            this.game.pd.emitter.update(0.01);
        }
    }
}

