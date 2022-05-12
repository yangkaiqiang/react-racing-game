import * as THREE from "three";

export default class IntroSection {
  constructor(_options) {
    // Options
    this.resources = _options.resources;
    this.objects = _options.objects;

    // Set up
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.container.updateMatrix();

    this.setStatic();
  }

  setStatic() {
    this.objects.add({
      base: this.resources.items.introStaticBase.scene,
      collision: this.resources.items.introStaticCollision.scene,
      floorShadowTexture: this.resources.items.introStaticFloorShadowTexture,
      offset: new THREE.Vector3(0, 0, 0),
      mass: 0,
    });
  }
}
