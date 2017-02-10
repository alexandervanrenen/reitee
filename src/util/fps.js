function Fps() {
    this.lastCalledTime = Date.now();
    this.fps = 0;
    this.fps_display = "fps = ?";

    this.onUpdate = function fps_onUpdate(cc) {
        delta = (Date.now() - this.lastCalledTime) / 1000;
        this.fps++;
        if (delta > 1) {
            this.lastCalledTime = Date.now();
            this.fps_display = "fps = " + this.fps;
            this.fps = 0;
        }
        cc.font = "25px Arial";
        cc.fillText(this.fps_display, 680, 20);
    };
}

fpsCounter = new Fps();
