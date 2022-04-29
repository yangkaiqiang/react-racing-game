/**
 * 相机类
 */
export default class Camera {
    constructor(_options) {
        this.time = _options.time;
        this.sizes = _options.sizes;
        this.renderer = _options.renderer;
        this.debug = _options.debug;
        this.config = _options.config;

      }
}