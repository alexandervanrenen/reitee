function drawCenteredRectangleInMap(x, y, width, height, color) {
    cc.fillStyle = color;
    cc.fillRect(map.pos.x + x - width / 2, map.pos.y + y - height / 2, width, height);
}

function drawPlayers() {
    drawCenteredRectangleInMap(player1.pos.x, player1.pos.y, player1.size, player1.size, player1.color);
    drawCenteredRectangleInMap(player2.pos.x, player2.pos.y, player2.size, player2.size, player2.color);
}

function drawField(field, x, y) {
    cc.fillStyle = field.color;
    cc.fillRect(map.pos.x + x * map.fieldSize + 1, map.pos.y + y * map.fieldSize + 1, map.fieldSize - 2, map.fieldSize - 2);
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

    for (i = 0; i < map.gemos.length; i++) {
        map.gemos[i].draw();
    }

    drawPlayers();

    drawScores();
}
