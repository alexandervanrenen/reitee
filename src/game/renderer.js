class Renderer {
    constructor() {
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = 800;
        this.height = 600;
        this.scale = 1;
    }

    
}
cr = new Renderer();

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

function drawCenteredCircleInMap_back(x, y, radius, color) {
    map.backCtx.beginPath();
    map.backCtx.arc(map.pos.x + x, map.pos.y + y, radius / 2, 0, 2 * Math.PI, false);
    map.backCtx.fillStyle = color;
    map.backCtx.fill();
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

function drawFields(genericCanvas) {
    for (y = 0; y < map.fields.length; y++) {
        for (x = 0; x < map.fields[y].length; x++) {
            let field = map.fields[y][x];
            genericCanvas.fillStyle = field.color;
            genericCanvas.fillRect(map.pos.x + x * map.fieldSize + 1, map.pos.y + y * map.fieldSize + 1, map.fieldSize - 2, map.fieldSize - 2);
        }
    }
}

function drawMenu_player(offset, player) {
    cc.font = "18px Arial";
    cc.fillText(player.name, offset.x, offset.y);
    cc.font = "15px Arial";
    cc.fillText("Death: " + player.death, offset.x + 80, offset.y);
}

function drawMenu_maps(offset) {
    cc.font = "25px Arial";
    cc.fillStyle = constants.menuTextColor;
    cc.fillText(map.name, offset.x, offset.y + 5);

    cc.font = "15px Arial";
    for (let x = 1; x <= 20; x++) {
        cc.fillStyle = x == map.id ? constants.menuActiveLevelColor : constants.menuTextColor;
        cc.fillText(x, 100 + offset.x + x * 20, 1 + offset.y);
    }
}

function drawBloodCount(offset) {
    let blood = map.blood;

    if (blood == 0) {
        cc.font = "20px Arial";
        cc.fillStyle = constants.menuTextColor;
        cc.fillText("No Bloodshed", offset.x, offset.y);
    } else if (blood < 500) {
        cc.font = "20px Arial";
        cc.fillStyle = constants.menuTextColor;
        cc.fillText("a little bit of blood: " + blood, offset.x, offset.y);
    } else if (blood < 1000) {
        cc.font = "22px Arial";
        cc.fillStyle = constants.bloodCounterLight;
        cc.fillText("there is some BLOOD: " + blood, offset.x, offset.y);
    } else if (blood < 2000) {
        cc.font = "24px Comic Sans MS";
        cc.fillStyle = constants.bloodCounterMedium;
        cc.fillText("OMG, So Much BLOOD: " + blood, offset.x, offset.y);
    } else if (blood < 5000) {
        cc.font = "bold 26px Comic Sans MS";
        cc.fillStyle = constants.bloodCounterMedium;
        cc.fillText("WTF!! BLOOD EVERYWHERE: " + blood, offset.x, offset.y);
    } else if (blood < 10000) {
        cc.font = "bolder 28px Comic Sans MS";
        cc.fillStyle = constants.bloodCounterExtreme;
        cc.fillText("BLOOD BLOOD BLOOD !!!!! " + blood, offset.x, offset.y);
    } else {
        cc.font = "22px Arial";
        cc.fillStyle = constants.menuTextColor;
        cc.fillText("ok now, finish the level already .." + blood, offset.x, offset.y);
    }
}

function drawMenu() {
    drawMenu_maps({x: 50, y: 30});
    drawMenu_player({x: 100, y: 550}, player1);
    drawMenu_player({x: 100, y: 580}, player2);
    drawBloodCount({x: 300, y: 570});

    if (constants.debug) {
        fpsCounter.onUpdate(cc);
    }
}

function drawPortal() {
    if (map.portal != null) {
        map.portal.sprite.draw(cc, map.pos.x + map.portal.area.x, map.pos.y + map.portal.area.y, map.portal.area.width, map.portal.area.height);
    }
}

function drawSplashParticles() {
    let anyoneWasDead = false;
    for (let i = 0; i < map.splashParticles.length; i++) {
        let p = map.splashParticles[i];
        drawCenteredCircleInMap(p.pos.x, p.pos.y, 3, constants.splashParticleColor);

        if (map.splashParticles[i].isDead) {
            anyoneWasDead = true;
            drawCenteredCircleInMap_back(p.pos.x, p.pos.y, 3, constants.splashParticleColor);
            util.removeFromArray(map.splashParticles, i--);
        }
    }

    // Redo blood counter
    if (anyoneWasDead) {
        let imgd = map.backCtx.getImageData(x, y, c.width, c.height);
        let pix = imgd.data;
        map.blood = 0;

        for (let i = 0, n = pix.length; i < n; i += 4) {
            if (pix[i] == 255 && pix[i + 1] == 0 && pix[i + 2] == 0 && pix[i + 3] == 255) {
                map.blood++;
            }
        }
    }
}

function drawPassiveMapStructure() {
    if (map.backCanvas == null) {
        map.backCanvas = document.createElement('canvas');
        map.backCanvas.width = c.width;
        map.backCanvas.height = c.height;
        map.backCtx = map.backCanvas.getContext('2d');

        map.backCtx.fillStyle = constants.backGroundColor;
        map.backCtx.fillRect(0, 0, c.width, c.height);
        drawFields(map.backCtx);
    }

    cc.drawImage(map.backCanvas, 0, 0);
}

function drawElectricLines() {
    for (let i = 0; i < map.electricLines.length; i++) {
        let p = map.electricLines[i];

        if (map.tick % 5 == 0)
            p.updatePoints();

        for (let j = 0; j < p.points.length; j++) {

            if (j == 3) {
                cc.lineWidth = 1;
                cc.strokeWidth = 1;
                cc.strokeStyle = "black";
            } else {
                cc.lineWidth = 2;
                cc.strokeWidth = 2;
                cc.strokeStyle = p.color;
            }

            cc.beginPath();
            cc.moveTo(map.pos.x + p.begin.x, map.pos.y + p.begin.y);
            for (let k = 0; k < p.points[j].length; k++) {
                cc.lineTo(map.pos.x + p.points[j][k].x, map.pos.y + p.points[j][k].y);
            }
            cc.lineTo(map.pos.x + p.end.x, map.pos.y + p.end.y);
            cc.stroke();
        }
    }
}

function drawSwitches() {
    for (let i = 0; i < map.switches.length; i++) {
        let p = map.switches[i];
        cc.fillStyle = p.getColor();
        cc.fillRect(map.pos.x + p.area.x, map.pos.y + p.area.y, p.area.width, p.area.height);
        cc.strokeStyle = "black";
        cc.strokeWidth = 3;
        cc.strokeRect(map.pos.x + p.area.x, map.pos.y + p.area.y, p.area.width, p.area.height);
    }
}

function drawArrows() {
    cc.strokeStyle = constants.arrowColor;
    cc.lineWidth = 3;
    cc.strokeWidth = 3;
    for (let i = 0; i < map.arrows.length; i++) {
        let p = map.arrows[i];
        let xOffset = map.pos.x + p.x + map.fieldSize / 2;
        let yOffset = map.pos.y + p.y + map.fieldSize / 2;
        switch (p.direction) {
            case "up": {
                yOffset += Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cc.beginPath();
                cc.moveTo(xOffset - 10, yOffset + 5);
                cc.lineTo(xOffset, yOffset - 5);
                cc.lineTo(xOffset + 10, yOffset + 5);
                cc.stroke();
                break;
            }
            case "down" : {
                yOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cc.beginPath();
                cc.moveTo(xOffset - 10, yOffset - 5);
                cc.lineTo(xOffset, yOffset + 5);
                cc.lineTo(xOffset + 10, yOffset - 5);
                cc.stroke();
                break;
            }
            case "right" : {
                xOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cc.beginPath();
                cc.moveTo(xOffset - 5, yOffset - 10);
                cc.lineTo(xOffset + 5, yOffset);
                cc.lineTo(xOffset - 5, yOffset + 10);
                cc.stroke();
                break;
            }
            case "left" : {
                xOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cc.beginPath();
                cc.moveTo(xOffset + 5, yOffset - 10);
                cc.lineTo(xOffset - 5, yOffset);
                cc.lineTo(xOffset + 5, yOffset + 10);
                cc.stroke();
                break;
            }
            default: {
                throw "Unreachable";
            }
        }
    }
}

function drawGraphics() {
    cc.fillStyle = constants.backGroundColor;
    cc.fillRect(0, 0, c.width, c.height);

    drawPassiveMapStructure();
    map.onDraw();

    for (i = 0; i < map.gemos.length; i++) {
        map.gemos[i].draw();
    }

    drawSplashParticles();
    drawElectricLines();
    drawSwitches();
    drawPlayers();
    drawPortal();
    drawArrows();

    drawMenu();
}
