import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from "three";
import Resources from './base/Resources'
import Camera from './base/Camera';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import World from './world/index';

export default class Application extends React.Component {
  componentDidMount(){
    //当前画布对象
    this.$canvas = ReactDOM.findDOMNode(this);

    //对于画面的交互事件处理
    this.time = new Time();

    // //针对场景大小控制的类
    this.sizes = new Sizes();

    //导入资源
    this.resources = new Resources()
    
    //基础配置
    this.setConfig();

    //设置调试工具
    // this.setDebug();

    //设置场景构造器
    this.setRenderer();

    //设置相机
    this.setCamera();

    //设置模型
    this.setPasses();

    //设置精灵
    this.setWorld();

	
    //测试场景
    this.test()
  }

  setConfig(){}

  setDebug(){}

  setCamera(){
    //获取相机
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
    });

    //相机实例添加到场景中
    this.scene.add(this.camera.container);
  }

  setRenderer(){
    //获取场景
    this.scene = new THREE.Scene();

    //获取构造器
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,  //一个供渲染器绘制其输出的canvas。如果没有传这个参数，会创建一个新canvas
      alpha: true,  // canvas是否包含透明度
    });

    //构造器设置
    this.renderer.setClearColor(0x000000, 1); //设置颜色及其透明度
    this.renderer.setPixelRatio(2); //设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    this.renderer.setSize(
      this.sizes.viewport.width,
      this.sizes.viewport.height
    ); //将输出canvas的大小调整为(width, height)并考虑设备像素比，。
    this.renderer.physicallyCorrectLights = true; //是否使用物理上正确的光照模式
    this.renderer.gammaFactor = 2.2;  //默认2
    this.renderer.gammaOutPut = true; //如果设置, 所有纹理和颜色需要乘以gamma输出
    this.renderer.autoClear = false; //定义渲染器是否在渲染每一帧之前自动清除其输出
  }

  setPasses(){}

  setWorld(){
    this.world = new World();
    
    this.scene.add(this.world.container);
  }


  test(){
		this.camera.instance.position.z = 5;
    this.time.on("tick", () => {
      this.renderer.render(this.scene, this.camera.instance)  
    });
    
  }

  render(){
    return (
      <canvas id="webgl"></canvas>
    );
  }
}