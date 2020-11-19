export default {
    uniforms: {
        img0: {
            value: null,
            editable: false
        },
        time: {
            value: 0,
            editable: false
        },
        amplitude: {
            value: 1.5,
            editable: true,
            name: '振幅',
            max:4,
            min:0.5
        },
        amount: {
            value: 1.0,
            editable: true,
            name: '数量',
            max:4,
            min:0.5
        },
        speed: {
            value: 0.1,
            name: '速度',
        },
        timegap: {
            value: 100,
            name: '帧率',
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
        uniform float amplitude;
        uniform float amount;
        varying vec2 vUv;				
        
        float randomNoise(float x, float y)
        {
            return fract(sin(dot(vec2(x, y), vec2(12.9898, 78.233))) * 43758.5453);
        }
        void main()
        {
            vec3 color;
            float colorR;
            float colorG;
            float colorB;

            //指数函数
            float splitX = (1.0 + sin(time * 6.0)) * 0.5;
            splitX *= 1.0 + sin(time * 16.0) * 0.5;
            splitX *= 1.0 + sin(time * 19.0) * 0.5;
            splitX *= 1.0 + sin(time * 27.0) * 0.5;
            splitX = pow(splitX, amplitude);
            splitX *= (0.05 * amount);
            vec2 uvcoord=vUv;
            
            colorR=texture2D(img0,vec2(vUv.x-splitX,vUv.y)).r;
            colorG=texture2D(img0,vec2(vUv.x,vUv.y)).g;
            colorB=texture2D(img0,vec2(vUv.x+splitX,vUv.y)).b;

            color=vec3(colorR,colorG,colorB);
            color*= (1.0 - splitX * 0.5);


            gl_FragColor=vec4(color,1.0);
        }
    `
}