/**
 * 游戏窗口
 */
export default class Sizes {
  constructor() {
    this.viewport = {};
    this.$sizeViewport = document.createElement("div");
    this.$sizeViewport.style.width = "100vw";
    this.$sizeViewport.style.height = "100vh";
    this.$sizeViewport.style.position = "absolute";
    this.$sizeViewport.style.top = 0;
    this.$sizeViewport.style.left = 0;
    this.$sizeViewport.style.pointerEvents = "none";
  
    //监听resize

    //触发resize
    this.resize();
  }

  resize() {
    document.body.appendChild(this.$sizeViewport);
    this.viewport.width = this.$sizeViewport.offsetWidth;
    this.viewport.height = this.$sizeViewport.offsetHeight;
    document.body.removeChild(this.$sizeViewport);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    //对resize的定制
  }
}
