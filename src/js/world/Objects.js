import * as THREE from "three";

export default class Objects {
    constructor(_options) {
        this.materials = _options.materials;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.items = [];
        this.floorShadows = [];
        
        this.setParsers();
    }

    setParsers() {
        this.parsers = {};
    
        this.parsers.items = [
          // Shade
          {
            regex: /^shade([a-z]+)_?[0-9]{0,3}?/i,
            apply: (_mesh, _options) => {
              // Find material
              const match = _mesh.name.match(/^shade([a-z]+)_?[0-9]{0,3}?/i);
              const materialName = `${match[1]
                .substring(0, 1)
                .toLowerCase()}${match[1].substring(1)}`; // PastalCase to camelCase
              let material = this.materials.shades.items[materialName];
    
              // Default
              if (typeof material === "undefined") {
                material = new THREE.MeshNormalMaterial();
              }
    
              // Create clone mesh with new material
              const mesh = _options.duplicated ? _mesh.clone() : _mesh;
              mesh.material = material;
    
              if (mesh.children.length) {
                for (const _child of mesh.children) {
                  if (_child instanceof THREE.Mesh) {
                    _child.material = material;
                  }
                }
              }
    
              return mesh;
            },
          },
    
          // Shade
        //   {
        //     regex: /^pure([a-z]+)_?[0-9]{0,3}?/i,
        //     apply: (_mesh, _options) => {
        //       // Find material
        //       const match = _mesh.name.match(/^pure([a-z]+)_?[0-9]{0,3}?/i);
        //       const materialName = match[1].toLowerCase();
        //       let material = this.materials.pures.items[materialName];
    
        //       // Default
        //       if (typeof material === "undefined") {
        //         material = new THREE.MeshNormalMaterial();
        //       }
    
        //       // Create clone mesh with new material
        //       const mesh = _options.duplicated ? _mesh.clone() : _mesh;
        //       mesh.material = material;
    
        //       return mesh;
        //     },
        //   },
    
          // Floor
          {
            regex: /^floor_?[0-9]{0,3}?/i,
            apply: (_mesh, _options) => {
              // Create floor manually because of missing UV
              const geometry = new THREE.PlaneBufferGeometry(
                _mesh.scale.x,
                _mesh.scale.y,
                10,
                10
              );
              const material = this.materials.items.floorShadow.clone();
    
              material.uniforms.tShadow.value = _options.floorShadowTexture;
              material.uniforms.uShadowColor.value = new THREE.Color(
                this.materials.items.floorShadow.shadowColor
              );
              material.uniforms.uAlpha.value = 0;
    
              const mesh = new THREE.Mesh(geometry, material);
              mesh.matrixAutoUpdate = false;
              mesh.updateMatrix();
    
              this.floorShadows.push(mesh);
    
              return mesh;
            },
          },
        ];
    
        // Default
        this.parsers.default = {};
        this.parsers.default.apply = (_mesh) => {
          // Create clone mesh with normal material
          const mesh = _mesh.clone();
          mesh.material = this.materials.shades.items.white;
    
          return mesh;
        };
    }

    getConvertedMesh(_children, _options = {}) {
        const container = new THREE.Object3D();
        const center = new THREE.Vector3();
    
        // Go through each base child
        const baseChildren = [..._children];
    
        for (const _child of baseChildren) {
          // Find center
          if (_child.name.match(/^center_?[0-9]{0,3}?/i)) {
            center.set(_child.position.x, _child.position.y, _child.position.z);
          }
    
          if (_child instanceof THREE.Mesh) {
            // Find parser and use default if not found
            let parser = this.parsers.items.find((_item) =>
              _child.name.match(_item.regex)
            );
            if (typeof parser === "undefined") {
              parser = this.parsers.default;
            }
    
            // Create mesh by applying parser
            const mesh = parser.apply(_child, _options);
    
            // Add to container
            container.add(mesh);
          }
        }
    
        // Recenter
        if (center.length() > 0) {
          for (const _child of container.children) {
            _child.position.sub(center);
          }
    
          container.position.add(center);
        }
    
        if (_options.mass && _options.mass === 0) {
          container.matrixAutoUpdate = false;
          container.updateMatrix();
        }
    
        return container;
    }

    add(_options) {
        const object = {};
    
        object.merged = false;
        object.shouldMerge = _options.mass === 0;
    
        // Offset
        const offset = new THREE.Vector3();
        if (_options.offset) {
          offset.copy(_options.offset);
        }
    
        // Rotation
        const rotation = new THREE.Euler();
        if (_options.rotation) {
          rotation.copy(_options.rotation);
        }
    
        // Sleep
        const sleep = typeof _options.sleep === "undefined" ? true : _options.sleep;
    
        // Container
        object.container = this.getConvertedMesh(_options.base.children, _options);
        object.container.position.copy(offset);
        object.container.rotation.copy(rotation);
        this.container.add(object.container);
    
        // Deactivate matrix auto update
        if (_options.mass === 0) {
          object.container.matrixAutoUpdate = false;
          object.container.updateMatrix();
    
          for (const _child of object.container.children) {
            _child.matrixAutoUpdate = false;
            _child.updateMatrix();
          }
        }
    
        // // Create physics object
        // object.collision = this.physics.addObjectFromThree({
        //   meshes: [..._options.collision.children],
        //   offset,
        //   rotation,
        //   mass: _options.mass,
        //   sleep,
        // });
    
        // for (const _child of object.container.children) {
        //   _child.position.sub(object.collision.center);
        // }
    
        // // Sound
        // if (_options.soundName) {
        //   object.collision.body.addEventListener("collide", (_event) => {
        //     const relativeVelocity = _event.contact.getImpactVelocityAlongNormal();
        //     this.sounds.play(_options.soundName, relativeVelocity);
        //   });
        // }
    
        // // Shadow
        // // Add shadow
        // if (_options.shadow) {
        //   this.shadows.add(object.container, _options.shadow);
        // }
    
        // // Time tick event
        // if (_options.mass > 0) {
        //   this.time.on("tick", () => {
        //     object.container.position.copy(object.collision.body.position);
        //     object.container.quaternion.copy(object.collision.body.quaternion);
        //   });
        // }
    
        // Save
        this.items.push(object);
    
        return object;
    }
}