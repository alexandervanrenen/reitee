window.onload = function () {

    input = new Input();
    loadLevel(new Level_1());
    input.setUp();

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
