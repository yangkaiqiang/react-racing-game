import * as THREE from "three";
import FloorMaterial from "../materials/Floor.js";

export default class Floor {
    constructor(){
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.geometry = new THREE.PlaneBufferGeometry(2, 2, 10, 10);

        this.material = new FloorMaterial();
        // this.material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.frustumCulled = false;  //是否在渲染物体之前，检查每一帧的物体是否在摄像机的视锥体中
        this.mesh.matrixAutoUpdate = false;  //是否计算每一帧的位移、旋转（四元变换）和缩放矩阵，并重新计算matrixWorld属性

        this.container.add(this.mesh)

    }

    updateMaterial(){

    }
}