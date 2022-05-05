import * as THREE from 'three';
import Area from "./Area";

export default class Areas {
    constructor(_options) {
        // this.renderer = _options.renderer;
        this.resources = _options.resources;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;
    }

    add(_options) {
        const area = new Area({
            // renderer: this.renderer,
            resources: this.resources,
            ..._options,
        });

        this.container.add(area.container);

        return area;
    }
}