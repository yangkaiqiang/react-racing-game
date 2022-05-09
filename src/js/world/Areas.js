import * as THREE from 'three';
import Area from "./Area";

export default class Areas {
    constructor(_options) {
        // this.renderer = _options.renderer;
        this.time = _options.time;
        this.camera = _options.camera;
        this.resources = _options.resources;

        this.items = [];

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.setMouse();
    }

    setMouse(){
        this.mouse = {};
        this.mouse.currentArea = null;

        //光线投射类用于进行鼠标拾取
        this.mouse.raycaster = new THREE.Raycaster();
        //存放鼠标坐标
        this.mouse.coordinates = new THREE.Vector2();

        window.addEventListener('mousemove', (_event) => {
            //位置归一化处理 鼠标位置转为设备坐标
            this.mouse.coordinates.x = (_event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.coordinates.y = -(_event.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('mousedown', () => {
            this.mouse.currentArea && this.mouse.currentArea.interact();
        });

        this.time.on('tick', () => {
            //通过相机与鼠标位置更新射线
            this.mouse.raycaster.setFromCamera(
                this.mouse.coordinates,
                this.camera.instance
            );

            const intersects = this.mouse.raycaster.intersectObjects(
                this.items.map(_area => _area.mouseMesh)
            );
            
            if(intersects.length){
                const area = this.items.find(_area => _area.mouseMesh === intersects[0].object);

                if(area != this.mouse.currentArea){
                    if(this.mouse.currentArea != null){
                        this.mouse.currentArea.out();
                    }
                    this.mouse.currentArea = area;
                    this.mouse.currentArea.in();
                }
            }else if(this.mouse.currentArea != null){
                this.mouse.currentArea.out();
                this.mouse.currentArea = null;
            }
        });
    }

    add(_options) {
        const area = new Area({
            // renderer: this.renderer,
            time: this.time,
            resources: this.resources,
            active: true,
            ..._options,
        });

        this.container.add(area.container);
        
        this.items.push(area);

        return area;
    }
}