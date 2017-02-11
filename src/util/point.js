class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    assign(other) {
        this.x = other.x;
        this.y = other.y;
    }
}
