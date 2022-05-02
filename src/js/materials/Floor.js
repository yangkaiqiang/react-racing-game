import * as THREE from "three";

// import shaderFragment from "../../assets/shaders/floor/fragment.glsl";
// import shaderVertex from "../../assets/shaders/floor/vertex.glsl";


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
    }
  `;

  const material = new THREE.ShaderMaterial({
    wireframe: false,  //是否将几何体渲染为线框
    transparent: false,  //定义此材质是否透明
    uniforms,  //指定要传递给shader代码的uniforms
    vertexShader: shaderVertex,  //顶点着色器的GLSL代码
    fragmentShader: shaderFragment,  //片元着色器的GLSL代码
  });

  return material;
}
