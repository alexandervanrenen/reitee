function updatePlayer(player) {
    // Update velocity
    let commanded_x_direction = (player.move.left ? -1 : 0) + (player.move.right ? 1 : 0);
    let commanded_y_direction = (player.move.up ? -1 : 0) + (player.move.down ? 1 : 0);

    if (commanded_x_direction == 0 && Math.abs(player.velocity.x) > 0) { // Decelerate x
        if (Math.abs(player.velocity.x) > player.acceleration) {
            player.velocity.x -= Math.sign(player.velocity.x) * player.acceleration;
        } else {
            player.velocity.x = 0;
        }
    }
    if (commanded_y_direction == 0 && Math.abs(player.velocity.y) > 0) { // Decelerate y
        if (Math.abs(player.velocity.y) > player.acceleration) {
            player.velocity.y -= Math.sign(player.velocity.y) * player.acceleration;
        } else {
            player.velocity.y = 0;
        }
    }

    let maxSpeed = player.move.turbo ? player.maxSpeed * 2.0 : player.maxSpeed;

    player.velocity.x += commanded_x_direction * (maxSpeed - player.velocity.x) * (player.move.turbo ? 0.1 : 0.5);
    player.velocity.y += commanded_y_direction * (maxSpeed - player.velocity.y) * (player.move.turbo ? 0.1 : 0.5);

    player.velocity.x = util.cap(player.velocity.x, -maxSpeed, maxSpeed);
    player.velocity.y = util.cap(player.velocity.y, -maxSpeed, maxSpeed);

    // Try to update position
    let x = player.pos.x + player.velocity.x;
    let y = player.pos.y + player.velocity.y;

    if (map.isWalkable(x, y)) {
        player.pos.x = x;
        player.pos.y = y;
        return;
    }

    if (map.isWalkable(player.pos.x, y)) {
        player.pos.y = y;
    } else if (map.isWalkable(x, player.pos.y)) {
        player.pos.x = x;
    }
}

function updatePlayerStyleDrag(player) {
    for (let i = 0; i < player.styleDrag.length; i++) {
        player.styleDrag[i].onTick(player.pos);
    }
}

function updateObjects() {
    for (i = 0; i < map.gemos.length; i++) {
        let p = map.gemos[i];
        p.onTick();

        if (p.pos.x <= 0)
            p.onWallCollision();
        if (p.pos.y <= 0)
            p.onWallCollision();
        if (p.pos.x >= map.bounds.x)
            p.onWallCollision();
        if (p.pos.y >= map.bounds.y)
            p.onWallCollision();

        if (!map.isWalkable(p.pos.x, p.pos.y)) {
            p.onWallCollision();
        }

        if (util.distance(player1.pos, p.pos) <= (p.size + player1.size) / 2)
            p.onPlayerCollision(player1);
        if (util.distance(player2.pos, p.pos) <= (p.size + player2.size) / 2)
            p.onPlayerCollision(player2);

        if (p.isDead)
            util.removeFromArray(map.gemos, i--);
    }
}

function doVictoryCheck() {
    if (map.portal.area.isPointInside(player1.pos.x, player1.pos.y) || map.portal.area.isPointInside(player2.pos.x, player2.pos.y)) {
        throw "Victory";
    }
}

function updateSplashParticle() {
    for (let i = 0; i < map.splashParticles.length; i++) {
        let p = map.splashParticles[i];
        p.onTick();

        if (!map.isWalkable(p.pos.x, p.pos.y)) {
            p.isDead = true;
        }
    }
}

function updateLogic() {
    map.tick++;

    updatePlayer(player1);
    updatePlayerStyleDrag(player1);
    updatePlayer(player2);
    updatePlayerStyleDrag(player2);
    updateSplashParticle();

    updateObjects();

    map.onTick();

    doVictoryCheck();
}
