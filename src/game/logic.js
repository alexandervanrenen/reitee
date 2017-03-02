function updatePlayer(player) {
    // -------------------------------------------
    // Determine where the player wants to move to
    // -------------------------------------------
    let commanded_x_direction = 0;
    let commanded_y_direction = 0;

    // Keyboard movement
    if (player.move.left || player.move.right) {
        commanded_x_direction = (player.move.left ? -1 : 0) + (player.move.right ? 1 : 0);
    }
    if (player.move.up || player.move.down) {
        commanded_y_direction = (player.move.up ? -1 : 0) + (player.move.down ? 1 : 0);
    }

    // Touch and mouse movement
    if (input.gamePad.wantsToMove() && input.gamePad.activePlayer == player) {
        commanded_x_direction = input.gamePad.moveIntention.x;
        commanded_y_direction = input.gamePad.moveIntention.y;
    }

    // -------------------------------------------
    // Adjust speed: stop, turbo, max speed
    // -------------------------------------------
    let length = Math.sqrt(commanded_x_direction * commanded_x_direction + commanded_y_direction * commanded_y_direction);
    if (length > 1) {
        commanded_x_direction /= length;
        commanded_y_direction /= length;
    }

    player.velocity.x = player.velocity.x * 0.8 + commanded_x_direction * 0.2;
    player.velocity.y = player.velocity.y * 0.8 + commanded_y_direction * 0.2;

    // -------------------------------------------
    // Adjust movement if on arrow
    // -------------------------------------------
    let arrow = map.fields[Math.floor(player.pos.y / map.fieldSize)][Math.floor(player.pos.x / map.fieldSize)].arrow;
    if (arrow != null) {
        if (arrow.direction == "up") {
            player.velocity.y = -2;
        } else if (arrow.direction == "down") {
            player.velocity.y = 2;
        } else if (arrow.direction == "left") {
            player.velocity.x = -2;
        } else if (arrow.direction == "right") {
            player.velocity.x = 2;
        }
    }
    // -------------------------------------------
    // Try to update position
    // -------------------------------------------
    let x = player.pos.x + player.velocity.x * player.maxSpeed;
    let y = player.pos.y + player.velocity.y * player.maxSpeed;

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
    for (let i = 0; i < map.projectiles.length; i++) {
        let p = map.projectiles[i];
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
            util.removeFromArray(map.projectiles, i--);
    }
}

function updateElectricLines() {
    for (let i = 0; i < map.electricLines.length; i++) {
        let p = map.electricLines[i];
        p.doHitCheck(player1);
        p.doHitCheck(player2);
    }
}

function doVictoryCheck() {
    if (map.portal.area.isPointInside(player1.pos.x, player1.pos.y) && map.portal.area.isPointInside(player2.pos.x, player2.pos.y)) {
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

function updateSwitches() {
    for (let i = 0; i < map.switches.length; i++) {
        let p = map.switches[i];
        p.onTick();
    }
}

function updateLogic() {
    map.tick++;

    updatePlayer(player1);
    updatePlayerStyleDrag(player1);
    updatePlayer(player2);
    updatePlayerStyleDrag(player2);
    updateSplashParticle();
    updateElectricLines();
    updateSwitches();

    updateObjects();

    map.onTick();

    doVictoryCheck();
}
