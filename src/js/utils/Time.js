import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor(){
        super();

        this.tick = this.tick.bind(this);
        this.tick()
    }

    /**
     * 屏幕刷新
     */
    tick(){
        window.requestAnimationFrame(this.tick);
        
        this.trigger("tick");
    }

    /**
     * 停止刷新
     */
    stop(){}
}