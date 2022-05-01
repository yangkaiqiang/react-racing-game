import * as THREE from "three";

export default function () {
  const uniforms = {
    tBackground: { value: null },
  };

  const shaderVertex = `
    #define GLSLIFY 1
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 newPosition = position;
      newPosition.z = 1.0;
      gl_Position = vec4(newPosition, 1.0);
    }
  `;

  const shaderFragment = `
    #define GLSLIFY 1
    uniform sampler2D tBackground;
    varying vec2 vUv;
    
    void main() {
      vec4 backgroundColor = texture2D(tBackground, vUv);
      gl_FragColor = backgroundColor;
      //gl_FragColor = vec4(0,0,0,0.1);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexColors:THREE.FaceColors ,
    wireframe: false,  //是否将几何体渲染为线框
    transparent: false,  //定义此材质是否透明
    uniforms,  //指定要传递给shader代码的uniforms
    vertexShader: shaderVertex,  //顶点着色器的GLSL代码
    fragmentShader: shaderFragment,  //片元着色器的GLSL代码
  });

  return material;
}
