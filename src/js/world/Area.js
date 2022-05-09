import * as THREE from 'three';
import gsap from 'gsap'; 
import EventEmitter from "../utils/EventEmitter";

import AreaFloorBorderBufferGeometry from '../geometries/AreaFloorBorderBufferGeometry';
import AreaFloorBorderMaterial from '../materials/AreaFloorBorder';
import AreaFenceBufferGeometry from '../geometries/AreaFenceBufferGeometry';
import AreaFenceMaterial from '../materials/AreaFence';

export default class Area extends EventEmitter{
    constructor(_options){
        super();

        this.time = _options.time;
        this.position = _options.position;
        this.halfExtents = _options.halfExtents;

        this.container = new THREE.Object3D();
        this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;
        this.container.matrixAutoUpdate = false;
        this.container.updateMatrix();

        this.setFloorBorder();
        this.setfence();
        this.setInteractions();
    }

    out(){
        gsap.killTweensOf(this.fence.mesh.position);
        gsap.to(this.fence.mesh.position, { duration: 0.35, ease: "back.out(4)", z: -this.fence.offset })
    }

    in(){
        gsap.killTweensOf(this.fence.mesh.position);
        gsap.to(this.fence.mesh.position, { duration: 0.35, ease: "back.out(3)", z: this.fence.offset })
    }

    setInteractions(){
        this.mouseMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(this.halfExtents.x * 2, this.halfExtents.y * 2),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
        );
        this.mouseMesh.position.z = -0.01;
        this.mouseMesh.matrixAutoUpdate = false;
        this.mouseMesh.updateMatrix();
        this.container.add(this.mouseMesh)
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
        this.floorBorder.mesh.matrixAutoUpdate = false;
        this.container.add(this.floorBorder.mesh);
    }

    setfence(){
       this.fence = {};
       this.fence.depth = 0.5;
       this.fence.offset = 0.5;

       this.fence.gromerty = new AreaFenceBufferGeometry(
           this.halfExtents.x * 2,
           this.halfExtents.y * 2,
           this.fence.depth
       );

       this.fence.material = new AreaFenceMaterial();
       this.fence.material.uniforms.uBorderAlpha.value = 0.5;
       this.fence.material.uniforms.uStrikeAlpha.value = 0.25;

       this.fence.mesh = new THREE.Mesh(this.fence.gromerty, this.fence.material);
       this.fence.mesh.position.z = -this.fence.depth;
       this.container.add(this.fence.mesh);

       this.time.on('tick', () => {
        this.fence.material.uniforms.uTime.value = this.time.elapsed;
       })
    }
}