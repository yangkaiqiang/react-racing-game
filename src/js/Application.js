import React from 'react';
import ReactDOM from 'react-dom';
import Resources from './base/Resources'
import Camera from './base/Camera';

export default class Application extends React.Component {
  componentDidMount(){
    //当前画布对象
    this.$canvas = ReactDOM.findDOMNode(this);

    //导入资源
    this.resources = new Resources()
    
    //基础配置
    this.setConfig();

    //设置调试工具
    this.setDebug();

    //设置场景
    this.setCamera();

    //设置相机
    this.setCamera();

    //设置模型
    this.setPasses();

    //设置精灵
    this.setWorld();
  }

  setConfig(){}

  setDebug(){}

  setCamera(){
    this.Camera = new Camera({})
  }

  setRenderer(){}

  setPasses(){}

  setWorld(){}

  render(){
    return (
      <canvas id="webgl"></canvas>
    );
  }
}