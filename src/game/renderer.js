function drawPlayer(player) {
    cc.fillStyle = player.color;
    cc.fillRect(map.pos.x + player.pos.x, map.pos.y + player.pos.y, player.width, player.height);
}

function drawField(field, x, y) {
    cc.fillStyle = field.color;
    cc.fillRect(map.pos.x + x * map.fileSize + 1, map.pos.y + y * map.fileSize + 1, map.fileSize - 2, map.fileSize - 2);
}

function drawProjectile(projectile) {
    cc.fillStyle = projectile.color;
    cc.fillRect(map.pos.x + projectile.pos.x, map.pos.y + projectile.pos.y, projectile.size, projectile.size);
}

function drawScores() {
    cc.fillStyle = "white";
    cc.font = "25px Arial";
    cc.fillText("Player 1: " + player1.score, 20, 590);
    cc.fillText("Player 1: " + player2.score, 300, 590);
}

function drawEffects() {
    for (i = 0; i < map.effects.length; i++) {
        let e = map.effects[i];
        cc.fillStyle = e.color;
        cc.fillRect(map.pos.x + e.pos.x, map.pos.y + e.pos.y, e.size, e.size);
    }
}

function drawGraphics() {
    cc.fillStyle = "black";
    cc.fillRect(0, 0, c.width, c.height);

    for (y = 0; y < map.fields.length; y++) {
        for (x = 0; x < map.fields[y].length; x++) {
            drawField(map.fields[y][x], x, y);
        }
    }

    drawEffects();

    for (i = 0; i < map.projectiles.length; i++) {
        drawProjectile(map.projectiles[i]);
    }

    drawPlayer(player1);
    drawPlayer(player2);

    drawScores();
}
