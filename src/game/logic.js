function updatePlayer(player) {
    player.pos.x += player.move.x * player.speed;
    player.pos.y += player.move.y * player.speed;
}

function updateProjectiles() {
    for (i = 0; i < map.projectiles.length; i++) {
        let p = map.projectiles[i];
        p.pos.x += p.move.x * p.speed;
        p.pos.y += p.move.y * p.speed;

        if (p.pos.x <= 0) {
            p.move.x *= -1;
        }
        if (p.pos.y <= 0) {
            p.move.y *= -1;
        }
        if (p.pos.x >= map.bounds.x) {
            p.move.x *= -1;
        }
        if (p.pos.y >= map.bounds.y) {
            p.move.y *= -1;
        }

        if (util.distance(player1.pos, p.pos) <= p.size) {
            p.onPlayerCollision(player1);
        }
        if (util.distance(player2.pos, p.pos) <= p.size) {
            p.onPlayerCollision(player2);
        }
    }
}

function updateLogic() {
    updatePlayer(player1);
    updatePlayer(player2);

    updateProjectiles();
}
