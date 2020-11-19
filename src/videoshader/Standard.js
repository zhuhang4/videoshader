export default {
    uniforms: {
        img0: {
            value: null
        },
        time: {
            value: 0
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
        varying vec2 vUv;				

        void main()
        {
            gl_FragColor=texture2D(img0,vUv);
        }
    `
}