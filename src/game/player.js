class DragParticle {

    constructor(x, y, despawnChance, colorTable) {
        this.pos = new Point(x, y);
        this.alpha = 1.0;
        this.colorTable = colorTable;
        this.despawnChance = despawnChance;
        this.ticks = 0;
    }

    getColor() {
        return this.colorTable[this.ticks];
    }

    onTick(playerPos) {
        this.alpha *= 0.9;
        this.ticks++;
        if (this.alpha <= 0.001 || Math.random() <= this.despawnChance) {
            let angle = Math.random() * Math.PI * 2;
            this.pos.x = playerPos.x + Math.cos(angle) * (Math.random() * Math.random()) * 10;
            this.pos.y = playerPos.y + Math.sin(angle) * (Math.random() * Math.random()) * 10;
            this.alpha = 1.0;
            this.ticks = 0;
        }
    }
}

function Player(id, pos, dragColorTable, name) {
    this.id = id;
    this.pos = new Point(pos.x, pos.y);
    this.size = 20;
    this.move = {up: false, down: false, left: false, right: false, turbo: false};
    this.maxSpeed = 2.1;
    this.velocity = new Point(0.0, 0.0);
    this.death = 0;
    this.spawnPos = new Point(pos.x, pos.y);
    this.name = name;

    // Style drag
    this.styleDrag = new Array(constants.playerStyleDragLength);
    for (let i = 0; i < this.styleDrag.length; i++)
        this.styleDrag[i] = new DragParticle(pos.x, pos.y, constants.styleDrag.despawnChance, dragColorTable);

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
        for (let i = 0; i < 200; i++) {
            map.splashParticles.push(new SplashParticle(this));
        }

        this.death++;
        this.onTeleport(this.spawnPos);
    };

    this.onTeleport = function (pos) {
        this.pos.assign(pos);
        for (let i = 0; i < this.styleDrag.length; i++)
            this.styleDrag[i].pos.assign(pos);
    }
}
