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
        global_cc.font = "25px Arial";
        global_cc.fillStyle = constants.menuTextColor;
        global_cc.fillText(this.fps_display, 680, 25);
    };
}

fpsCounter = new Fps();
