window.onload = function () {
    c = document.getElementById('gc');
    window.onkeydown = onUserInput;
    window.onkeyup = onUserInput;
    // window.touchmove = onUserInputTouch; not working ..
    // window.touchstart = onUserInputTouch;
    cc = c.getContext('2d');

    loadLevel(new Level_3());

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
