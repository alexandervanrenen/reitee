function StraightProjectile(pos, move, size) {
    this.pos = {x: pos.x, y: pos.y};
    this.move = move;
    this.size = size;
    this.color = constants.projectile.color;
    this.isDead = false;

    this.onWallCollision = function () {
        this.isDead = true;
    };

    this.onPlayerCollision = function (player) {
        player.die();
        this.isDead = true;
    };

    this.onTick = function () {
        this.pos.x += this.move.x;
        this.pos.y += this.move.y;
    };

    this.draw = function () {
        drawCenteredCircleInMapWithBorder(this.pos.x, this.pos.y, this.size, this.color, "black", 1);
    };
}

class SplashParticle {
    constructor(player) {
        this.pos = new Point(player.pos.x, player.pos.y);
        this.velocity = new Point((Math.random() - 0.5) + (Math.random() * 2 * player.velocity.x),
            (Math.random() - 0.5) + (Math.random() * 2 * player.velocity.y));
        this.isDead = false;
        this.creationTick = map.tick;
    }

    onTick() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.velocity.y *= 0.99;
        this.velocity.x *= 0.99;

        if (this.creationTick + 30 < map.tick) {
            this.isDead = true;
        }
    }
}

class Map {
    constructor() {
        this.pos = {x: 0, y: 0};
        this.fieldSize = 0;
        this.fieldBounds = {x: 0, y: 0};
        this.bounds = {x: 0, y: 0};
        this.fields = new Array(0);
        this.gemos = new Array(0);
        this.tick = 0;
        this.backCanvas = null;
        this.backCtx = null;

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
        };

        this.f_to_r = function (x) {
            return x * this.fieldSize;
        };

        this.portal = null;

        this.splashParticles = new Array(0);
    }
}

function

loadLevel(levelGenerator) {
    map = levelGenerator.createMap();
    player1 = levelGenerator.createPlayer1();
    player2 = levelGenerator.createPlayer2();
}