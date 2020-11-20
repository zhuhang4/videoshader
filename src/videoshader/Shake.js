export default {
    uniforms: {
        img0: {
            value: null
        },
        time: {
            value: 0
        },
        speed: {
            value: 0.5,
        },
        brightness: {
            name:'视频亮度',
            value: 1.3,
            editable: true,
            max: 3,
            min: 0.5
        },
        brightness_light: {
            name:'速度线亮度',
            value: 0.15,
            editable: true,
            max: 1,
            min: 0
        },
        ucolor: {
            value: [1., 1., 1.],
        },
        scale: {
            name:'抖动幅度',
            value: 1.2,
            editable: true,
            max: 3,
            min: 1,
        },
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
        uniform float scale;
        uniform vec3 ucolor;
        uniform float speed;
        uniform vec2 resolution;
        uniform float brightness;
        uniform float brightness_light;

        varying vec2 vUv;

        float randomNoise(float x, float y)
        {
            return fract(sin(dot(vec2(x, y), vec2(12.9898, 78.233))) * 43758.5453);
        }


        void main()
        {
            float t = time;

             //将坐标映射到-1，1
            //  vec2 position = (vUv.xy - resolution.xy ) / resolution.y;
             vec2 position = vUv.xy *2.-1.;
             //atan(y,x)返回[-PI,PI],atan(y/x)返回[-PI/2,PI/2]；angle为从(-1,0)为起点转一圈，值域（-0.5，0.5）
             
             float angle = atan(position.y, position.x) / (2. * 3.14159265359);
             //从(-0.5,0.5)变成(0.5,-0.5)
            //  angle -= floor(angle);
             float rad = length(position);

             //256为分割数
             float angleRnd = floor(angle * 256.) ;
             //调整值看发散情况
             float angleRnd1 =  fract(angleRnd * fract(angleRnd*0.7235) * 45.1) ;
             float t2 = randomNoise(t,999.) + angleRnd1 ;

             float outputColor = rad*rad*rad*fract(t2)* brightness_light;
             vec3 colorlight= outputColor * ucolor;
            //  gl_FragColor = vec4(colorlight, 1.);


            float s=1.0/scale;
            //放大
            vec2 finalUv=s*vUv;
            //平移，以保证以中心点缩放
            finalUv=vec2(finalUv.x-0.5*(s-1.),finalUv.y-0.5*(s-1.));
            //抖动
            float rangeX=(s-1.0)*0.5*(-1.0+2.*randomNoise(time,9999.));
            float rangeY=(s-1.0)*0.5*(-1.0+2.*randomNoise(time,3333.));
            finalUv=vec2(finalUv.x+rangeX,finalUv.y+rangeY);
            if(finalUv.x>1.||finalUv.x<0.||finalUv.y>1.||finalUv.y<0.)
            {
                gl_FragColor=vec4(vec3(0.),1.);
            }
            else{
                vec3 mix_color=texture2D(img0,finalUv).rgb;
                mix_color=mix_color-colorlight*brightness;
                gl_FragColor=vec4(mix_color,1.);
            }
           
        }
    `
}