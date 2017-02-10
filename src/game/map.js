function StraightProjectile(pos, move, size) {
    this.pos = {x: pos.x, y: pos.y};
    this.move = move;
    this.size = size;
    this.color = 'black';
    this.isDead = false;

    this.onWallCollision = function () {
        isDead = true;
    };

    this.onPlayerCollision = function (player) {
        player.die();
        isDead = true;
    };

    this.onTick = function () {
        this.pos.x += this.move.x;
        this.pos.y += this.move.y;
    };

    this.draw = function () {
        drawCenteredRectangleInMap(this.pos.x, this.pos.y, this.size, this.size, this.color);
    };
}

function Effect(pos) {
    this.pos = {x: pos.x, y: pos.y};
    this.size = 3;
    this.color = 'black';
}

class Map {
    constructor() {
        this.pos = {x: 0, y: 0};
        this.fieldSize = 0;
        this.fieldBounds = {x: 0, y: 0};
        this.bounds = {x: 0, y: 0};
        this.fields = new Array(0);
        this.effects = new Array(0);
        this.gemos = new Array(0);

        this.onTick = function () {
        };

        this.removeGemo = function (obj) {
            let pos = this.gemos.indexOf(obj);
            util.removeFromArray(this.gemos, pos);
        };

        this.isWalkable = function (x, y) {
            let fieldY = Math.floor(y / this.fieldSize);
            if (0 <= fieldY && fieldY < this.fields.length) {
                let fieldX = Math.floor(x / this.fieldSize);
                if (0 <= fieldX && fieldX < this.fields[fieldY].length) {
                    return this.fields[fieldY][fieldX].walkable;
                }
            }
            return false;
        }
    }
}

map = Level_1.createMap();
player1 = Level_1.createPlayer1();
player2 = Level_1.createPlayer2();
