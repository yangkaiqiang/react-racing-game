import * as THREE from "three";

import shaderFragment from "../../assets/shaders/floorShadow/fragment.glsl";
import shaderVertex from "../../assets/shaders/floorShadow/vertex.glsl";

export default function () {
  const uniforms = {
    tShadow: { value: null },
    uShadowColor: { value: null },
    uAlpha: { value: null },
  };

  const material = new THREE.ShaderMaterial({
    wireframe: false,
    transparent: true,
    uniforms,
    vertexShader: shaderVertex,
    fragmentShader: shaderFragment,
  });

  return material;
}
