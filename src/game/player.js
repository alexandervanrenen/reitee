function Player(colorScheme, pos) {
    this.pos = new Point(pos.x, pos.y);
    this.size = 20;
    this.colorScheme = colorScheme;
    this.move = {up: false, down: false, left: false, right: false, turbo: false};
    this.maxSpeedFactor = 2.0;
    this.score = 0;
    this.spawnPos = new Point(pos.x, pos.y);
    this.styleDrag = new Array(constants.playerStyleDragLength);
    for (let i = 0; i < this.styleDrag.length; i++)
        this.styleDrag[i] = new Point(pos.x, pos.y);

    this.moveUp = function (stop) {
        this.move.up = !stop;
    };
    this.moveDown = function (stop) {
        this.move.down = !stop;
    };
    this.moveLeft = function (stop) {
        this.move.left = !stop;
    };
    this.moveRight = function (stop) {
        this.move.right = !stop;
    };
    this.moveTurbo = function (stop) {
        this.move.turbo = !stop;
    };

    this.die = function () {
        this.score -= 5;
        this.onTeleport(this.spawnPos);
    };

    this.speed = function () {
        return this.maxSpeedFactor * (this.move.turbo ? 2.0 : 1.0);
    };

    this.onTeleport = function (pos) {
        this.pos.assign(pos);
        for (let i = 0; i < this.styleDrag.length; i++)
            this.styleDrag[i].assign(pos);
    }
}
