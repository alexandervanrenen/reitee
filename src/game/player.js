function Player(pos, color) {
    this.pos = {x: pos.x, y: pos.y};
    this.width = 20;
    this.height = 20;
    this.color = color;
    this.move = {x: 0.0, y: 0.0};
    this.speed = 2.0;
    this.score = 0;

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
}

player1 = new Player({x: 100, y: 300}, 'blue');
player2 = new Player({x: 400, y: 300}, 'green');
