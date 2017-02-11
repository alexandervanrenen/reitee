class Fps {
    constructor() {
        this.lastCalledTime = Date.now();
        this.fps = 0;
        this.fps_display = "fps = 60";
    }

    onUpdate(cc) {
        let delta = (Date.now() - this.lastCalledTime) / 1000;
        this.fps++;
        if (delta > 1) {
            this.lastCalledTime = Date.now();
            this.fps_display = "fps = " + this.fps;
            this.fps = 0;
        }
        cc.font = "25px Arial";
        cc.fillStyle = constants.menuTextColor;
        cc.fillText(this.fps_display, 680, 25);
    };
}

fpsCounter = new Fps();
