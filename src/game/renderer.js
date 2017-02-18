class Renderer {
    constructor() {
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = 800;
        this.height = 600;
        this.scale = 1;
        this.map = null;
        this.context = null;
        this.canvas = null;
    }

    transX(x) {
        return this.xOffset + (map.pos.x + x) * this.scale;
    }

    transY(y) {
        return this.yOffset + (map.pos.y + y) * this.scale;
    }

    drawBackground() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMapBackground(image) {
        this.context.drawImage(image, this.transX(0), this.transY(0));
    }

    drawRect(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(this.xOffset + x, this.yOffset + y, width, height);
    }

    drawRectInMap(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(this.transX(x), this.transY(y), width, height);
    }

    drawCircleWithBorderInMap(x, y, radius, color, colorBorder, borderSize) {
        this.context.beginPath();
        this.context.arc(this.transX(x), this.transY(y), (radius / 2) * this.scale, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.lineWidth = borderSize * this.scale;
        this.context.strokeStyle = colorBorder;
        this.context.stroke();
    }

    drawCircleInMap(x, y, radius, color, colorBorder) {
        this.context.beginPath();
        this.context.arc(this.transX(x), this.transY(y), (radius / 2) * this.scale, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }
}
cr = new Renderer();

function drawCenteredRectangleInMap(x, y, width, height, color) {
    global_cc.fillStyle = color;
    global_cc.fillRect(map.pos.x + x - width / 2, map.pos.y + y - height / 2, width, height);
}

function drawCenteredCircleInMap(x, y, radius, color) {
    global_cc.beginPath();
    global_cc.arc(map.pos.x + x, map.pos.y + y, radius / 2, 0, 2 * Math.PI, false);
    global_cc.fillStyle = color;
    global_cc.fill();
}

function drawCenteredCircleInMap_back(x, y, radius, color) {
    map.backCtx.beginPath();
    map.backCtx.arc(x, y, radius / 2, 0, 2 * Math.PI, false);
    map.backCtx.fillStyle = color;
    map.backCtx.fill();
}

function drawPlayers() {
    for (let i = 0; i < player1.styleDrag.length; i++) {
        let pos = player1.styleDrag[i].pos;
        let color = player1.styleDrag[i].getColor();
        cr.drawRectInMap(pos.x, pos.y, 3, 3, color);

        pos = player2.styleDrag[i].pos;
        color = player2.styleDrag[i].getColor();
        cr.drawRectInMap(pos.x, pos.y, 3, 3, color);
    }
}

function drawFields_back() {
    for (y = 0; y < map.fields.length; y++) {
        for (x = 0; x < map.fields[y].length; x++) {
            let field = map.fields[y][x];

            let posX = (x * map.fieldSize + 1) * cr.scale;
            let posY = (y * map.fieldSize + 1) * cr.scale;

            map.backCtx.fillStyle = field.color;
            map.backCtx.fillRect(posX, posY, (map.fieldSize - 2) * cr.scale, (map.fieldSize - 2) * cr.scale);
        }
    }
}

function drawMenu_player(offset, player) {
    global_cc.font = "18px Arial";
    global_cc.fillText(player.name, offset.x, offset.y);
    global_cc.font = "15px Arial";
    global_cc.fillText("Death: " + player.death, offset.x + 80, offset.y);
}

function drawMenu_maps(offset) {
    global_cc.font = "25px Arial";
    global_cc.fillStyle = constants.menuTextColor;
    global_cc.fillText(map.name, offset.x, offset.y + 5);

    global_cc.font = "15px Arial";
    for (let x = 1; x <= 20; x++) {
        global_cc.fillStyle = x == map.id ? constants.menuActiveLevelColor : constants.menuTextColor;
        global_cc.fillText(x, 100 + offset.x + x * 20, 1 + offset.y);
    }
}

function drawBloodCount(offset) {
    let blood = map.blood;

    if (blood == 0) {
        global_cc.font = "20px Arial";
        global_cc.fillStyle = constants.menuTextColor;
        global_cc.fillText("No Bloodshed", offset.x, offset.y);
    } else if (blood < 500) {
        global_cc.font = "20px Arial";
        global_cc.fillStyle = constants.menuTextColor;
        global_cc.fillText("a little bit of blood: " + blood, offset.x, offset.y);
    } else if (blood < 1000) {
        global_cc.font = "22px Arial";
        global_cc.fillStyle = constants.bloodCounterLight;
        global_cc.fillText("there is some BLOOD: " + blood, offset.x, offset.y);
    } else if (blood < 2000) {
        global_cc.font = "24px Comic Sans MS";
        global_cc.fillStyle = constants.bloodCounterMedium;
        global_cc.fillText("OMG, So Much BLOOD: " + blood, offset.x, offset.y);
    } else if (blood < 5000) {
        global_cc.font = "bold 26px Comic Sans MS";
        global_cc.fillStyle = constants.bloodCounterMedium;
        global_cc.fillText("WTF!! BLOOD EVERYWHERE: " + blood, offset.x, offset.y);
    } else if (blood < 10000) {
        global_cc.font = "bolder 28px Comic Sans MS";
        global_cc.fillStyle = constants.bloodCounterExtreme;
        global_cc.fillText("BLOOD BLOOD BLOOD !!!!! " + blood, offset.x, offset.y);
    } else {
        global_cc.font = "22px Arial";
        global_cc.fillStyle = constants.menuTextColor;
        global_cc.fillText("ok now, finish the level already .." + blood, offset.x, offset.y);
    }
}

function drawMenu() {
    drawMenu_maps({x: 50, y: 30});
    drawMenu_player({x: 100, y: 550}, player1);
    drawMenu_player({x: 100, y: 580}, player2);
    drawBloodCount({x: 300, y: 570});

    if (constants.debug) {
        fpsCounter.onUpdate(global_cc);
    }
}

function drawPortal() {
    if (map.portal != null) {
        map.portal.sprite.draw(cr, map.portal.area.x, map.portal.area.y, map.portal.area.width, map.portal.area.height);
    }
}

function drawSplashParticles() {
    let anyoneWasDead = false;
    for (let i = 0; i < map.splashParticles.length; i++) {
        let p = map.splashParticles[i];
        cr.drawCircleInMap(p.pos.x, p.pos.y, 3, constants.splashParticleColor);

        if (map.splashParticles[i].isDead) {
            anyoneWasDead = true;
            drawCenteredCircleInMap_back(p.pos.x * cr.scale, p.pos.y * cr.scale, 3, constants.splashParticleColor);
            util.removeFromArray(map.splashParticles, i--);
            map.deadSplashParticles.push(p.pos);
        }
    }

    // Redo blood counter
    if (anyoneWasDead) {
        let imgd = map.backCtx.getImageData(x, y, global_canvas.width, global_canvas.height);
        let pix = imgd.data;
        map.blood = 0;

        for (let i = 0, n = pix.length; i < n; i += 4) {
            if (pix[i] == 255 && pix[i + 1] == 0 && pix[i + 2] == 0 && pix[i + 3] == 255) {
                map.blood++;
            }
        }
    }
}

function drawDeadSplashParticles_back() {
    for (let i = 0; i < map.deadSplashParticles.length; i++) {
        let p = map.deadSplashParticles[i];
        drawCenteredCircleInMap_back(p.x * cr.scale, p.y * cr.scale, 3, constants.splashParticleColor);
    }
}

function drawPassiveMapStructure() {
    if (map.backCanvas == null) {
        map.backCanvas = document.createElement('canvas');
        map.backCanvas.width = map.bounds.x * cr.scale;
        map.backCanvas.height = map.bounds.y * cr.scale;
        map.backCtx = map.backCanvas.getContext('2d');

        drawFields_back();
        drawDeadSplashParticles_back();
    }

    cr.drawMapBackground(map.backCanvas);
}

function drawElectricLines() {
    for (let i = 0; i < map.electricLines.length; i++) {
        let p = map.electricLines[i];

        if (map.tick % 5 == 0)
            p.updatePoints();

        for (let j = 0; j < p.points.length; j++) {

            if (j == 3) {
                cr.context.lineWidth = 1;
                cr.context.strokeWidth = 1;
                cr.context.strokeStyle = "black";
            } else {
                cr.context.lineWidth = 2;
                cr.context.strokeWidth = 2;
                cr.context.strokeStyle = p.color;
            }

            cr.context.beginPath();
            cr.context.moveTo(cr.transX(p.begin.x), cr.transY(p.begin.y));
            for (let k = 0; k < p.points[j].length; k++) {
                cr.context.lineTo(cr.transX(p.points[j][k].x), cr.transY(p.points[j][k].y));
            }
            cr.context.lineTo(cr.transX(p.end.x), cr.transY(p.end.y));
            cr.context.stroke();
        }
    }
}

function drawSwitches() {
    for (let i = 0; i < map.switches.length; i++) {
        let p = map.switches[i];
        cr.context.fillStyle = p.getColor();
        cr.context.fillRect(cr.transX(p.area.x), cr.transY(p.area.y), cr.scale * p.area.width, cr.scale * p.area.height);
        cr.context.strokeStyle = "black";
        cr.context.strokeWidth = cr.scale * 3;
        cr.context.strokeRect(cr.transX(p.area.x), cr.transY(p.area.y), cr.scale * p.area.width, cr.scale * p.area.height);
    }
}

function drawArrows() {
    cr.context.strokeStyle = constants.arrowColor;
    cr.context.lineWidth = cr.scale * 3;
    cr.context.strokeWidth = cr.scale * 3;
    for (let i = 0; i < map.arrows.length; i++) {
        let p = map.arrows[i];
        let xOffset = p.x + map.fieldSize / 2;
        let yOffset = p.y + map.fieldSize / 2;
        switch (p.direction) {
            case "up": {
                yOffset += Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.transX(xOffset - 10), cr.transY(yOffset + 5));
                cr.context.lineTo(cr.transX(xOffset), cr.transY(yOffset - 5));
                cr.context.lineTo(cr.transX(xOffset + 10), cr.transY(yOffset + 5));
                cr.context.stroke();
                break;
            }
            case "down" : {
                yOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.transX(xOffset - 10), cr.transY(yOffset - 5));
                cr.context.lineTo(cr.transX(xOffset), cr.transY(yOffset + 5));
                cr.context.lineTo(cr.transX(xOffset + 10), cr.transY(yOffset - 5));
                cr.context.stroke();
                break;
            }
            case "right" : {
                xOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.transX(xOffset - 5), cr.transY(yOffset - 10));
                cr.context.lineTo(cr.transX(xOffset + 5), cr.transY(yOffset));
                cr.context.lineTo(cr.transX(xOffset - 5), cr.transY(yOffset + 10));
                cr.context.stroke();
                break;
            }
            case "left" : {
                xOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.transX(xOffset + 5), cr.transY(yOffset - 10));
                cr.context.lineTo(cr.transX(xOffset - 5), cr.transY(yOffset));
                cr.context.lineTo(cr.transX(xOffset + 5), cr.transY(yOffset + 10));
                cr.context.stroke();
                break;
            }
            default: {
                throw "Unreachable";
            }
        }
    }
}

function drawProjectiles() {
    for (let i = 0; i < map.projectiles.length; i++) {
        let p = map.projectiles[i];
        cr.drawCircleWithBorderInMap(p.pos.x, p.pos.y, p.size, p.color, "black", 1);
    }
}

function drawGraphics() {
    cr.drawBackground();
    drawPassiveMapStructure();
    drawProjectiles();
    drawSplashParticles();
    drawElectricLines();
    drawSwitches();
    drawPlayers();
    drawPortal();
    drawArrows();

    // drawMenu();
}
