import * as THREE from "three";
import FloorMaterial from "../materials/Floor.js";

export default class Floor {
    constructor(){
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.geometry = new THREE.PlaneBufferGeometry(2, 2, 10, 10);

        this.colors = {};
        this.colors.topLeft = "#f5883c";
        this.colors.topRight = "#ff9043";
        this.colors.bottomRight = "#fccf92";
        this.colors.bottomLeft = "#f5aa58";

        this.material = new FloorMaterial();
        this.updateMaterial();
        // this.material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.frustumCulled = false;  //是否在渲染物体之前，检查每一帧的物体是否在摄像机的视锥体中
        this.mesh.matrixAutoUpdate = false;  //是否计算每一帧的位移、旋转（四元变换）和缩放矩阵，并重新计算matrixWorld属性
        this.mesh.updateMatrix();

        this.container.add(this.mesh)

    }

    updateMaterial(){
        //生成顶点颜色对象
        const topLeft = new THREE.Color(this.colors.topLeft);
        const topRight = new THREE.Color(this.colors.topRight);
        const bottomRight = new THREE.Color(this.colors.bottomRight);
        const bottomLeft = new THREE.Color(this.colors.bottomLeft);
        
        //使用颜色数据创建缓冲区
        const data = new Uint8Array([
            Math.round(bottomLeft.r * 255),
            Math.round(bottomLeft.g * 255),
            Math.round(bottomLeft.b * 255),
            Math.round(bottomRight.r * 255),
            Math.round(bottomRight.g * 255),
            Math.round(bottomRight.b * 255),
            Math.round(topLeft.r * 255),
            Math.round(topLeft.g * 255),
            Math.round(topLeft.b * 255),
            Math.round(topRight.r * 255),
            Math.round(topRight.g * 255),
            Math.round(topRight.b * 255),
        ]);

        //使用缓冲区创建数据纹理
        this.backgroundTexture = new THREE.DataTexture(
            data,
            2,
            2,
            THREE.RGBFormat
          );
        
        //当一个纹素覆盖大于一个像素时，贴图将如何采样。默认值为THREE.LinearFilter， 它将获取四个最接近的纹素，并在他们之间进行双线性插值。 另一个选项是THREE.NearestFilter，它将使用最接近的纹素的值。
        this.backgroundTexture.magFilter = THREE.LinearFilter;
        this.backgroundTexture.needsUpdate = true; //下次使用纹理时触发一次更新
        
        //gsls传参
        this.material.uniforms.tBackground.value = this.backgroundTexture;
    }
}