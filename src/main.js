window.onload = function () {
    c = document.getElementById('gc');
    window.onkeydown = onUserInput;
    window.onkeyup = onUserInput;
    window.onresize = calculateScaling;

    cc = c.getContext('2d');
    console.log(cc);
    calculateScaling();

    loadLevel(new Level_1());

    setInterval(onTick, 1000 / 60);
};

function onTick() {
    try {
        updateLogic();
        drawGraphics();
    }
    catch (err) {
        if (err == "Victory") {
            loadLevel(map.portal.next);
        } else {
            throw err;
        }
    }
}

function calculateScaling() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    console.log("resize to: width " + c.width + " height " + c.height);

    cr.width = c.width;
    cr.height = c.height;
    let ratio = cr.width / cr.height;
    let desiredRatio = 800 / 600;

    // Adjust height or width to fit our desired ratio
    if (ratio < desiredRatio) {
        cr.height = Math.floor(cr.width / desiredRatio);
    } else {
        cr.width = Math.floor(cr.height * desiredRatio);
    }

    cr.scale = cr.width / 800;
    cr.xOffset = (c.width - cr.width) / 2;
    cr.yOffset = (c.height - cr.height) / 2;
}