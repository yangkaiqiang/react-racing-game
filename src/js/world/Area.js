import * as THREE from 'three';
import EventEmitter from "../utils/EventEmitter";

import AreaFloorBorderBufferGeometry from '../geometries/AreaFloorBorderBufferGeometry';
import AreaFloorBorderMaterial from '../materials/AreaFloorBorder';

export default class Area extends EventEmitter{
    constructor(_options){
        super();

        this.position = _options.position;
        this.halfExtents = _options.halfExtents;

        this.container = new THREE.Object3D();
        this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;
        this.container.matrixAutoUpdate = false;
        this.container.updateMatrix();

        this.setFloorBorder();
    }

    setFloorBorder(){
        this.floorBorder = {};

        this.floorBorder.geometry = new AreaFloorBorderBufferGeometry(
            this.halfExtents.x * 2,
            this.halfExtents.y * 2,
            0.25
        );
        this.floorBorder.material = new AreaFloorBorderMaterial();
        this.floorBorder.material.uniforms.uColor.value = new THREE.Color(0xffffff);
        this.floorBorder.material.uniforms.uAlpha.value = 1;
        this.floorBorder.material.uniforms.uLoadProgress.value = 1;
        this.floorBorder.material.uniforms.uProgress.value = 1;
        
        this.floorBorder.mesh = new THREE.Mesh(this.floorBorder.geometry, this.floorBorder.material);
        console.log(this.floorBorder.geometry)
        this.floorBorder.mesh.matrixAutoUpdate = false;
        this.container.add(this.floorBorder.mesh);
    }
}