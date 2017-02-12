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

class ElectricLine {
    constructor(begin, end, color) {
        this.begin = new Point(begin.x, begin.y);
        this.end = new Point(end.x, end.y);
        this.color = color;
        this.points = new Array(5);
        for (let i = 0; i < 5; i++) {
            this.points[i] = new Array(0);
        }
        this.updatePoints();
    }

    updatePoints() {
        let isVertical = this.begin.x == this.end.x;

        for (let i = 0; i < this.points.length; i++) {
            let x = this.begin.x;
            let y = this.begin.y;
            let asd = 0;
            this.points[i].length = 0;

            while (util.distance_c(x, y, this.end.x, this.end.y) >= 20) {
                if (isVertical) {
                    y += Math.random() * 10;
                    let zzDirection = Math.random() * Math.random() * 8;
                    x += x > this.begin.x ? -zzDirection : zzDirection;
                    this.points[i].push(new Point(x, y));
                } else {
                    throw "not implemented";
                }
                asd++;
            }
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
        this.blood = 0;
        this.electricLines = new Array(0);

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

        this.fp_to_rp = function (x, y) {
            return new Point(x * this.fieldSize, y * this.fieldSize);
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