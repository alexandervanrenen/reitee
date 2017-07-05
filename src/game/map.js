class StraightProjectile {

    constructor(pos, move, size, onCollisionAction) {
        this.startPos = {x: pos.x, y: pos.y};
        this.pos = {x: pos.x, y: pos.y};
        this.move = move;
        this.size = size;
        this.color = constants.projectile.color;
        this.isDead = false;
        this.onCollisionAction = onCollisionAction;
    }

    onWallCollision() {
        this.onCollisionAction(this);
    };

    onPlayerCollision(player) {
        player.die();
        this.isDead = true;
    };

    onTick() {
        this.pos.x += this.move.x;
        this.pos.y += this.move.y;
    };

    static dieOnCollision(particle) {
        particle.isDead = true;
    }

    static reSpawnOnCollision(particle) {
        particle.pos.x = particle.startPos.x;
        particle.pos.y = particle.startPos.y;
    }
}

class TwisterProjectile {

    constructor(center, radius, starting_angle, speed, size) {
        this.center = {x: center.x, y: center.y};
        this.radius = radius;
        this.angle = starting_angle;
        this.size = size;
        this.speed = speed;
        this.color = constants.projectile.color;
        this.isDead = false;
        this.pos = {x: this.center.x + Math.cos(this.angle) * this.radius, y: this.center.y + Math.sin(this.angle) * this.radius};
    }

    onWallCollision() {
        // this.isDead = true;
    };

    onPlayerCollision(player) {
        player.die();
        this.isDead = true;
    };

    onTick() {
        this.angle += this.speed * map.twisterDirection;
        if (this.angle >= 360) {
            this.angle -= 360;
        }
        this.pos.x = this.center.x + Math.cos(this.angle) * this.radius;
        this.pos.y = this.center.y + Math.sin(this.angle) * this.radius;
    };

    static createTwister(map, center, distance, wings, projectiles_per_wing, speed, size) {
        for (let w = 0; w < wings; w++) {
            for (let i = 1; i < projectiles_per_wing; i++) {
                map.projectiles.push(new TwisterProjectile(center, map.f_to_r(i * distance), (2 * Math.PI / wings) * w + i * 0.1, speed, size));
            }
        }
    };
}

class Switch {
    constructor(type, x, y, width, height, action) {
        this.type = type;
        if (this.type == "stand_on") {
            this.colorNormal = constants.switches.stand_on_normal;
            this.colorPushed = constants.switches.stand_on_pushed;
        } else if (this.type == "push_once") {
            this.colorNormal = constants.switches.push_once_normal;
            this.colorPushed = constants.switches.push_once_pushed;
        }
        this.area = new Area(x, y, width, height);
        this.someoneIn = false;
        this.isDown = false;
        this.action = action;
    }

    reset() {
        if (this.type == "push_once") {
            if (this.isDown) {
                this.action();
                this.isDown = false;
            }
            return;
        }
    }

    getColor() {
        if (this.type == "stand_on") {
            return this.someoneIn ? this.colorPushed : this.colorNormal;
        } else if (this.type == "push_once") {
            return this.isDown ? this.colorPushed : this.colorNormal;
        }
        throw "Not Implemented";
    }

    onTick() {
        if (this.area.isPointInside(player1.pos.x, player1.pos.y) || this.area.isPointInside(player2.pos.x, player2.pos.y)) {
            if (!this.someoneIn) {
                // Someone entered
                if (this.type == "stand_on") {
                    if (map.pushingSwitchCounter == 0) {
                        this.action();
                    }
                    map.pushingSwitchCounter++;
                } else if (this.type == "push_once") {
                    if (this.isDown == 0) {
                        this.isDown = true;
                        this.action();
                    }
                } else {
                    throw "Not Implemented";
                }
            }
            this.someoneIn = true;
        } else {
            if (this.someoneIn) {
                // Someone left
                if (this.type == "stand_on") {
                    map.pushingSwitchCounter--;
                    if (map.pushingSwitchCounter == 0) {
                        this.action();
                    }
                } else if (this.type == "push_once") {
                } else {
                    throw "Not Implemented";
                }
            }
            this.someoneIn = false;
        }
    }

    static swapPolarityAction() {
        for (let x of map.electricLines) {
            x.swapPolarity();
        }
    }

    static invertTwisters() {
        map.twisterDirection *= -1;
    }
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
    constructor(begin, end, polarity) {
        this.begin = new Point(begin.x, begin.y);
        this.end = new Point(end.x, end.y);
        this.polarity = polarity; // what do we kill
        this.points = new Array(5);
        for (let i = 0; i < 5; i++) {
            this.points[i] = new Array(0);
        }
        this.updatePoints();
        if (this.begin.x == this.end.x) {
            this.area = new Area(this.begin.x - 5, this.begin.y, 10, Math.abs(this.begin.y - this.end.y));
        } else {
            this.area = new Area(this.begin.x, this.begin.y - 5, Math.abs(this.begin.x - this.end.x), 10);
        }

        if (this.polarity == "none") {
            this.color = constants.electricalLines.none;
        } else if (this.polarity == "all") {
            this.color = constants.electricalLines.all;
        } else if (this.polarity == "player1") {
            this.color = constants.electricalLines.player1;
        } else if (this.polarity == "player2") {
            this.color = constants.electricalLines.player2;
        }
    }

    updatePoints() {
        let isVertical = this.begin.x == this.end.x;
        let isHorizontal = this.begin.y == this.end.y;

        for (let i = 0; i < this.points.length; i++) {
            let x = this.begin.x;
            let y = this.begin.y;
            this.points[i].length = 0;

            while (util.distance_c(x, y, this.end.x, this.end.y) >= 15) {
                if (isVertical) {
                    y += Math.random() * 10;
                    let zzDirection = Math.random() * Math.random() * 8;
                    x += x > this.begin.x ? -zzDirection : zzDirection;
                    this.points[i].push(new Point(x, y));
                } else if (isHorizontal) {
                    x += Math.random() * 10;
                    let zzDirection = Math.random() * Math.random() * 8;
                    y += y > this.begin.y ? -zzDirection : zzDirection;
                    this.points[i].push(new Point(x, y));
                } else {
                    throw "not implemented";
                }
            }
        }
    }

    swapPolarity() {
        if (this.polarity == "none") {
            this.polarity = "all";
            this.color = constants.electricalLines.all;
        } else if (this.polarity == "all") {
            this.polarity = "none";
            this.color = constants.electricalLines.none;
        } else if (this.polarity == "player1") {
            this.polarity = "player2";
            this.color = constants.electricalLines.player2;
        } else if (this.polarity == "player2") {
            this.polarity = "player1";
            this.color = constants.electricalLines.player1;
        }
    }

    doesPolarityKillPlayer(player) {
        switch (this.polarity) {
            case "none":
                return false;
            case "all":
                return true;
            case "player1":
                return player.id == "player1";
            case "player2":
                return player.id == "player2";
        }
        throw "Unreachable";
    }

    doHitCheck(player) {
        if (this.doesPolarityKillPlayer(player) && this.area.isPointInside(player.pos.x, player.pos.y)) {
            if (!constants.disableElectrics) {
                player.die();
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
        this.projectiles = new Array(0);
        this.tick = 0;
        this.backCanvas = null;
        this.backCtx = null;
        this.blood = 0;
        this.electricLines = new Array(0);
        this.switches = new Array(0);
        this.pushingSwitchCounter = 0;
        this.arrows = new Array(0);
        this.twisterDirection = 1;

        this.onTick = function () {
        };

        this.removeProjectile = function (obj) {
            let pos = this.projectiles.indexOf(obj);
            util.removeFromArray(this.projectiles, pos);
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

        this.addArrow = function (x, y, direction) {
            let a = new Arrow(this.f_to_r(x), this.f_to_r(y), direction);
            this.fields[y][x].arrow = a;
            this.arrows.push(a);
        };

        this.f_to_r = function (x) {
            return x * this.fieldSize;
        };

        this.fp_to_rp = function (x, y) {
            return new Point(x * this.fieldSize, y * this.fieldSize);
        };

        this.portal = null;

        this.splashParticles = new Array(0);
        this.deadSplashParticles = new Array(0); // Just an array of points .. needed for redrawing after resizing
    }
}

var map;
var player1;
var player2;

function loadLevel(levelGenerator) {
    map = levelGenerator.createMap();
    player1 = levelGenerator.createPlayer1();
    player2 = levelGenerator.createPlayer2();
    input.gamePad.activePlayer = player1;
    input.gamePad.switchTick = 0;

    for (let i = 0; i < 100; i++) {
        updateLogic();
    }
}