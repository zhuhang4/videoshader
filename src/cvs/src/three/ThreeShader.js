import MyData from '@/MyData';
import YRShader from '../YRShader';
import {
    Shake,
    Standard,
    GlitchRGBPow,
    GlitchRGB
} from '@/videoshader/VideoShader.js';

export default class ThreeShader {
    constructor(texture) {

        this.geo = new THREE.BoxBufferGeometry(0.85*1.5, 0.48*1.5, 1, 1, 1, 1);
        this.mat = new THREE.ShaderMaterial();
        this.mesh = new THREE.Mesh(this.geo, this.mat);
        this.tex_vd = texture;
        this.tex_vd.wrapS = THREE.RepeatWrapping;
        this.tex_vd.wrapT = THREE.RepeatWrapping;
        // return this.createGlitch(texture);

        this.list = [{
            name: 'GlitchRGB',
        }]
    }

    changeShader(name) {
        clearInterval(this.time);
        return this['create' + name]();
    }

    createGlitchRGB() {
        // texture = new THREE.TextureLoader().load(MyData.imgModules['bg.jpg']);

        let Shader = GlitchRGB;
        this.shaderApply(Shader);
        Shader.uniforms.img0.value = this.tex_vd;
        Shader.uniforms.speed.value = 0.1;
        Shader.uniforms.timegap.value = 100;
        this.time = setInterval(() => {
            Shader.uniforms.time.value += Shader.uniforms.speed.value;
        },  Shader.uniforms.timegap.value);
        return Shader;
    }
    createGlitchRGBPOW() {
        // texture = new THREE.TextureLoader().load(MyData.imgModules['bg.jpg']);
        let Shader = GlitchRGBPow;
        
        // Shader.uniforms.amplitude.value = 1.5;
        // Shader.uniforms.amount.value = 1;
        // Shader.uniforms.speed.value = 1;
        // Shader.uniforms.timegap.value = 50;
      

        this.shaderApply(Shader);
        Shader.uniforms.img0.value = this.tex_vd;
        console.log(Shader.uniforms.speed.value)
        console.log(Shader.uniforms.timegap.value)
        this.time = setInterval(() => {
            Shader.uniforms.time.value += Shader.uniforms.speed.value;
        }, Shader.uniforms.timegap.value);
        return Shader;
    }

    createStandard() {
        let Shader = Standard;
        Shader.uniforms.img0.value = this.tex_vd;
        this.shaderApply(Shader);
        return Shader;
    }

    createShake() {
        let Shader = Shake;
        Shader.uniforms.img0.value = this.tex_vd;
        this.shaderApply(Shader);
        this.tex_vd.wrapS = THREE.RepeatWrapping;
        this.tex_vd.wrapT = THREE.MirroredRepeatWrapping;
        this.tex_vd.repeat.set(2,2);
        this.time = setInterval(() => {
            Shader.uniforms.time.value += Shader.uniforms.speed.value;
        }, 90);
        return Shader;
    }

    createGlitchOLD(texture) {
        let shaderInfo = {};
        // texture = new THREE.TextureLoader().load(MyData.imgModules['bg.jpg']);
        let Shader = GlitchRGB;
        Shader.uniforms.img0.value = texture;
        shaderInfo.material = this.shaderApply(Shader);
        shaderInfo.mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1, 1, 1, 1), shaderInfo.material);

        setInterval(() => {
            Shader.uniforms.time.value += 0.11;
        }, (100));

        return shaderInfo;
    }

    shaderApply(Shader) {
        this.mat.dispose();
        this.mat = null;
        this.mat = new THREE.ShaderMaterial();
        this.mat.uniforms = Shader.uniforms;
        this.mat.fragmentShader = Shader.fragmentShader;
        this.mat.vertexShader = Shader.vertexShader;
        this.mesh.material = this.mat;

    }

    // if (Shader == YRShader.LightLineShader) {
    //     let handler = () => {
    //         YRShader.LightLineShader.uniforms.time.value += 0.01;
    //     }
    //     animate(handler);
    // }
    // return new THREE.ShaderMaterial({
    //     uniforms: Shader.uniforms,
    //     fragmentShader: Shader.fragmentShader,
    //     vertexShader: Shader.vertexShader
    // });

    // function animate(handler) {
    //     handler();
    //     window.requestAnimationFrame(animate.bind(this, handler));

    // }

    // }
}