function pickLevel() {
    let url = new URL("http://www.anizmow.com?" + window.location.search.substring(1));
    console.log(url);
    let c = url.searchParams.get("level");
    switch (c) {
        case "1":
            return new Level_1();
        case "2":
            return new Level_2();
        case "3":
            return new Level_3();
        case "4":
            return new Level_4();
        case "5":
        default:
            return new Level_5();
    }
}

window.onload = function () {
    input = new Input();
    loadLevel(pickLevel());
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

// IDEAS:
// Add tokens .. players can collect up to 5 tokens in a level to earn a stamp for the level (maybe like in mario ?)
// Flames: players can ignite flames .. all flames need to be active to open doors/portal
// Sticky walls. There is a special type of wall, when near this kind of wall the player moves slower
// Allow to move game pad origin