function drawCenteredRectangleInMap(x, y, width, height, color) {
    cc.fillStyle = color;
    cc.fillRect(map.pos.x + x - width / 2, map.pos.y + y - height / 2, width, height);
}

function drawCenteredCircleInMapWithBorder(x, y, radius, color, colorBorder, borderSize) {
    cc.beginPath();
    cc.arc(map.pos.x + x, map.pos.y + y, radius / 2, 0, 2 * Math.PI, false);
    cc.fillStyle = color;
    cc.fill();
    cc.lineWidth = borderSize;
    cc.strokeStyle = colorBorder;
    cc.stroke();
}

function drawCenteredCircleInMap(x, y, radius, color) {
    cc.beginPath();
    cc.arc(map.pos.x + x, map.pos.y + y, radius / 2, 0, 2 * Math.PI, false);
    cc.fillStyle = color;
    cc.fill();
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

function drawMenu_player(offset, player) {
    cc.font = "25px Arial";
    cc.fillText(player.name, offset.x + 50, offset.y);
    cc.font = "15px Arial";
    cc.fillText("Death Counter: " + player.death, offset.x, offset.y + 30);
}

function drawMenu_maps(offset) {
    cc.font = "25px Arial";
    cc.fillStyle = constants.menuTextColor;
    cc.fillText(map.name, offset.x, offset.y);

    cc.font = "15px Arial";
    for (let x = 1; x <= 20; x++) {
        cc.fillText(x, 100 + offset.x + x * 20, 1 + offset.y);
    }
}

function drawMenu() {

    drawMenu_maps({x: 50, y: 30});
    drawMenu_player({x: 100, y: 560}, player1);
    drawMenu_player({x: 400, y: 560}, player2);

    if (constants.debug) {
        fpsCounter.onUpdate(cc);
    }
}

function drawPortal() {
    if (map.portal != null) {
        map.portal.sprite.draw(cc, map.pos.x + map.portal.area.x, map.pos.y + map.portal.area.y, map.portal.area.width, map.portal.area.height);
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

    drawPortal();

    drawMenu();
}
