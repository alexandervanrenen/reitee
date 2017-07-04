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

    font(px, name, bold) {
        return (px * this.scale) + "px " + name;
    }

    tgx(x) {
        return this.xOffset + (map.pos.x + x) * this.scale;
    }

    tgy(y) {
        return this.yOffset + (map.pos.y + y) * this.scale;
    }

    tmx(x) {
        return this.xOffset + x * this.scale;
    }

    tmy(y) {
        return this.yOffset + y * this.scale;
    }

    drawBackground() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMapBackground(image) {
        this.context.drawImage(image, this.tgx(0), this.tgy(0));
    }

    drawRect(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(this.xOffset + x, this.yOffset + y, width, height);
    }

    drawRectInMap(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(this.tgx(x), this.tgy(y), width * this.scale, height * this.scale);
    }

    drawCircleWithBorderInMap(x, y, radius, color, colorBorder, borderSize) {
        this.context.beginPath();
        this.context.arc(this.tgx(x), this.tgy(y), (radius / 2) * this.scale, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.lineWidth = borderSize * this.scale;
        this.context.strokeStyle = colorBorder;
        this.context.stroke();
    }

    drawCircleInMap(x, y, radius, color, colorBorder) {
        this.context.beginPath();
        this.context.arc(this.tgx(x), this.tgy(y), (radius / 2) * this.scale, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

    drawCircle(x, y, radius, color, colorBorder) {
        this.context.beginPath();
        this.context.arc(this.tmx(x), this.tmy(y), (radius / 2) * this.scale, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }
}
var cr = new Renderer();

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
    for (let y = 0; y < map.fields.length; y++) {
        for (let x = 0; x < map.fields[y].length; x++) {
            let field = map.fields[y][x];

            let posX = (x * map.fieldSize + 1) * cr.scale;
            let posY = (y * map.fieldSize + 1) * cr.scale;

            map.backCtx.fillStyle = field.color;
            map.backCtx.fillRect(posX, posY, (map.fieldSize - 2) * cr.scale, (map.fieldSize - 2) * cr.scale);
        }
    }
}

function drawMenu_player(offset, player) {
    cr.context.font = cr.font(18, "Arial");
    cr.context.fillText(player.name, cr.tmx(offset.x), cr.tmy(offset.y));
    cr.context.font = cr.font(15, "Arial");
    cr.context.fillText("Death: " + player.death, cr.tmx(offset.x + 80), cr.tmy(offset.y));
}

function drawMenu_maps(offset) {
    cr.context.font = cr.font(25, "Arial");
    cr.context.fillStyle = constants.menuTextColor;
    cr.context.fillText(map.name, cr.tmx(offset.x), cr.tmy(offset.y + 5));

    cr.context.font = cr.font(15, "Arial");
    for (let x = 1; x <= 20; x++) {
        cr.context.fillStyle = x == map.id ? constants.menuActiveLevelColor : constants.menuTextColor;
        cr.context.fillText(x, cr.tmx(100 + offset.x + x * 20), cr.tmy(1 + offset.y));
    }
}

function drawBloodCount(offset) {
    let blood = map.blood;

    if (blood == 0) {
        cr.context.font = cr.font(20, "Arial");
        cr.context.fillStyle = constants.menuTextColor;
        cr.context.fillText("No Bloodshed", cr.tmx(offset.x), cr.tmy(offset.y));
    } else if (blood < 500) {
        cr.context.font = cr.font(20, "Arial");
        cr.context.fillStyle = constants.menuTextColor;
        cr.context.fillText("a little bit of blood: " + blood, cr.tmx(offset.x), cr.tmy(offset.y));
    } else if (blood < 1000) {
        cr.context.font = cr.font(22, "Arial");
        cr.context.fillStyle = constants.bloodCounterLight;
        cr.context.fillText("there is some BLOOD: " + blood, cr.tmx(offset.x), cr.tmy(offset.y));
    } else if (blood < 2000) {
        cr.context.font = cr.font(24, "Comic Sans MS");
        cr.context.fillStyle = constants.bloodCounterMedium;
        cr.context.fillText("OMG, So Much BLOOD: " + blood, cr.tmx(offset.x), cr.tmy(offset.y));
    } else if (blood < 5000) {
        cr.context.font = "bold " + cr.font(26, "Comic Sans MS");
        cr.context.fillStyle = constants.bloodCounterMedium;
        cr.context.fillText("WTF!! BLOOD EVERYWHERE: " + blood, cr.tmx(offset.x), cr.tmy(offset.y));
    } else if (blood < 10000) {
        cr.context.font = "bold " + cr.font(28, "Comic Sans MS");
        cr.context.fillStyle = constants.bloodCounterExtreme;
        cr.context.fillText("BLOOD BLOOD BLOOD !!!!! " + blood, cr.tmx(offset.x), cr.tmy(offset.y));
    } else {
        cr.context.font = cr.font(22, "Arial");
        cr.context.fillStyle = constants.menuTextColor;
        cr.context.fillText("ok now, finish the level already .." + blood, cr.tmx(offset.x), cr.tmy(offset.y));
    }
}

function drawMenu() {
    drawMenu_maps({x: 50, y: 30});
    drawMenu_player({x: 100, y: 550}, player1);
    drawMenu_player({x: 100, y: 580}, player2);
    drawBloodCount({x: 300, y: 570});

    if (constants.debug) {
        fpsCounter.onUpdate(cr);
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
            drawCenteredCircleInMap_back(p.pos.x * cr.scale, p.pos.y * cr.scale, 3 * cr.scale, constants.splashParticleColor);
            util.removeFromArray(map.splashParticles, i--);
            map.deadSplashParticles.push(p.pos);
        }
    }

    // Redo blood counter
    if (anyoneWasDead) {
        let imgd = map.backCtx.getImageData(0, 0, cr.canvas.width, cr.canvas.height);
        let pix = imgd.data;
        map.blood = 0;

        // TODO: too expensive for large screens .. do smart update when drawing + this one is resolution dependent
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
            cr.context.moveTo(cr.tgx(p.begin.x), cr.tgy(p.begin.y));
            for (let k = 0; k < p.points[j].length; k++) {
                cr.context.lineTo(cr.tgx(p.points[j][k].x), cr.tgy(p.points[j][k].y));
            }
            cr.context.lineTo(cr.tgx(p.end.x), cr.tgy(p.end.y));
            cr.context.stroke();
        }
    }
}

function drawSwitches() {
    for (let i = 0; i < map.switches.length; i++) {
        let p = map.switches[i];
        cr.context.fillStyle = p.getColor();
        cr.context.fillRect(cr.tgx(p.area.x), cr.tgy(p.area.y), cr.scale * p.area.width, cr.scale * p.area.height);
        cr.context.strokeStyle = "black";
        cr.context.strokeWidth = cr.scale * 3;
        cr.context.strokeRect(cr.tgx(p.area.x), cr.tgy(p.area.y), cr.scale * p.area.width, cr.scale * p.area.height);
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
                cr.context.moveTo(cr.tgx(xOffset - 10), cr.tgy(yOffset + 5));
                cr.context.lineTo(cr.tgx(xOffset), cr.tgy(yOffset - 5));
                cr.context.lineTo(cr.tgx(xOffset + 10), cr.tgy(yOffset + 5));
                cr.context.stroke();
                break;
            }
            case "down" : {
                yOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.tgx(xOffset - 10), cr.tgy(yOffset - 5));
                cr.context.lineTo(cr.tgx(xOffset), cr.tgy(yOffset + 5));
                cr.context.lineTo(cr.tgx(xOffset + 10), cr.tgy(yOffset - 5));
                cr.context.stroke();
                break;
            }
            case "right" : {
                xOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.tgx(xOffset - 5), cr.tgy(yOffset - 10));
                cr.context.lineTo(cr.tgx(xOffset + 5), cr.tgy(yOffset));
                cr.context.lineTo(cr.tgx(xOffset - 5), cr.tgy(yOffset + 10));
                cr.context.stroke();
                break;
            }
            case "left" : {
                xOffset -= Math.floor(Math.sin(Math.floor(map.tick / 10)) * 5) - 2.5;
                cr.context.beginPath();
                cr.context.moveTo(cr.tgx(xOffset + 5), cr.tgy(yOffset - 10));
                cr.context.lineTo(cr.tgx(xOffset - 5), cr.tgy(yOffset));
                cr.context.lineTo(cr.tgx(xOffset + 5), cr.tgy(yOffset + 10));
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
    cr.drawCircleWithBorderInMap(map.f_to_r(11.0), map.f_to_r(8), map.f_to_r(10.4), "rgba(0,0,0,0)", "rgba(255,0,0,0.3)", 3);
}

function calculateScaling() {
    let canvas = document.getElementById('gc');
    cr.canvas = canvas;
    cr.context = canvas.getContext('2d');

    cr.canvas.width = window.innerWidth;
    cr.canvas.height = window.innerHeight;

    console.log("Resize to: width " + cr.canvas.width + " height " + cr.canvas.height);

    cr.width = cr.canvas.width;
    cr.height = cr.canvas.height;
    let ratio = cr.width / cr.height;
    let desiredRatio = 800 / 600;

    // Adjust height or width to fit our desired ratio
    if (ratio < desiredRatio) {
        cr.height = Math.floor(cr.width / desiredRatio);
    } else {
        cr.width = Math.floor(cr.height * desiredRatio);
    }

    cr.scale = cr.width / 800;
    cr.xOffset = (cr.canvas.width - cr.width) / 2;
    cr.yOffset = (cr.canvas.height - cr.height) / 2;

    map.backCtx = null;
    map.backCanvas = null;
}

function drawGamePad() {
    let gp = input.gamePad;

    // Joy-Stick base
    cr.drawCircle(gp.pos.x, gp.pos.y, gp.size, "rgba(150, 200, 150, 0.4)");

    // Joy-Stick highlight
    gp.updateJoyStickPosition();
    if (gp.wantsToMove()) {
        cr.drawCircle(gp.joyStickPosition.x, gp.joyStickPosition.y, gp.size * 0.6, "rgba(210, 210, 210, 0.8)");
    } else {
        cr.drawCircle(gp.joyStickPosition.x, gp.joyStickPosition.y, gp.size * 0.6, "rgba(140, 190, 140, 0.4)");
    }

    // Draw switch area
    if (gp.activePlayer == player1) {
        cr.drawCircle(gp.switchPos.x, gp.switchPos.y, gp.size, constants.player1.colorTable[Math.min((map.tick - gp.switchTick) / 3, 10)]);
    } else {
        cr.drawCircle(gp.switchPos.x, gp.switchPos.y, gp.size, constants.player2.colorTable[Math.min((map.tick - gp.switchTick) / 3, 10)]);
    }
    // if(gp.activePlayer == player1) {
    //     cr.drawCircle(gp.switchPos.x, gp.switchPos.y, gp.size, constants.player1.colorTable[Math.min(Math.round((map.tick - gp.switchTick) / 3), 10)]);
    // } else {
    //     cr.drawCircle(gp.switchPos.x, gp.switchPos.y, gp.size, constants.player2.colorTable[Math.min(Math.round((map.tick - gp.switchTick) / 3), 10)]);
    // }
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
    drawGamePad();

    drawMenu();

    for (let i = 0; i < input.gamePad.ongoingContacts.length; i++) {
        let c = input.gamePad.ongoingContacts[i];

        if (i == 0) {
            cr.context.beginPath();
            cr.context.arc(cr.tmx(c.x), cr.tmy(c.y), 30, 0, 2 * Math.PI, false);
            cr.context.lineWidth = 3;
            cr.context.strokeStyle = "green";
            cr.context.stroke();
        } else if (i == 1) {
            cr.context.beginPath();
            cr.context.arc(cr.tmx(c.x), cr.tmy(c.y), 30, 0, 2 * Math.PI, false);
            cr.context.lineWidth = 3;
            cr.context.strokeStyle = "red";
            cr.context.stroke();
        }
    }

}
