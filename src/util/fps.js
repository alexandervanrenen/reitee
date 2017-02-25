class Fps {
    constructor() {
        this.lastCalledTime = Date.now();
        this.fps = 0;
        this.fps_display = "fps = 60";
    }

    onUpdate(cr) {
        let delta = (Date.now() - this.lastCalledTime) / 1000;
        this.fps++;
        if (delta > 1) {
            this.lastCalledTime = Date.now();
            this.fps_display = "fps = " + this.fps;
            this.fps = 0;
        }
        cr.context.font = cr.font(25, "Arial");
        cr.context.fillStyle = constants.menuTextColor;
        cr.context.fillText(this.fps_display, cr.tmx(680), cr.tmy(25));
    };
}

var fpsCounter = new Fps();
