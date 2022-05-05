import EventEmitter from "./EventEmitter";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
/**
 * 加载器
 */
export default class Loader extends EventEmitter{
    constructor(){
        super();

        this.toLoad = 0;
        this.loaded = 0;

        this.setLoaders();
    }

    /**
     * 设置使用到的加载器
     */
    setLoaders(){
        //加载器列表
        this.loaders = [];

        //img贴图
        this.loaders.push({
            extensions: ['png', 'jpg'],
            action: _resource => {
                const image = new Image();
                image.src = _resource.source;

                image.addEventListener('load', () => {
                    this.fileLoadEnd(_resource, image);
                })

                image.addEventListener('error', () => {
                    this.fileLoadEnd(_resource, image);
                })
            }
        })

        //配置解码器
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('lib/draco/');
        dracoLoader.setDecoderConfig({ type: 'js' });

        this.loaders.push({
            extensions: ['drc'],
            action: _resource => {
                dracoLoader.load(_resource.source, _data => {
                    this.fileLoadEnd(_resource, _data);

                    DRACOLoader.releaseDecoderModule();
                })
            }
        })

        //gltf模型
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        this.loaders.push({
            extensions: ['glb', 'gltf'],
            action: _resource => {
                gltfLoader.load(_resource.source, _data => {
                    this.fileLoadEnd(_resource, _data);
                })
            }
        })

        //fbx模型
        const fbxLoader = new FBXLoader();
        
        this.loaders.push({
            extensions: ['fbx'],
            action: _resource => {
                fbxLoader.load(_resource.source, _data => {
                    this.fileLoadEnd(_resource, _data);
                })
            }
        })
    }

    /**
     * 加载资源
     */
    load(_resources = []){
        _resources.forEach(_resource => {
            this.toLoad++;
            const extensionMatch = _resource.source.match(/\.([a-z]+)$|data:image\/([a-z]+);base64/);
            if(extensionMatch == null){
                return;
            }

            if(typeof extensionMatch[1] == "undefined" && typeof extensionMatch[2] == "undefined") {
                console.warn(`文件后缀名异常：${_resource}`);
                return;
            }

            const extension = typeof extensionMatch[1] == "undefined" ? extensionMatch[2] : extensionMatch[1];
            const loader = this.loaders.find(_loader => _loader.extensions.find(_extension => _extension == extension));
           
            if(!loader){
                console.warn(`资源加载异常：${_resource}`);
                return;
            }
           
            loader.action(_resource);
        })
    }

    /**
     * 加载结束
     */
    fileLoadEnd(_resource, _data){
        this.loaded++;
        // this.items[_resource.name] = _data;

        this.trigger('fileEnd', [_resource, _data]);

        if(this.loaded === this.toLoad){
            this.trigger('end');
        }
    }
}