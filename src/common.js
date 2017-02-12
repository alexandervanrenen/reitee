function createDrawColorTable(scheme) { // Warning: these constants kind of depend on the ones in player.js:DragParticle
    let arr = new Array(0);
    let alpha = 1.0;
    while (alpha > 0.001) {
        arr.push(scheme + alpha + ")");
        alpha *= 0.9;
    }
    return arr;
}

constants = {
    fps: 30,
    debug: true,
    playerStyleDragLength: 200,

    styleDrag: {
        particleCount: 200,
        despawnChance: 1.0 / 40
    },

    player1: {
        name: "Player 1",
        colorTable: createDrawColorTable("rgba(17, 160, 255, "),
    },

    player2: {
        name: "Player 2",
        colorTable: createDrawColorTable("rgba(243, 156, 18, "),
    },

    backGroundColor: "black",
    victoryAreaColor: "rgba(135, 206, 235, 0.7)",

    projectile: {
        color: "red"
    },

    fields: {
        walkable: "white",
        non_walkable: "rgb(110,110,110)",
        outside: "rgb(40,40,40)"
    },

    menuTextColor: "white",
    bloodCounterLight: "rgb(191,77,40)",
    bloodCounterMedium: "rgb(138,7,7)",
    bloodCounterExtreme: "rgb(174,7,10)",
    menuActiveLevelColor: "gold",
    portalSprite: {path: "assets/portal_strip4.png", width: 1920 / 4, height: 312, frameCount: 4, updateRate: 0.1},
    splashParticleColor: "red",

    electricalLines: {
        all: "rgb(243, 22, 18)",
        none: "rgb(11, 244, 18)",
        player1: "rgb(243, 156, 18)",
        player2: "rgb(17, 160, 255)",
    },

    switches: {
        pushing_normal: "rgb(77, 222, 77)",
        pushing_pushed: "rgb(55, 123, 55)",
    },
};

print = function (text) {
    console.log(text);
};
