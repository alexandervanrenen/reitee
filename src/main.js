window.onload = function () {
    c = document.getElementById('gc');
    window.onkeydown = onUserInput;
    window.onkeyup = onUserInput;
    cc = c.getContext('2d');
    setInterval(onTick, 1000 / 60);
};

function onTick() {

    updateLogic();
    drawGraphics();

    if (constants.debug) {
        fpsCounter.onUpdate(cc);
    }
}
