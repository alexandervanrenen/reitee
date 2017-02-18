window.onload = function () {
    window.onkeydown = onUserInput;
    window.onkeyup = onUserInput;

    global_canvas = document.getElementById('gc');
    cr.canvas = global_canvas;
    cr.context = global_canvas.getContext('2d');

    loadLevel(new Level_3());

    window.onresize = calculateScaling;
    calculateScaling();

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
    cr.canvas.width = window.innerWidth;
    cr.canvas.height = window.innerHeight;

    console.log("resize to: width " + cr.canvas.width + " height " + cr.canvas.height);

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

    console.log("xOffset " + cr.xOffset);
    console.log("yOffset " + cr.yOffset);

    map.backCtx = null;
    map.backCanvas = null;
}