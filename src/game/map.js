function Projectile(pos, good) {
    this.pos = {x: pos.x, y: pos.y};
    this.move = {x: Math.random(), y: Math.random()};
    this.move = {x: Math.sign(this.move.x) * 0.5 + this.move.x, y: Math.sign(this.move.y) * 0.5 + this.move.y}
    this.speed = good ? 1.0 : 2.0;
    this.size = 10;
    this.color = good ? 'green' : 'red';
    this.isGood = good;

    this.onPlayerCollision = function (player) {
        if (!this.isGood) {
            player.score -= 1;
            map.effects.push(new Effect(player.pos));
        } else {
            player.score += 10;
            this.pos = {x: Math.random() * map.bounds.x, y: Math.random() * map.bounds.y};
            this.move = {x: Math.random(), y: Math.random()};
            this.move = {x: Math.sign(this.move.x) * 0.5 + this.move.x, y: Math.sign(this.move.y) * 0.5 + this.move.y}
        }
    }
}

function Effect(pos) {
    this.pos = {x: pos.x, y: pos.y};
    this.size = 3;
    this.color = 'black';
}

function Map() {
    this.pos = {x: 20, y: 50};
    this.fileSize = 50;
    this.filesBounds = {x: 15, y: 10};
    this.bounds = {x: this.filesBounds.x * this.fileSize, y: this.filesBounds.y * this.fileSize};

    this.fields = new Array(this.filesBounds.y);
    for (y = 0; y < this.filesBounds.y; y++) {
        this.fields[y] = new Array(this.filesBounds.x);
        for (x = 0; x < this.filesBounds.x; x++) {
            this.fields[y][x] = {walkable: true, color: 'yellow'};
        }
    }

    this.projectiles = new Array(10);
    for (i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i] = new Projectile({x: i * 80, y: 10}, false);
    }
    this.projectiles.push(new Projectile({x: this.bounds.x / 2, y: this.bounds.y / 2}, true));

    this.effects = new Array(0);
}

map = new Map();
