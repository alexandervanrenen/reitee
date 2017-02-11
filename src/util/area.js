class Area {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isPointInside(x, y) {
        return this.x <= x && x <= this.x + this.width
            && this.y <= y && y <= this.y + this.height;
    };
}
