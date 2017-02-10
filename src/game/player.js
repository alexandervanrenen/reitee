function Player(pos, color, spawn) {
    this.pos = {x: pos.x, y: pos.y};
    this.size = 20;
    this.color = color;
    this.move = {x: 0.0, y: 0.0};
    this.speed = 2.0;
    this.score = 0;
    this.spawn = spawn;
    spawn(this);

    this.moveUp = function (stop) {
        this.move.y = stop ? 0.0 : -1.0;
    };
    this.moveDown = function (stop) {
        this.move.y = stop ? 0.0 : 1.0;
    };
    this.moveLeft = function (stop) {
        this.move.x = stop ? 0.0 : -1.0;
    };
    this.moveRight = function (stop) {
        this.move.x = stop ? 0.0 : 1.0;
    };

    this.die = function () {
        this.score -= 5;
        this.spawn(this);
    }
}
