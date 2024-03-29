import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * 相机类
 */
export default class Camera {
    constructor(_options) {
      this.time = _options.time;
      this.sizes = _options.sizes;
      this.renderer = _options.renderer;

      //创建三维对象容器 准备装载相机
      this.container = new THREE.Object3D();
      this.container.matrixAutoUpdate = false; //是否算每一帧的位移、旋转（四元变换）和缩放矩阵，并重新计算matrixWorld属性

      this.target = new THREE.Vector3();
      this.targetEased = new THREE.Vector3();
      this.easing = 1.5;

      //设置相机角度
      this.setAngle();

      //装载相机实例
      this.setInstance();
        
      //设置相机到画布中
      // this.setOrbitControls();
    }

    setAngle(){
      this.angle = {};

      this.angle.items = {
        default: new THREE.Vector3(1.135, -1.45, 1.15),
        Objects: new THREE.Vector3(0.38, -1.4, 1.63),
      }

      this.angle.value = new THREE.Vector3();
      this.angle.value.copy(this.angle.items.default);

      // this.angle.set = _name => {
      //   const angle = this.angle.items[_name];
      //   angle !== "undefined" && gsap.to(this.angle.value, {...angle, duration: 2, ease: "power1.inOut"});
      // }
    }

    setInstance() {
      //获取透视相机
      this.instance = new THREE.PerspectiveCamera(40, this.sizes.viewport.width / this.sizes.viewport.height, 1, 80);
      this.instance.up.set(0, 0, 1); //这个属性由lookAt方法所使用，例如，来决定结果的朝向
      this.instance.position.copy(this.angle.value.clone().normalize().multiplyScalar(26))
      this.instance.lookAt(new THREE.Vector3()); //表示世界空间中位置的向量
      this.container.add(this.instance); //添加对象到这个对象的子级，可以添加任意数量的对象。

      // this.time.on('tick', () => {
        // this.instance.position.copy(new THREE.Vector3()).add(this.angle.value.clone().normalize().multiplyScalar(15))
      // })
    }

    setOrbitControls() {
      //获取轨道器  使得相机围绕目标进行轨道运动
      this.orbitControls = new OrbitControls(
        this.instance,
        this.renderer.domElement
      );
      this.orbitControls.enabled = false;  //控制器是否被启用
      this.orbitControls.enableKeys = false;  //是否启用或禁用键盘控制
      this.orbitControls.zoomSpeed = 0.5;  //摄像机缩放的速度，其默认值为1
    }
}