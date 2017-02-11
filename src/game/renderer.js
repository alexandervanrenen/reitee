function drawCenteredRectangleInMap(x, y, width, height, color) {
    cc.fillStyle = color;
    cc.fillRect(map.pos.x + x - width / 2, map.pos.y + y - height / 2, width, height);
}

function drawCenteredCircleInMap(x, y, radius, color, colorBorder, borderSize) {
    cc.beginPath();
    cc.arc(map.pos.x + x, map.pos.y + y, radius / 2, 0, 2 * Math.PI, false);
    cc.fillStyle = color;
    cc.fill();
    cc.lineWidth = borderSize;
    cc.strokeStyle = colorBorder;
    cc.stroke();
}

function drawPlayers() {
    for (let i = 0; i < player1.styleDrag.length; i++) {
        let pos = player1.styleDrag[i].pos;
        let color = player1.styleDrag[i].getColor();
        drawCenteredRectangleInMap(pos.x, pos.y, 3, 3, color);

        pos = player2.styleDrag[i].pos;
        color = player2.styleDrag[i].getColor();
        drawCenteredRectangleInMap(pos.x, pos.y, 3, 3, color);
    }
}

function drawField(field, x, y) {
    cc.fillStyle = field.color;
    cc.fillRect(map.pos.x + x * map.fieldSize + 1, map.pos.y + y * map.fieldSize + 1, map.fieldSize - 2, map.fieldSize - 2);
}

function drawMenu() {
    cc.fillStyle = constants.menuTextColor;
    cc.font = "25px Arial";
    cc.fillText("Player 1: " + player1.score, 20, 590);
    cc.fillText("Player 2: " + player2.score, 300, 590);

    if (constants.debug) {
        fpsCounter.onUpdate(cc);
    }
}

function drawGraphics() {
    cc.fillStyle = constants.backGroundColor;
    cc.fillRect(0, 0, c.width, c.height);

    for (y = 0; y < map.fields.length; y++) {
        for (x = 0; x < map.fields[y].length; x++) {
            drawField(map.fields[y][x], x, y);
        }
    }

    for (i = 0; i < map.gemos.length; i++) {
        map.gemos[i].draw();
    }

    drawPlayers();

    if (map.victory != null) {
        cc.fillStyle = map.victory.color;
        cc.fillRect(map.pos.x + map.victory.area.x, map.pos.y + map.victory.area.y, map.victory.area.width, map.victory.area.height);
        cc.fillStyle = "black";
        cc.rect(map.pos.x + map.victory.area.x, map.pos.y + map.victory.area.y, map.victory.area.width, map.victory.area.height);
        cc.stroke();
    }

    drawMenu();
}
