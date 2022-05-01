import * as THREE from "three";
import Floor from "./Floor.js";

export default class {
    constructor(){

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        //设置地面
        this.setFloor();
    }

    setFloor(){
        this.floor = new Floor();
        this.container.add(this.floor.container)
    }
}