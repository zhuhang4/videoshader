import ThreePreload from "./ThreePreload";
import MyProton from "./MyProton";
import ThreeShader from "./ThreeShader.js";
import {
    Monitor
} from "@/lib/GLPerf.js"
import * as dat from 'dat.gui';
import YRShader from "../YRShader";
import {
    GLTFLoader
} from "@/lib/GLTFLoader";
import '../../../lib/OrbitControls.js';
// import { EffectComposer } from '../../../lib/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from '../../../lib/jsm/postprocessing/RenderPass.js';
// import { Zlib } from "../../../lib/jsm/libs/inflate.module.min.js";
// import { UnrealBloomPass } from '../../../lib/jsm/postprocessing/UnrealBloomPass.js';
import MyData from "@/MyData";
import * as YR from "@/YR";
export default class ThreeMain {
    constructor(cvs) {
        this.cvs = cvs;
        this.parentW = cvs.parentNode.offsetWidth;
        this.parentH = cvs.parentNode.offsetHeight;
        this.bool_render = true;

        this.renderer = new THREE.WebGLRenderer({
            canvas: cvs,
            antialias: true,
            alpha: true
        });


        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(33, this.parentW / this.parentH, 1, 2000);
        this.camera.aspect = this.parentW / this.parentH;
        this.camera.position.set(3, 2, 3);
        this.camera.rotation.set(-0.57, -0.68, -0.38);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 0.2;
        this.controls.minDistance = 0;
        this.controls.maxDistance = 5000;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.2;
        this.controls.minPolarAngle = 65 * Math.PI / 180;; // radians
        this.controls.maxPolarAngle = 80 * Math.PI / 180; // radians
        this.controls.enableRotate = true;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffff00, 0.5);
        window.addEventListener('resize', this.resize.bind(this));

        this.resize();
        this.loadVideoTexture();
        this.addHelper();
        this.animate();

        YR.Mediator.getInstance().add('Filter_Change', (e) => {
            console.log('receive')
            let uniforms = this.threeshader.changeShader(e.name).uniforms;
            YR.Mediator.getInstance().fire('Filter_UpdateParams', {
                data: uniforms
            })
        });
    }

    addGLPer() {
        this.glPerf = new Monitor(this.renderer.domElement)
    }
    loadVideoTexture() {
        let video = document.getElementById('video');
        let videoTexture = new THREE.VideoTexture(video);

        // let geo=new THREE.BoxBufferGeometry(1,1,1,1,1,1);
        // let material=new THREE.MeshBasicMaterial({map:videoTexture});
        // let mesh=new THREE.Mesh(geo,material);
        // this.scene.add(mesh);

        this.threeshader = new ThreeShader(videoTexture);
        this.threeshader.changeShader('Standard');
        this.scene.add(this.threeshader.mesh);
    }

    resize(e) {
        this.parentW = this.cvs.parentNode.offsetWidth;
        this.parentH = this.cvs.parentNode.offsetHeight;
        this.cvs.aspect = this.parentW / this.parentH;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.parentW, this.parentH);
    }

    animate() {
        // plane.rotation.setFromRotationMatrix( camera.matrix );
        if (this.bool_render) {
            requestAnimationFrame(this.animate.bind(this));
            this.renderer.render(this.scene, this.camera);
            if (this.glPerf) {
                this.glPerf.update()
            }
            if (this.controls && !this.bool_focus) {
                this.controls.update();
            }
        }
    }

    addHelper() {
        let help = new THREE.AxesHelper(15);
        this.scene.add(help)
    }
}