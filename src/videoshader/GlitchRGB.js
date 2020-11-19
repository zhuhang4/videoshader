export default {
    uniforms: {
        img0: {
            value: null
        },
        time: {
            value: 0
        },
        speed: {
            value: 0.1,
        },
        timegap: {
            value: 100,
        }
    },
    vertexShader: `
        varying vec2 vUv;
        void main()
        {
            vUv=uv;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);	
        }
    `,
    fragmentShader: `
        uniform sampler2D img0;
        uniform float time;
        uniform float sliceMaxHeight;
        uniform float sliceMinHeight;
        varying vec2 vUv;				

        
        float randomNoise(float x, float y)
        {
            return fract(sin(dot(vec2(x, y), vec2(12.9898, 78.233))) * 43758.5453);
        }
        void main()
        {
            float splitX=randomNoise(time,99999.)/10.;
            
            float colorR=texture2D(img0,vec2(vUv.x-splitX,vUv.y)).r;
            float colorG=texture2D(img0,vec2(vUv.x,vUv.y)).g;
            float colorB=texture2D(img0,vec2(vUv.x+splitX,vUv.y)).b;

            gl_FragColor=vec4(colorR,colorG,colorB,1.0);
        }
    `
}