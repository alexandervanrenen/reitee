function updatePlayer(player) {
    let x = player.pos.x + (player.move.left ? -player.speed() : 0) + (player.move.right ? player.speed() : 0);
    let y = player.pos.y + (player.move.up ? -player.speed() : 0) + (player.move.down ? player.speed() : 0);

    // First move in x direction then in x
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
    for (let i = 0; i < player.styleDrag.length - 1; i++) {
        player.styleDrag[i].assign(player.styleDrag[i + 1]);
    }
    player.styleDrag[player.styleDrag.length - 1].assign(player.pos);
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

        if (util.distance(player1.pos, p.pos) <= (p.size + player1.size) / 2)
            p.onPlayerCollision(player1);
        if (util.distance(player2.pos, p.pos) <= (p.size + player2.size) / 2)
            p.onPlayerCollision(player2);

        if (p.isDead)
            util.removeFromArray(map.gemos, i--);
    }
}

tick = 0;

function updateLogic() {
    tick++;

    updatePlayer(player1);
    updatePlayerStyleDrag(player1);
    updatePlayer(player2);
    updatePlayerStyleDrag(player2);

    updateObjects();

    map.onTick(tick);
}
