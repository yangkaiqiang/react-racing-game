import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor(){
        super();

        this.start = Date.now();
        this.elapsed = 0;
        this.tick = this.tick.bind(this);
        this.tick()
    }

    /**
     * 屏幕刷新
     */
    tick(){
        const current = Date.now();
        this.elapsed = current - this.start;

        window.requestAnimationFrame(this.tick);
        
        this.trigger("tick");
    }

    /**
     * 停止刷新
     */
    stop(){}
}