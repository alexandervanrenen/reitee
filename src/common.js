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
    debug: false,
    playerStyleDragLength: 200,

    styleDrag: {
        particleCount: 200,
        despawnChance: 1.0 / 40
    },

    player1: {
        name: "Player 1",
        colorTable: createDrawColorTable("rgba(17, 160, 255, ")
    },

    player2: {
        name: "Player 2",
        colorTable: createDrawColorTable("rgba(243, 156, 18, ")
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
    portalSprite: {path: "assets/portal_strip4.png", width: 1920 / 4, height: 312, frameCount: 4, updateRate: 0.1}
};

print = function (text) {
    console.log(text);
};
