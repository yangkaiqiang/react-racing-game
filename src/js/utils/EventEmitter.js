/**
 * 事件处理器
 */
export default class {
    constructor(){
        //事件队列
        this.callbacks = {};
        this.callbacks.base = {};
    }

    /**
     * 绑定事件
     * @param {*} _names 
     * @param {*} callback 
     * @returns 
     */
    on(_names, callback) {

        if(typeof _names === "undefined" && _names == "") {
            console.warn("事件名异常");
            return false;
        }

        if(typeof callback !== "function"){
            console.warn("事件回调异常");
            return false;
        }

        //处理事件名列表
        const names = this.resolveNames(_names);

        //将事件添加到回调队列
        names.forEach(_name => {
            //处理单个事件名
            const name = this.resolveName(_name);

            if(!(this.callbacks[name.namespace] instanceof Object)){
                this.callbacks[name.namespace] = {};
            }

            if(!(this.callbacks[name.namespace][name.value] instanceof Array)){
                this.callbacks[name.namespace][name.value] = [];
            }

            this.callbacks[name.namespace][name.value].push(callback);
        });

        return this;
    }

    /**
     * 卸载事件
     */
    off(_names) {
        if(typeof _names === "undefined" || _names === ""){
            console.warn("事件名异常");
            return false;
        }

        const names = this.resolveNames(_names);

        names.forEach(_name => {
            const name = this.resolveName(_names);

            if (name.namespace !== "base" && name.value === "") {
                delete this.callbacks[name.namespace];
                return;
            }

            if (name.namespace === "base") {
                for (const namespace in this.callbacks) {
                    if (
                        this.callbacks[namespace] instanceof Object &&
                        this.callbacks[namespace][name.value] instanceof Array
                    ) {
                    delete this.callbacks[namespace][name.value];
        
                    if (Object.keys(this.callbacks[namespace]).length === 0)
                        delete this.callbacks[namespace];
                    }
                }
                return;
            }

            
            if (
                this.callbacks[name.namespace] instanceof Object &&
                this.callbacks[name.namespace][name.value] instanceof Array
            ) {
                delete this.callbacks[name.namespace][name.value];

                if (Object.keys(this.callbacks[name.namespace]).length === 0) {
                     delete this.callbacks[name.namespace];
                }
            }
        })

        return this;
    }

    /**
     * 触发事件
     * @param {string} _name 
     * @param {array} _args 
     */
    trigger(_name, _args) {
        if (typeof _name === "undefined" || _name === "") {
            console.warn("事件名异常");
            return;
        }

        const args = !(_args instanceof Array) ? [] : _args;

        let name = this.resolveNames(_name);

        name = this.resolveName(name[0]);

        if (name.namespace === "base") {
            for(const namespace in this.callbacks){
                if(
                    this.callbacks[namespace] instanceof Object &&
                this.callbacks[namespace][name.value] instanceof Array
                ){
                    this.callbacks[namespace][name.value].forEach(callback => {
                        callback.apply(this, args);
                    })
                }
            }
            return;
        }
        console.log(this.callbacks[name.namespace] )
        if (this.callbacks[name.namespace] instanceof Object) {
            if (name.value === "") {
                console.warn("事件名异常");
                return;
            }

            this.callbacks[name.namespace][name.value].forEach(callback => {
                callback.apply(this, args);
            })
        }
    }

    /**
     * 处理事件名列表
     * @param {strinng} _names 
     * @returns 
     */
    resolveNames(_names) {
        let names = _names;

        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
        names = names.replace(/[,/]+/g, " ");
        names = names.split(" ");

        return names;
    }

    /**
     * 处理事件名
     * @param {string} name 
     * @returns 
     */
    resolveName(name) {
        const newName = {};
        const parts = name.split(".");

        newName.original = name;
        newName.value = parts[0];
        newName.namespace = "base";

        if(parts.length > 1 && parts[1] !== ""){ 
            newName.namespace = parts[1];
        }

        return newName;
    }
}