function drawCenteredRectangleInMap(x, y, width, height, color) {
    cc.fillStyle = color;
    cc.fillRect(map.pos.x + x - width / 2, map.pos.y + y - height / 2, width, height);
}

function drawCenteredCircleInMap(x, y, radius, color, colorBorder) {
    cc.beginPath();
    cc.arc(map.pos.x + x, map.pos.y + y, radius / 2, 0, 2 * Math.PI, false);
    cc.fillStyle = color;
    cc.fill();
    cc.lineWidth = 2;
    cc.strokeStyle = colorBorder;
    cc.stroke();
}

function drawPlayer(player) {
    for (let i = 0; i < player.styleDrag.length; i++) {
        let pos = player.styleDrag[i];
        let alpha = constants.playerDragFade[i];
        let color = constants.colors.player.one.drag(alpha);
        drawCenteredCircleInMap(pos.x, pos.y, player.size, color, "black");
    }

    drawCenteredCircleInMap(player.pos.x, player.pos.y, player.size, player.colorScheme.main, "black");
}

function drawField(field, x, y) {
    cc.fillStyle = field.color;
    cc.fillRect(map.pos.x + x * map.fieldSize + 1, map.pos.y + y * map.fieldSize + 1, map.fieldSize - 2, map.fieldSize - 2);
}

function drawMenu() {
    cc.fillStyle = "white";
    cc.font = "25px Arial";
    cc.fillText("Player 1: " + player1.score, 20, 590);
    cc.fillText("Player 2: " + player2.score, 300, 590);
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

    drawPlayer(player1);
    drawPlayer(player2);

    drawMenu();

    if (map.victory != null) {
        cc.fillStyle = map.victory.color;
        cc.fillRect(map.pos.x + map.victory.area.x, map.pos.y + map.victory.area.y, map.victory.area.width, map.victory.area.height);
        cc.fillStyle = "black";
        cc.rect(map.pos.x + map.victory.area.x, map.pos.y + map.victory.area.y, map.victory.area.width, map.victory.area.height);
        cc.stroke();
    }
}
