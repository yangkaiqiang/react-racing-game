import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from "three";
import Resources from './base/Resources'
import Camera from './base/Camera';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import World from './world/index';

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import BlurPass from "./passes/Blur.js";
import GlowsPass from "./passes/Glows.js";

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

    //设置模型后期合成处理
    this.setPasses();

    //设置精灵
    this.setWorld();
  }

  setConfig(){}

  setDebug(){}

  setCamera(){
    //获取相机
    this.camera = new Camera({
      time: this.time,
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

  setPasses(){
    this.passes = {};

    //实现后期处理效果 该类管理了产生最终视觉效果的后期处理过程链  根据它们添加/插入的顺序来执行，最后一个过程会被自动渲染到屏幕上
    this.passes.composer = new EffectComposer(this.renderer);
    //创建一个通道  该通道在指定的场景和相机的基础上渲染出一个新的场景   只会渲染场景，不会把结果输出到场景上
    this.passes.renderPass = new RenderPass(this.scene, this.camera.instance);
    //使用通道传入一个自定义的着色器，用来生成高级的、自定义的后期处理通道 产生各种模糊效果和高级滤镜。
    this.passes.horizontalBlurPass = new ShaderPass(BlurPass);
    //给着色器传参
    this.passes.horizontalBlurPass.strength = 0;
    this.passes.horizontalBlurPass.material.uniforms.uResolution.value = new THREE.Vector2(this.sizes.viewport.width, this.sizes.viewport.height);
    this.passes.horizontalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0);
    
    this.passes.vertivalBlurPass = new ShaderPass(BlurPass);
    this.passes.vertivalBlurPass.strength = 0;
    this.passes.vertivalBlurPass.material.uniforms.uResolution.value = new THREE.Vector2(this.sizes.viewport.width, this.sizes.viewport.height);
    this.passes.vertivalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0);
  
  
    this.passes.glowPass = new ShaderPass(GlowsPass);
    this.passes.glowPass.color = '#ffcfe0';
    this.passes.glowPass.material.uniforms.uPosition.value = new THREE.Vector2(0, 0.25);
    this.passes.glowPass.material.uniforms.uRadius.value = 0.7;
    this.passes.glowPass.material.uniforms.uColor.value = new THREE.Color(this.passes.glowPass.color);
    this.passes.glowPass.material.uniforms.uAlpha.value = 0.55;

    //将后期处理通道依次添加
    this.passes.composer.addPass(this.passes.renderPass);
    this.passes.composer.addPass(this.passes.horizontalBlurPass);
    this.passes.composer.addPass(this.passes.vertivalBlurPass);
    this.passes.composer.addPass(this.passes.glowPass);
  
    //监听刷新
    this.time.on('tick', () => {
      this.passes.composer.render();
      // this.renderer.render(this.scene, this.camera.instance)
    })
  }

  setWorld(){
    this.world = new World({
      time: this.time,
      camera: this.camera,
      resources: this.resources
    });
    
    this.scene.add(this.world.container);
  }

  render(){
    return (
      <canvas id="webgl"></canvas>
    );
  }
}