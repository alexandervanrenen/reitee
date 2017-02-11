function createDrawColorTable(scheme) { // Warning: these constants kind of depend on the ones in player.js:DragParticle
    let arr = new Array(0);
    let alpha = 1.0;
    while (alpha > 0.001) {
        arr.push(scheme + alpha + ")");
        alpha *= 0.9;
        console.log(scheme + alpha + ")");
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
        colorTable: createDrawColorTable("rgba(17, 160, 255, ")
    },

    player2: {
        colorTable: createDrawColorTable("rgba(243, 156, 18, ")
    },

    backGroundColor: "black",
    victoryAreaColor: "rgba(135, 206, 235, 0.7)",

    projectile: {
        color: "red"
    },

    fields: {
        walkable: "white",
        non_walkable: "rgb(100,100,100)"
    },

    menuTextColor: "white"
};

print = function (text) {
    console.log(text);
};
