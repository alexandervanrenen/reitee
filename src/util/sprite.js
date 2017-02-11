class Sprite {
    constructor(sprite) {
        this.image = new Image();
        this.image.src = sprite.path;
        this.width = sprite.width;
        this.height = sprite.height;
        this.frame = -1;
        this.updateRate = sprite.updateRate;
        this.frameCount = sprite.frameCount;
    }

    draw(cc, dx, dy, dw, dh) {
        this.frame = (this.frame + this.updateRate) % this.frameCount;

        cc.drawImage(this.image, this.width * Math.floor(this.frame), 0, this.width, this.height, dx, dy, dw, dh);
    }
}